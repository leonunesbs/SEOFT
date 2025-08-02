import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  MdAttachFile,
  MdDeleteOutline,
  MdExpandLess,
  MdExpandMore,
  MdOutlineCheck,
  MdOutlineFileCopy,
  MdSwitchLeft,
} from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UseFormReturn, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { EvaluationMainFormValues } from "../organisms/evaluation-main-form";
import { EyeFileViewer } from "../atoms/eye-file-viewer";
import { Input } from "../ui/input";
import { OpticalBiometryFormFields } from "./opticalBiometry-form-fields";
import { Prisma } from "@prisma/client";
import { Textarea } from "../ui/textarea";

// Type for lastEvaluationData with annotations
type LastEvaluationDataWithAnnotations = Prisma.EvaluationGetPayload<{
  select: {
    continuousData: true;
    eyes: {
      include: {
        leftEye: { include: { logs: true; refraction: true } };
        rightEye: { include: { logs: true; refraction: true } };
      };
    };
  };
}>;

export function AccordionExams({
  form,
  rightEyeId,
  leftEyeId,
  lastEvaluationData,
}: {
  form: UseFormReturn<EvaluationMainFormValues>;
  rightEyeId?: string;
  leftEyeId?: string;
  lastEvaluationData?: LastEvaluationDataWithAnnotations;
}) {
  const [showFileInputs, setShowFileInputs] = useState<Record<string, boolean>>(
    {},
  );

  const handleCopyLastData = useCallback(
    (fields: Array<keyof EvaluationMainFormValues>) => {
      if (!lastEvaluationData) return;

      fields.forEach((field) => {
        let value: unknown;

        const fieldStr = field.toString();

        // Check if the field is specific to an eye (ends with 'OD' or 'OS')
        if (fieldStr.endsWith("OD") || fieldStr.endsWith("OS")) {
          const eyeSide = fieldStr.endsWith("OD") ? "rightEye" : "leftEye";
          const eyeLogs = lastEvaluationData.eyes?.[eyeSide]?.logs;

          // Extract the log type from the field name
          const logTypeRaw = fieldStr.substring(0, fieldStr.length - 2);

          // Mapping of field names to log types
          const fieldToLogTypeMap: Record<string, string> = {
            tonometry: "TONOMETRY",
            fundoscopy: "FUNDOSCOPY",
            gonioscopy: "GONIOSCOPY",
            biomicroscopy: "BIOMICROSCOPY",
            pachymetry: "PACHYMETRY",
            retinography: "RETINOGRAPHY",
            oct: "OCT",
            visualField: "VISUAL_FIELD",
            angiography: "ANGIOGRAPHY",
            ctCornea: "CT_CORNEA",
            opticalBiometry: "OPTICAL_BIOMETRY",
            specularMicroscopy: "SPECULAR_MICROSCOPY",
          };

          const logType =
            fieldToLogTypeMap[logTypeRaw.toLowerCase()] ??
            logTypeRaw.toUpperCase();

          const log = eyeLogs?.find((l) => l.type === logType);

          // Check if it's an annotation field (contains 'Annotation')
          if (fieldStr.includes("Annotation")) {
            // Annotation fields are stored in eye logs
            value = log?.annotation ?? "";
          } else {
            // Regular exam fields are stored in eye logs
            // For image exams, use fileUrl; for non-image exams, use details
            const imageExamTypes = [
              "OCT",
              "VISUAL_FIELD",
              "ANGIOGRAPHY",
              "RETINOGRAPHY",
              "CT_CORNEA",
            ];
            if (imageExamTypes.includes(logType)) {
              value = log?.fileUrl ?? "";
            } else {
              value = log?.details ?? "";
            }
          }
        } else {
          // For fields not specific to an eye
          value =
            (lastEvaluationData as LastEvaluationDataWithAnnotations)?.[
              field as keyof LastEvaluationDataWithAnnotations
            ] ?? "";

          form.setValue(field, value as string | undefined);
        }
      });
    },
    [lastEvaluationData, form],
  );

  useEffect(() => {
    if (lastEvaluationData) {
      const defaultFields = [
        "gonioscopyOD",
        "gonioscopyOS",
        "pachymetryOD",
        "pachymetryOS",
      ] as Array<keyof EvaluationMainFormValues>;

      // Check if any of the fields already have data
      const hasExistingData = defaultFields.some((field) => {
        const value = form.getValues(field);
        return value && value.toString().trim() !== "";
      });

      // Import if there's existing data
      if (hasExistingData) {
        handleCopyLastData(defaultFields);
      }
    }
  }, [lastEvaluationData, form, handleCopyLastData]);

  const handleCopyODToOE = useCallback(
    (
      fieldOD: keyof EvaluationMainFormValues,
      fieldOE: keyof EvaluationMainFormValues,
    ) => {
      const valueOD = form.getValues(fieldOD);
      form.setValue(fieldOE, valueOD ?? "");
    },
    [form],
  );

  const handleClearFields = useCallback(
    (fields: Array<keyof EvaluationMainFormValues>) => {
      fields.forEach((field) => form.setValue(field, ""));
    },
    [form],
  );

  const opticalBiometryForm = useForm<{
    OD: {
      AL?: string;
      K1?: string;
      K1_axis?: string;
      K2?: string;
      K2_axis?: string;
      DeltaK?: string;
      DeltaK_axis?: string;
      ACD?: string;
      LT?: string;
      WTW?: string;
    };
    OS: {
      AL?: string;
      K1?: string;
      K1_axis?: string;
      K2?: string;
      K2_axis?: string;
      DeltaK?: string;
      DeltaK_axis?: string;
      ACD?: string;
      LT?: string;
      WTW?: string;
    };
  }>({
    defaultValues: {
      OD: form.getValues("opticalBiometryOD")
        ? JSON.parse(form.getValues("opticalBiometryOD") as string)
        : undefined,
      OS: form.getValues("opticalBiometryOS")
        ? JSON.parse(form.getValues("opticalBiometryOS") as string)
        : undefined,
    },
  });

  const handleFileUpload = useCallback(
    async (file: File, fieldName: keyof EvaluationMainFormValues) => {
      try {
        const presignedResponse = await fetch(
          `/api/s3?action=upload&fileName=${fieldName}-${
            fieldName.includes("OD") ? rightEyeId : leftEyeId
          }&contentType=${encodeURIComponent(file.type)}`,
        );
        const { signedUrl, objectUrl } = (await presignedResponse.json()) as {
          signedUrl: string;
          objectUrl: string;
        };

        await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        form.setValue(fieldName, objectUrl);
      } catch (error) {
        console.error("Erro ao fazer upload do arquivo:", error);
      }
    },
    [form, rightEyeId, leftEyeId],
  );

  const biomicroscopyOD = form.watch("biomicroscopyOD");
  const biomicroscopyOS = form.watch("biomicroscopyOS");
  const isBiomicroscopyFilled = !!biomicroscopyOD || !!biomicroscopyOS;

  const tonometryOD = form.watch("tonometryOD");
  const tonometryOS = form.watch("tonometryOS");
  const isTonometryFilled = !!tonometryOD || !!tonometryOS;

  const pachymetryOD = form.watch("pachymetryOD");
  const pachymetryOS = form.watch("pachymetryOS");
  const isPachymetryFilled = !!pachymetryOD || !!pachymetryOS;

  const fundoscopyOD = form.watch("fundoscopyOD");
  const fundoscopyOS = form.watch("fundoscopyOS");
  const isFundoscopyFilled = !!fundoscopyOD || !!fundoscopyOS;

  const gonioscopyOD = form.watch("gonioscopyOD");
  const gonioscopyOS = form.watch("gonioscopyOS");
  const isGonioscopyFilled = !!gonioscopyOD || !!gonioscopyOS;

  const octOD = form.watch("octOD");
  const octOS = form.watch("octOS");
  const octAnnotationOD = form.watch("octAnnotationOD");
  const octAnnotationOS = form.watch("octAnnotationOS");
  const isOctFilled =
    !!octOD || !!octOS || !!octAnnotationOD || !!octAnnotationOS;

  const visualFieldOD = form.watch("visualFieldOD");
  const visualFieldOS = form.watch("visualFieldOS");
  const visualFieldAnnotationOD = form.watch("visualFieldAnnotationOD");
  const visualFieldAnnotationOS = form.watch("visualFieldAnnotationOS");
  const isVisualFieldFilled =
    !!visualFieldOD ||
    !!visualFieldOS ||
    !!visualFieldAnnotationOD ||
    !!visualFieldAnnotationOS;

  const angiographyOD = form.watch("angiographyOD");
  const angiographyOS = form.watch("angiographyOS");
  const angiographyAnnotationOD = form.watch("angiographyAnnotationOD");
  const angiographyAnnotationOS = form.watch("angiographyAnnotationOS");
  const isAngiographyFilled =
    !!angiographyOD ||
    !!angiographyOS ||
    !!angiographyAnnotationOD ||
    !!angiographyAnnotationOS;

  const opticalBiometryOD = form.watch("opticalBiometryOD");
  const opticalBiometryOS = form.watch("opticalBiometryOS");
  const isOpticalBiometryFilled = !!opticalBiometryOD || !!opticalBiometryOS;

  const specularMicroscopyOD = form.watch("specularMicroscopyOD");
  const specularMicroscopyOS = form.watch("specularMicroscopyOS");
  const isSpecularMicroscopyFilled =
    !!specularMicroscopyOD || !!specularMicroscopyOS;

  const ctCorneaOD = form.watch("ctCorneaOD");
  const ctCorneaOS = form.watch("ctCorneaOS");
  const ctCorneaAnnotationOD = form.watch("ctCorneaAnnotationOD");
  const ctCorneaAnnotationOS = form.watch("ctCorneaAnnotationOS");
  const isCtCorneaFilled =
    !!ctCorneaOD ||
    !!ctCorneaOS ||
    !!ctCorneaAnnotationOD ||
    !!ctCorneaAnnotationOS;

  const retinographyOD = form.watch("retinographyOD");
  const retinographyOS = form.watch("retinographyOS");
  const retinographyAnnotationOD = form.watch("retinographyAnnotationOD");
  const retinographyAnnotationOS = form.watch("retinographyAnnotationOS");
  const isRetinographyFilled =
    !!retinographyOD ||
    !!retinographyOS ||
    !!retinographyAnnotationOD ||
    !!retinographyAnnotationOS;

  const handleOpticalBiometryChange = useCallback(
    (value: string, eye: "OD" | "OS") => {
      form.setValue(`opticalBiometry${eye}`, value);
    },
    [form],
  );

  const toggleFileInputs = useCallback((examType: string) => {
    setShowFileInputs((prev) => ({
      ...prev,
      [examType]: !prev[examType],
    }));
  }, []);

  const ExamImageSection = useCallback(
    ({
      examType,
      examName,
      isFilled,
      fileFieldOD,
      fileFieldOS,
      annotationFieldOD,
      annotationFieldOS,
    }: {
      examType: string;
      examName: string;
      isFilled: boolean;
      fileFieldOD: keyof EvaluationMainFormValues;
      fileFieldOS: keyof EvaluationMainFormValues;
      annotationFieldOD: keyof EvaluationMainFormValues;
      annotationFieldOS: keyof EvaluationMainFormValues;
    }) => (
      <AccordionItem value={examType}>
        <AccordionTrigger>
          <h3 className="flex items-center gap-2">
            {examName}
            {isFilled && <MdOutlineCheck className="text-green-500" />}
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 px-2">
          {/* Text Annotations */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full">
              <FormField
                control={form.control}
                name={annotationFieldOD}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OD - Anotações</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value as string}
                        placeholder="Descreva os achados do exame"
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name={annotationFieldOS}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OE - Anotações</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value as string}
                        placeholder="Descreva os achados do exame"
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="border-t pt-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdAttachFile className="h-5 w-5" />
                <span className="font-medium">Anexos</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleFileInputs(examType)}
              >
                {showFileInputs[examType] ? (
                  <>
                    <MdExpandLess className="mr-1 h-4 w-4" />
                    Ocultar arquivos
                  </>
                ) : (
                  <>
                    <MdExpandMore className="mr-1 h-4 w-4" />
                    Incluir arquivos
                  </>
                )}
              </Button>
            </div>

            <Collapsible open={showFileInputs[examType]}>
              <CollapsibleContent className="space-y-4">
                {/* Existing Files Display */}
                <div className="flex justify-between gap-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Arquivos existentes
                  </h4>
                  <div className="flex gap-2">
                    {form.getValues(fileFieldOD) && (
                      <EyeFileViewer
                        fileName={
                          form
                            .getValues(fileFieldOD)
                            ?.toString()
                            .split("/")
                            .pop() || ""
                        }
                        title={`OD - ${form.getValues(fileFieldOD)?.toString().split("/").pop()}`}
                        eye="OD"
                        className="h-8 px-2 text-xs"
                      />
                    )}
                    {form.getValues(fileFieldOS) && (
                      <EyeFileViewer
                        fileName={
                          form
                            .getValues(fileFieldOS)
                            ?.toString()
                            .split("/")
                            .pop() || ""
                        }
                        title={`OE - ${form.getValues(fileFieldOS)?.toString().split("/").pop()}`}
                        eye="OE"
                        className="h-8 px-2 text-xs"
                      />
                    )}
                  </div>
                </div>

                {/* File Inputs */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={fileFieldOD}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OD - Arquivo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                  void handleFileUpload(file, field.name);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={fileFieldOS}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OE - Arquivo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                  void handleFileUpload(file, field.name);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </AccordionContent>
      </AccordionItem>
    ),
    [form, rightEyeId, leftEyeId, showFileInputs, toggleFileInputs],
  );

  return (
    <Tabs defaultValue="propaedeutics" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger id="propaedeutics" value="propaedeutics">
          Propedêutica
        </TabsTrigger>
        <TabsTrigger id="images" value="images">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            Imagens
            <Badge variant="secondary" className="text-xs">
              Novo
            </Badge>
          </div>
        </TabsTrigger>
        <TabsTrigger id="optics" value="optics" disabled>
          Óptica
        </TabsTrigger>
      </TabsList>

      <TabsContent value="propaedeutics">
        <div className="mb-4 flex justify-end">
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => {
              const propaedeuticsFields = [
                "biomicroscopyOD",
                "biomicroscopyOS",
                "fundoscopyOD",
                "fundoscopyOS",
                "gonioscopyOD",
                "gonioscopyOS",
                "pachymetryOD",
                "pachymetryOS",
                "tonometryOD",
                "tonometryOS",
              ];
              handleCopyLastData(
                propaedeuticsFields as unknown as Array<
                  keyof EvaluationMainFormValues
                >,
              );
            }}
          >
            <MdOutlineFileCopy size={18} />
            Importar propedêutica
          </Button>
        </div>
        <Accordion
          type="multiple"
          defaultValue={["biomicroscopy", "fundoscopy", "tonometry"]}
        >
          {/* BIOMICROSCOPIA */}
          <AccordionItem value="biomicroscopy">
            <AccordionTrigger>
              <h3 className="flex w-full items-center gap-2">
                Biomicroscopia
                {isBiomicroscopyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData([
                      "biomicroscopyOD",
                      "biomicroscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "biomicroscopyOD" as keyof EvaluationMainFormValues,
                      "biomicroscopyOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields([
                      "biomicroscopyOD",
                      "biomicroscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="biomicroscopyOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-40 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="biomicroscopyOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-40 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* FUNDOSCOPIA */}
          <AccordionItem value="fundoscopy">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Fundoscopia
                {isFundoscopyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData([
                      "fundoscopyOD",
                      "fundoscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "fundoscopyOD" as keyof EvaluationMainFormValues,
                      "fundoscopyOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields(["fundoscopyOD", "fundoscopyOS"] as Array<
                      keyof EvaluationMainFormValues
                    >)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="fundoscopyOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="fundoscopyOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* TONOMETRIA */}
          <AccordionItem value="tonometry">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Tonometria
                {isTonometryFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData(["tonometryOD", "tonometryOS"] as Array<
                      keyof EvaluationMainFormValues
                    >)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "tonometryOD" as keyof EvaluationMainFormValues,
                      "tonometryOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields(["tonometryOD", "tonometryOS"] as Array<
                      keyof EvaluationMainFormValues
                    >)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="tonometryOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe o resultado"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="tonometryOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe o resultado"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* GONIOSCOPIA */}
          <AccordionItem value="gonioscopy">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Gonioscopia
                {isGonioscopyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData([
                      "gonioscopyOD",
                      "gonioscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "gonioscopyOD" as keyof EvaluationMainFormValues,
                      "gonioscopyOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields(["gonioscopyOD", "gonioscopyOS"] as Array<
                      keyof EvaluationMainFormValues
                    >)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="gonioscopyOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-28"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="gonioscopyOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Informe o resultado"
                            className="min-h-28"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* PAQUIMETRIA */}
          <AccordionItem value="pachymetry" className="mb-4">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Paquimetria
                {isPachymetryFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData([
                      "pachymetryOD",
                      "pachymetryOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "pachymetryOD" as keyof EvaluationMainFormValues,
                      "pachymetryOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields(["pachymetryOD", "pachymetryOS"] as Array<
                      keyof EvaluationMainFormValues
                    >)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="pachymetryOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe o resultado"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="pachymetryOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe o resultado"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="optics">
        <Accordion type="single" collapsible>
          {/* BIOMETRIA */}
          <AccordionItem value="optical-biometry">
            <AccordionTrigger>
              <h3 className="flex items-center gap-4">
                Biometria óptica
                {isOpticalBiometryFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid grid-cols-1 gap-2">
                  <h4 className="font-bold">OD</h4>
                  <input
                    type="hidden"
                    {...form.register("opticalBiometryOD", {
                      value: JSON.stringify(opticalBiometryForm.watch("OD")),
                    })}
                  />
                  <OpticalBiometryFormFields
                    eye="OD"
                    opticalBiometryValue={
                      form.getValues("opticalBiometryOD") as string
                    }
                    onChange={(value) =>
                      handleOpticalBiometryChange(value, "OD")
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <h4 className="font-bold">OE</h4>
                  <input
                    type="hidden"
                    {...form.register("opticalBiometryOS", {
                      value: JSON.stringify(opticalBiometryForm.watch("OS")),
                    })}
                  />
                  <OpticalBiometryFormFields
                    eye="OS"
                    opticalBiometryValue={
                      form.getValues("opticalBiometryOS") as string
                    }
                    onChange={(value) =>
                      handleOpticalBiometryChange(value, "OS")
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* MICROSCOPIA ESPECULAR */}
          <AccordionItem value="specularMicroscopy" className="mb-4">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Miscrocopia especular
                {isSpecularMicroscopyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyLastData([
                      "specularMicroscopyOD",
                      "specularMicroscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdOutlineFileCopy size={18} />
                  Importar última
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleCopyODToOE(
                      "specularMicroscopyOD" as keyof EvaluationMainFormValues,
                      "specularMicroscopyOS" as keyof EvaluationMainFormValues,
                    )
                  }
                >
                  <MdSwitchLeft size={18} />
                  OE semelhante
                </Button>

                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    handleClearFields([
                      "specularMicroscopyOD",
                      "specularMicroscopyOS",
                    ] as Array<keyof EvaluationMainFormValues>)
                  }
                >
                  <MdDeleteOutline size={18} />
                  Limpar
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="specularMicroscopyOD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OD</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Informe o resultado"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specularMicroscopyOS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OE</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Informe o resultado"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="images">
        <Accordion type="single" collapsible>
          <ExamImageSection
            examType="oct"
            examName="OCT"
            isFilled={isOctFilled}
            fileFieldOD="octOD"
            fileFieldOS="octOS"
            annotationFieldOD="octAnnotationOD"
            annotationFieldOS="octAnnotationOS"
          />
          <ExamImageSection
            examType="visualField"
            examName="Campo Visual"
            isFilled={isVisualFieldFilled}
            fileFieldOD="visualFieldOD"
            fileFieldOS="visualFieldOS"
            annotationFieldOD="visualFieldAnnotationOD"
            annotationFieldOS="visualFieldAnnotationOS"
          />
          <ExamImageSection
            examType="angiography"
            examName="Angiografia"
            isFilled={isAngiographyFilled}
            fileFieldOD="angiographyOD"
            fileFieldOS="angiographyOS"
            annotationFieldOD="angiographyAnnotationOD"
            annotationFieldOS="angiographyAnnotationOS"
          />
          <ExamImageSection
            examType="retinography"
            examName="Retinografia"
            isFilled={isRetinographyFilled}
            fileFieldOD="retinographyOD"
            fileFieldOS="retinographyOS"
            annotationFieldOD="retinographyAnnotationOD"
            annotationFieldOS="retinographyAnnotationOS"
          />
          <ExamImageSection
            examType="ctCornea"
            examName="TC de Córnea"
            isFilled={isCtCorneaFilled}
            fileFieldOD="ctCorneaOD"
            fileFieldOS="ctCorneaOS"
            annotationFieldOD="ctCorneaAnnotationOD"
            annotationFieldOS="ctCorneaAnnotationOS"
          />
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}
