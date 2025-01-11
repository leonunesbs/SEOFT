"use client";

import {
  MdDeleteOutline,
  MdOutlineCheck,
  MdOutlineFileCopy,
  MdSwitchLeft,
} from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Prisma } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { AccessFileButton } from "../atoms/access-file-button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type EvaluationFormValues = {
  biomicroscopyOD?: string;
  biomicroscopyOS?: string;
  fundoscopyOD?: string;
  fundoscopyOS?: string;
  gonioscopyOD?: string;
  gonioscopyOS?: string;
  tonometryOD?: string;
  tonometryOS?: string;
  pachymetryOD?: string;
  pachymetryOS?: string;
  octOD?: FileList | null;
  octOS?: FileList | null;
  visualFieldOD?: FileList | null;
  visualFieldOS?: FileList | null;
  angiographyOD?: FileList | null;
  angiographyOS?: FileList | null;
  ctCorneaOD?: FileList | null;
  ctCorneaOS?: FileList | null;
  retinographyOD?: FileList | null;
  retinographyOS?: FileList | null;
  clinicalData: string;
  diagnosis: string;
  treatment?: string;
  followUp?: string;
  nextAppointment?: string;
  notes?: string;
};

type EvaluationMainFormProps = {
  rightEyeId?: string;
  leftEyeId?: string;
  form: UseFormReturn<EvaluationFormValues>;
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
};

export function EvaluationMainForm({
  form,
  lastEvaluationData,
  rightEyeId,
  leftEyeId,
}: EvaluationMainFormProps) {
  const handleFileUpload = async (
    file: File,
    fieldName: keyof EvaluationFormValues,
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

  const handleCopyODToOE = (
    fieldOD: keyof EvaluationFormValues,
    fieldOE: keyof EvaluationFormValues,
  ) => {
    const valueOD = form.getValues(fieldOD);
    form.setValue(fieldOE, valueOD ?? "");
  };

  const handleCopyLastData = (fields: Array<keyof EvaluationFormValues>) => {
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
          // Add other mappings as needed
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
  };

  const handleClearFields = (fields: Array<keyof EvaluationFormValues>) => {
    fields.forEach((field) => form.setValue(field, ""));
  };

  const biomicrsocopyOD = form.watch("biomicroscopyOD");
  const biomicrsocopyOS = form.watch("biomicroscopyOS");
  const isBiomicroscopyFilled = !!biomicrsocopyOD || !!biomicrsocopyOS;

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

  const ctCorneaOD = form.watch("ctCorneaOD");
  const ctCorneaOS = form.watch("ctCorneaOS");
  const isCtCorneaFilled = !!ctCorneaOD || !!ctCorneaOS;

  const retinographyOD = form.watch("retinographyOD");
  const retinographyOS = form.watch("retinographyOS");
  const isRetinographyFilled = !!retinographyOD || !!retinographyOS;

  return (
    <Form {...form}>
      <form className="min-w-xs flex w-full flex-col gap-6">
        {/* Dados Clínicos */}
        <FormField
          control={form.control}
          name="clinicalData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dados Clínicos</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descreva informações clínicas relevantes"
                  className="min-h-40 resize-y"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DIAGNÓSTICO */}
        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Diagnóstico
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() => handleCopyLastData(["diagnosis"])}
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Informe o diagnóstico do paciente"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TRATAMENTO */}
        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tratamento</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descreva o tratamento e/ou conduta sugerida"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ACOMPANHAMENTO */}
        <FormField
          control={form.control}
          name="followUp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acompanhamento</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Plano de acompanhamento"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PRÓXIMA CONSULTA */}
        <FormField
          control={form.control}
          name="nextAppointment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Próxima Consulta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Programação" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ANOTAÇÕES */}
        {/* <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escreva anotações adicionais"
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Accordion type="single" collapsible>
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
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyLastData([
                            "biomicroscopyOD",
                            "biomicroscopyOS",
                          ])
                        }
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyODToOE("biomicroscopyOD", "biomicroscopyOS")
                        }
                      >
                        <MdSwitchLeft size={18} />
                        OE semelhante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OE semelhante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleClearFields([
                            "biomicroscopyOD",
                            "biomicroscopyOS",
                          ])
                        }
                      >
                        <MdDeleteOutline size={18} />
                        Limpar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyLastData(["fundoscopyOD", "fundoscopyOS"])
                        }
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyODToOE("fundoscopyOD", "fundoscopyOS")
                        }
                      >
                        <MdSwitchLeft size={18} />
                        OE semelhante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OE semelhante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleClearFields(["fundoscopyOD", "fundoscopyOS"])
                        }
                      >
                        <MdDeleteOutline size={18} />
                        Limpar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyLastData(["gonioscopyOD", "gonioscopyOS"])
                        }
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyODToOE("gonioscopyOD", "gonioscopyOS")
                        }
                      >
                        <MdSwitchLeft size={18} />
                        OE semelhante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OE semelhante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleClearFields(["gonioscopyOD", "gonioscopyOS"])
                        }
                      >
                        <MdDeleteOutline size={18} />
                        Limpar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
          <AccordionItem value="pachymetry">
            <AccordionTrigger>
              <h3 className="flex items-center gap-2">
                Paquimetria
                {isPachymetryFilled && (
                  <MdOutlineCheck className="text-green-500" />
                )}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 p-2">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyLastData(["pachymetryOD", "pachymetryOS"])
                        }
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyODToOE("pachymetryOD", "pachymetryOS")
                        }
                      >
                        <MdSwitchLeft size={18} />
                        OE semelhante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OE semelhante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleClearFields(["pachymetryOD", "pachymetryOS"])
                        }
                      >
                        <MdDeleteOutline size={18} />
                        Limpar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyLastData(["tonometryOD", "tonometryOS"])
                        }
                      >
                        <MdOutlineFileCopy size={18} />
                        Importar última
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Importar última</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleCopyODToOE("tonometryOD", "tonometryOS")
                        }
                      >
                        <MdSwitchLeft size={18} />
                        OE semelhante
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>OE semelhante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          handleClearFields(["tonometryOD", "tonometryOS"])
                        }
                      >
                        <MdDeleteOutline size={18} />
                        Limpar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Limpar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
        </Accordion>
        <Accordion type="single" collapsible>
          {" "}
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
      </form>
    </Form>
  );
}
