import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  MdDeleteOutline,
  MdOutlineCheck,
  MdOutlineFileCopy,
  MdSwitchLeft,
} from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UseFormReturn, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

import { AccessFileButton } from "../atoms/access-file-button";
import { Button } from "../ui/button";
import { EvaluationMainFormValues } from "../organisms/evaluation-main-form";
import { Input } from "../ui/input";
import { OpticalBiometryFormFields } from "./opticalBiometry-form-fields";
import { Prisma } from "@prisma/client";
import { Textarea } from "../ui/textarea";

export function AccordionExams({
  form,
  rightEyeId,
  leftEyeId,
  lastEvaluationData,
}: {
  form: UseFormReturn<EvaluationMainFormValues>;
  rightEyeId?: string;
  leftEyeId?: string;
  lastEvaluationData?: Prisma.EvaluationGetPayload<{
    select: {
      eyes: {
        include: {
          leftEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
          rightEye: {
            include: {
              logs: true;
              refraction: true;
            };
          };
        };
      };
    };
  }>;
}) {
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
          value = log?.details ?? "";
        } else {
          // For fields not specific to an eye
          value = (lastEvaluationData as any)[field] || "";
        }

        form.setValue(field, value as string | FileList | null | undefined);
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
      const hasExistingData = defaultFields.some((field) =>
        form.getValues(field),
      );

      // Only import if there's no existing data
      if (!hasExistingData) {
        handleCopyLastData(defaultFields);
      }
    }
  }, [lastEvaluationData, form, handleCopyLastData]);

  const handleCopyODToOE = (
    fieldOD: keyof EvaluationMainFormValues,
    fieldOE: keyof EvaluationMainFormValues,
  ) => {
    const valueOD = form.getValues(fieldOD);
    form.setValue(fieldOE, valueOD ?? "");
  };

  const handleClearFields = (fields: Array<keyof EvaluationMainFormValues>) => {
    fields.forEach((field) => form.setValue(field, ""));
  };

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

  const handleFileUpload = async (
    file: File,
    fieldName: keyof EvaluationMainFormValues,
  ) => {
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
  };

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
  const isOctFilled = !!octOD || !!octOS;

  const visualFieldOD = form.watch("visualFieldOD");
  const visualFieldOS = form.watch("visualFieldOS");
  const isVisualFieldFilled = !!visualFieldOD || !!visualFieldOS;

  const angiographyOD = form.watch("angiographyOD");
  const angiographyOS = form.watch("angiographyOS");
  const isAngiographyFilled = !!angiographyOD || !!angiographyOS;

  const opticalBiometryOD = form.watch("opticalBiometryOD");
  const opticalBiometryOS = form.watch("opticalBiometryOS");
  const isOpticalBiometryFilled = !!opticalBiometryOD || !!opticalBiometryOS;

  const specularMicroscopyOD = form.watch("specularMicroscopyOD");
  const specularMicroscopyOS = form.watch("specularMicroscopyOS");
  const isSpecularMicroscopyFilled =
    !!specularMicroscopyOD || !!specularMicroscopyOS;

  const ctCorneaOD = form.watch("ctCorneaOD");
  const ctCorneaOS = form.watch("ctCorneaOS");
  const isCtCorneaFilled = !!ctCorneaOD || !!ctCorneaOS;

  const retinographyOD = form.watch("retinographyOD");
  const retinographyOS = form.watch("retinographyOS");
  const isRetinographyFilled = !!retinographyOD || !!retinographyOS;

  const handleOpticalBiometryChange = (value: string, eye: "OD" | "OS") => {
    form.setValue(`opticalBiometry${eye}`, value);
  };
  return (
    <Tabs defaultValue="propaedeutics" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger id="propaedeutics" value="propaedeutics">
          Propedêutica
        </TabsTrigger>
        <TabsTrigger id="images" value="images" disabled>
          Imagens
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
          {/* ANGIOGRAFIA */}
          <AccordionItem value="angiography">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Angiografia
                {isAngiographyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="flex justify-between gap-1">
                <h4>Angiografia</h4>
                <div className="flex gap-2">
                  {form.getValues("angiographyOD") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`angiographyOD-${rightEyeId}`}
                          >
                            OD
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {form.getValues("angiographyOS") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`angiographyOS-${leftEyeId}`}
                          >
                            OE
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OE</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* OD */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="angiographyOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* OS */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="angiographyOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
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
          {/* CAMPO VISUAL */}
          <AccordionItem value="visualField">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Campo Visual
                {isVisualFieldFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="flex justify-between gap-1">
                <h4>Campo Visual</h4>
                <div className="flex gap-2">
                  {form.getValues("visualFieldOD") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`visualFieldOD-${rightEyeId}`}
                          >
                            OD
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {form.getValues("visualFieldOS") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`visualFieldOS-${leftEyeId}`}
                          >
                            OE
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OE</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* OD */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="visualFieldOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* OS */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="visualFieldOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
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
          {/* OCT */}
          <AccordionItem value="oct">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                OCT
                {isOctFilled && <MdOutlineCheck className="text-green-500" />}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="flex justify-between gap-1">
                <h4>OCT</h4>
                <div className="flex gap-2">
                  {form.getValues("octOD") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton fileName={`octOD-${rightEyeId}`}>
                            OD
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {form.getValues("octOS") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton fileName={`octOS-${leftEyeId}`}>
                            OE
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OE</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* OD */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="octOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* OS */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="octOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
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
          {/* RETINOGRAFIA */}
          <AccordionItem value="retinography">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Retinografia
                {isRetinographyFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="flex justify-between gap-1">
                <h4>Retinografia</h4>
                <div className="flex gap-2">
                  {form.getValues("retinographyOD") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`retinographyOD-${rightEyeId}`}
                          >
                            OD
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {form.getValues("retinographyOS") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`retinographyOS-${leftEyeId}`}
                          >
                            OE
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OE</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* OD */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="retinographyOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* OS */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="retinographyOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
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
          {/* TC DE CÓRNEA */}
          <AccordionItem value="ctCornea">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                TC de Córnea
                {isCtCorneaFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 px-2">
              <div className="flex justify-between gap-1">
                <h4>TC de Córnea</h4>
                <div className="flex gap-2">
                  {form.getValues("ctCorneaOD") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`ctCorneaOD-${rightEyeId}`}
                          >
                            OD
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OD</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {form.getValues("ctCorneaOS") && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AccessFileButton
                            fileName={`ctCorneaOS-${leftEyeId}`}
                          >
                            OE
                          </AccessFileButton>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Acessar arquivo OE</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {/* OD */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="ctCorneaOD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OD</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* OS */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="ctCorneaOS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OE</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleFileUpload(file, field.name);
                            }}
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
    </Tabs>
  );
}
