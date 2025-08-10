import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UseFormReturn, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
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
  const [openBiomicroscopyDialogOD, setOpenBiomicroscopyDialogOD] =
    useState(false);
  const [openBiomicroscopyDialogOS, setOpenBiomicroscopyDialogOS] =
    useState(false);
  const [openFundoscopyDialogOD, setOpenFundoscopyDialogOD] = useState(false);
  const [openFundoscopyDialogOS, setOpenFundoscopyDialogOS] = useState(false);

  type EyeSide = "OD" | "OS";
  type GradedType =
    | "blepharitis"
    | "cataract"
    | "conjunctivalHyperemia"
    | "aca" // anterior chamber activity (células/flare)
    | "anteriorSynechiae"
    | "posteriorSynechiae";
  const [gradedConfig, setGradedConfig] = useState<{
    eye: EyeSide;
    type: GradedType;
  } | null>(null);
  const [blepharitisChoice, setBlepharitisChoice] = useState<
    "anterior" | "posterior" | "both"
  >("anterior");
  const [cataractN, setCataractN] = useState<string>("");
  const [cataractC, setCataractC] = useState<string>("");
  const [cataractP, setCataractP] = useState<string>("");
  const [cataractLocsDraft, setCataractLocsDraft] = useState<string>("");
  const recomputeLocsDraft = useCallback((n: string, c: string, p: string) => {
    const parts: string[] = [];
    if (n) parts.push(`N${n}`);
    if (c) parts.push(`C${c}`);
    if (p) parts.push(`P${p}`);
    return parts.join("");
  }, []);
  const setLocsComponent = useCallback(
    (component: "N" | "C" | "P", value: string) => {
      if (component === "N") setCataractN(value);
      if (component === "C") setCataractC(value);
      if (component === "P") setCataractP(value);
      // compute after microtask using updated state values
      setTimeout(() => {
        setCataractLocsDraft(
          recomputeLocsDraft(
            component === "N" ? value : cataractN,
            component === "C" ? value : cataractC,
            component === "P" ? value : cataractP,
          ),
        );
      }, 0);
    },
    [cataractN, cataractC, cataractP, recomputeLocsDraft],
  );
  const parseLocsDraft = useCallback(
    (draft: string) => {
      const n = /n\s*([0-6])/i.exec(draft)?.[1] ?? "";
      const c = /c\s*([0-5])/i.exec(draft)?.[1] ?? "";
      const p = /p\s*([0-5])/i.exec(draft)?.[1] ?? "";
      setCataractN(n);
      setCataractC(c);
      setCataractP(p);
      setCataractLocsDraft(recomputeLocsDraft(n, c, p));
    },
    [recomputeLocsDraft],
  );
  const [hyperemiaGrade, setHyperemiaGrade] = useState<string>("");
  const [hyperemiaPattern, setHyperemiaPattern] = useState<
    "difusa" | "setorial" | "pericerática" | ""
  >("");
  const [acaCells, setAcaCells] = useState<string>(""); // 0, 0.5+, 1+, 2+, 3+, 4+
  const [acaFlare, setAcaFlare] = useState<string>(""); // 0, 0.5+, 1+, 2+, 3+, 4+
  const [antSynQuadrants, setAntSynQuadrants] = useState<string>(""); // 1-3, 4 => 360°
  const [antSynHours, setAntSynHours] = useState<string>(""); // livre (ex.: 2-4h)
  const [postSynExtent, setPostSynExtent] = useState<
    "" | "focais" | "setoriais" | "360°"
  >("");
  const [postSynHours, setPostSynHours] = useState<string>("");

  // Quick presets and phrases for Biomicroscopy
  const biomicroscopyPresetNormal =
    "Pálpebras e anexos: sem alterações; Conjuntiva: sem alterações; Córnea: transparente; Câmara anterior: profunda e quieta, células 0, flare 0; Íris: sem alterações; Cristalino: transparente; Vítreo: sem alterações.";

  // Segmentar Biomicroscopia para funcionar como a Fundoscopia (toggle por segmento)
  const biomicroscopyQuickSegments: Array<{
    label: string;
    segment: string;
    text: string;
  }> = [
    // Pálpebras e anexos
    {
      label: "Blefarite",
      segment: "Pálpebras e anexos",
      text: "Pálpebras e anexos: blefarite;",
    },
    {
      label: "Hordéolo",
      segment: "Pálpebras e anexos",
      text: "Pálpebras e anexos: hordéolo;",
    },
    // Conjuntiva
    {
      label: "Hiperemia conjuntival",
      segment: "Conjuntiva",
      text: "Conjuntiva: hiperemia;",
    },
    { label: "Secreção", segment: "Conjuntiva", text: "Conjuntiva: secreção;" },
    {
      label: "Pinguécula",
      segment: "Conjuntiva",
      text: "Conjuntiva: pinguécula;",
    },
    { label: "Pterígio", segment: "Conjuntiva", text: "Conjuntiva: pterígio;" },
    // Córnea
    { label: "Edema de córnea", segment: "Córnea", text: "Córnea: edema;" },
    { label: "Úlcera", segment: "Córnea", text: "Córnea: úlcera;" },
    { label: "Leucoma", segment: "Córnea", text: "Córnea: leucoma;" },
    // Câmara anterior
    {
      label: "RCA (células/flare)",
      segment: "Câmara anterior",
      text: "Câmara anterior: células ; flare ;",
    },
    // Íris
    {
      label: "Sinéquias anteriores",
      segment: "Íris",
      text: "Íris: sinéquias anteriores;",
    },
    {
      label: "Sinéquias posteriores",
      segment: "Íris",
      text: "Íris: sinéquias posteriores;",
    },
    { label: "Atrofia de íris", segment: "Íris", text: "Íris: atrofia;" },
    // Cristalino
    {
      label: "Catarata (LOCS)",
      segment: "Cristalino",
      text: "Cristalino: catarata;",
    },
    {
      label: "Pseudofacia",
      segment: "Cristalino",
      text: "Cristalino: pseudofacia, boa centralização;",
    },
    { label: "Afacia", segment: "Cristalino", text: "Cristalino: afacia;" },
    // Vítreo
    { label: "Sinérese vítrea", segment: "Vítreo", text: "Vítreo: sinérese;" },
    {
      label: "Opacidades vítreas",
      segment: "Vítreo",
      text: "Vítreo: opacidades;",
    },
  ];

  const setBiomicroscopyPresetNormal = useCallback(
    (fieldName: keyof EvaluationMainFormValues) => {
      form.setValue(fieldName, biomicroscopyPresetNormal, {
        shouldDirty: true,
      });
    },
    [form],
  );

  // Preset e frases rápidas para Fundoscopia
  const fundoscopyPresetNormal =
    "Nervo óptico: cor e escavação preservadas; Mácula: sem alterações; Vasos: trajeto e calibre preservados; Polo posterior: aplicado;";

  const setFundoscopyPresetNormal = useCallback(
    (fieldName: keyof EvaluationMainFormValues) => {
      form.setValue(fieldName, fundoscopyPresetNormal, { shouldDirty: true });
    },
    [form],
  );

  const fundoscopyQuickSegments: Array<{
    label: string;
    segment:
      | "Nervo óptico"
      | "Mácula"
      | "Vasos"
      | "Polo posterior"
      | "Vítreo"
      | "Localização";
    text: string;
  }> = [
    // Nervo óptico
    {
      label: "Nervo óptico normal",
      segment: "Nervo óptico",
      text: "Nervo óptico: cor e escavação preservadas;",
    },
    {
      label: "Nervo óptico com escavação aumentada",
      segment: "Nervo óptico",
      text: "Nervo óptico: escavação aumentada;",
    },
    {
      label: "Nervo óptico pálido",
      segment: "Nervo óptico",
      text: "Nervo óptico: palidez;",
    },
    // Mácula
    {
      label: "Mácula normal",
      segment: "Mácula",
      text: "Mácula: sem alterações;",
    },
    { label: "Edema macular", segment: "Mácula", text: "Mácula: edema;" },
    { label: "Drusas", segment: "Mácula", text: "Mácula: drusas;" },
    {
      label: "Alteração do brilho macular",
      segment: "Mácula",
      text: "Mácula: brilho alterado;",
    },
    {
      label: "Exsudatos duros",
      segment: "Mácula",
      text: "Mácula: exsudatos duros;",
    },
    {
      label: "Exsudação macular",
      segment: "Mácula",
      text: "Mácula: exsudação;",
    },
    // Vasos
    {
      label: "Vasos normais",
      segment: "Vasos",
      text: "Vasos: trajeto e calibre preservados;",
    },
    { label: "Tortuosos", segment: "Vasos", text: "Vasos: tortuosidade;" },
    { label: "Atenuados", segment: "Vasos", text: "Vasos: atenuados;" },
    {
      label: "Afilamento arteriolar",
      segment: "Vasos",
      text: "Vasos: afilamento arteriolar;",
    },
    {
      label: "Cruzamentos A-V patológicos",
      segment: "Vasos",
      text: "Vasos: cruzamentos A-V patológicos;",
    },
    // Polo posterior (substitui Retina)
    {
      label: "Polo posterior aplicado",
      segment: "Polo posterior",
      text: "Polo posterior: aplicado;",
    },
    {
      label: "Descolamento de retina",
      segment: "Polo posterior",
      text: "Polo posterior: descolamento de retina;",
    },
    {
      label: "Hemorragias",
      segment: "Polo posterior",
      text: "Polo posterior: hemorragias;",
    },
    {
      label: "Micro-hemorragias",
      segment: "Polo posterior",
      text: "Polo posterior: micro-hemorragias;",
    },
    {
      label: "Hemorragias em chama de vela",
      segment: "Polo posterior",
      text: "Polo posterior: hemorragias em chama de vela;",
    },
    {
      label: "Rarefação do EPR",
      segment: "Polo posterior",
      text: "Polo posterior: rarefação do EPR;",
    },
    {
      label: "Hiperplasia do EPR",
      segment: "Polo posterior",
      text: "Polo posterior: hiperplasia do EPR;",
    },
    {
      label: "Atrofia do EPR",
      segment: "Polo posterior",
      text: "Polo posterior: atrofia do EPR;",
    },
    {
      label: "Cicatriz coriorretiniana",
      segment: "Polo posterior",
      text: "Polo posterior: cicatriz coriorretiniana;",
    },
    {
      label: "Proliferação fibrovascular",
      segment: "Polo posterior",
      text: "Polo posterior: proliferação fibrovascular;",
    },
    {
      label: "Proliferação vítreorretiniana",
      segment: "Polo posterior",
      text: "Polo posterior: proliferação vítreorretiniana;",
    },
    // Vítreo
    {
      label: "Hemorragia vítrea",
      segment: "Vítreo",
      text: "Vítreo: hemorragia;",
    },
    { label: "Turvação vítrea", segment: "Vítreo", text: "Vítreo: turvação;" },
    // Localização (pontos de referência)
    {
      label: "Localização: junto ao nervo óptico",
      segment: "Localização",
      text: "Localização: junto ao nervo óptico;",
    },
    {
      label: "Localização: na mácula",
      segment: "Localização",
      text: "Localização: na mácula;",
    },
    {
      label: "Localização: feixe papilomacular",
      segment: "Localização",
      text: "Localização: ao longo do feixe papilomacular;",
    },
    {
      label: "Localização: arcada superior",
      segment: "Localização",
      text: "Localização: ao longo da arcada superior;",
    },
    {
      label: "Localização: arcada inferior",
      segment: "Localização",
      text: "Localização: ao longo da arcada inferior;",
    },
  ];

  // Helper genérico para inserir/substituir um segmento textual em um campo
  const upsertSegment = useCallback(
    (
      fieldName: keyof EvaluationMainFormValues,
      pattern: RegExp,
      newSegment: string,
    ) => {
      const current = ((form.getValues(fieldName) as string) ?? "").trim();
      const cleaned = current.replace(pattern, "").trim();
      const next = `${cleaned}${cleaned ? " " : ""}${newSegment}`;
      form.setValue(fieldName, next, { shouldDirty: true });
    },
    [form],
  );

  const escapeRegExp = (input: string) =>
    input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Helpers para concatenar/toggle itens dentro de um mesmo segmento (ex.: Mácula: edema, drusas;)
  const getFundoscopySegmentBody = useCallback(
    (value: string, segment: string) => {
      const pattern = new RegExp(`${escapeRegExp(segment)}: ([^;]*);`, "i");
      const match = pattern.exec(value ?? "");
      return match?.[1]?.trim() ?? "";
    },
    [],
  );

  const setFundoscopySegmentBody = useCallback(
    (
      fieldName: keyof EvaluationMainFormValues,
      segment: string,
      items: string[],
    ) => {
      const body = items.filter(Boolean).join(", ");
      const newText = body ? `${segment}: ${body};` : "";
      const pattern = new RegExp(`${escapeRegExp(segment)}: [^;]*;\\s*`, "gi");
      upsertSegment(fieldName, pattern, newText);
    },
    [upsertSegment],
  );

  const toggleFundoscopyItem = useCallback(
    (
      fieldName: keyof EvaluationMainFormValues,
      segment: string,
      itemValue: string,
    ) => {
      const current = (form.getValues(fieldName) as string) ?? "";
      const body = getFundoscopySegmentBody(current, segment);
      const parts = body
        ? body
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        : [];
      const exists = parts.some(
        (p) => p.toLowerCase() === itemValue.toLowerCase(),
      );
      const next = exists
        ? parts.filter((p) => p.toLowerCase() !== itemValue.toLowerCase())
        : [...parts, itemValue];
      setFundoscopySegmentBody(fieldName, segment, next);
    },
    [form, getFundoscopySegmentBody, setFundoscopySegmentBody],
  );

  const extractSegmentValue = useCallback((text: string) => {
    const idx = text.indexOf(":");
    const raw = idx === -1 ? text : text.slice(idx + 1);
    return raw.replace(/;$/, "").trim();
  }, []);

  // Helpers de segmento para Biomicroscopia (espelhando Fundoscopia)
  const getBiomicroscopySegmentBody = useCallback(
    (value: string, segment: string) => {
      const pattern = new RegExp(`${escapeRegExp(segment)}: ([^;]*);`, "i");
      const match = pattern.exec(value ?? "");
      return match?.[1]?.trim() ?? "";
    },
    [],
  );

  const setBiomicroscopySegmentBody = useCallback(
    (
      fieldName: keyof EvaluationMainFormValues,
      segment: string,
      items: string[],
    ) => {
      const body = items.filter(Boolean).join(", ");
      const newText = body ? `${segment}: ${body};` : "";
      const pattern = new RegExp(`${escapeRegExp(segment)}: [^;]*;\\s*`, "gi");
      upsertSegment(fieldName, pattern, newText);
    },
    [upsertSegment],
  );

  const toggleBiomicroscopyItem = useCallback(
    (
      fieldName: keyof EvaluationMainFormValues,
      segment: string,
      itemValue: string,
    ) => {
      const current = (form.getValues(fieldName) as string) ?? "";
      const body = getBiomicroscopySegmentBody(current, segment);
      const parts = body
        ? body
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        : [];
      const exists = parts.some(
        (p) => p.toLowerCase() === itemValue.toLowerCase(),
      );
      const next = exists
        ? parts.filter((p) => p.toLowerCase() !== itemValue.toLowerCase())
        : [...parts, itemValue];
      setBiomicroscopySegmentBody(fieldName, segment, next);
    },
    [form, getBiomicroscopySegmentBody, setBiomicroscopySegmentBody],
  );

  const applyBlepharitis = useCallback(() => {
    if (!gradedConfig) return;
    const fieldName = (
      gradedConfig.eye === "OD" ? "biomicroscopyOD" : "biomicroscopyOS"
    ) as keyof EvaluationMainFormValues;
    const text =
      blepharitisChoice === "both"
        ? "Pálpebras e anexos: blefarite anterior e posterior;"
        : `Pálpebras e anexos: blefarite ${blepharitisChoice};`;
    upsertSegment(fieldName, /Pálpebras e anexos: blefarite[^;]*;\s*/gi, text);
    setGradedConfig(null);
  }, [gradedConfig, blepharitisChoice, upsertSegment]);

  const applyCataract = useCallback(() => {
    if (!gradedConfig) return;
    const fieldName = (
      gradedConfig.eye === "OD" ? "biomicroscopyOD" : "biomicroscopyOS"
    ) as keyof EvaluationMainFormValues;
    const parts: string[] = [];
    if (cataractN) parts.push(`N${cataractN}`);
    if (cataractC) parts.push(`C${cataractC}`);
    if (cataractP) parts.push(`P${cataractP}`);
    if (cataractLocsDraft && parts.length === 0) {
      const n = /N\s*([0-6])/i.exec(cataractLocsDraft)?.[1];
      const c = /C\s*([0-5])/i.exec(cataractLocsDraft)?.[1];
      const p = /P\s*([0-5])/i.exec(cataractLocsDraft)?.[1];
      if (n) parts.push(`N${n}`);
      if (c) parts.push(`C${c}`);
      if (p) parts.push(`P${p}`);
    }
    // If explicitly N0 C0 P0, clear catarata segment (no text)
    if (parts.join(" ") === "N0 C0 P0") {
      upsertSegment(fieldName, /Cristalino: catarata[^;]*;\s*/gi, "");
      setGradedConfig(null);
      setCataractN("");
      setCataractC("");
      setCataractP("");
      setCataractLocsDraft("");
      return;
    }
    if (parts.length === 0) return; // nothing selected
    const text = `Cristalino: catarata ${parts.join(" ")};`;
    upsertSegment(fieldName, /Cristalino: catarata[^;]*;\s*/gi, text);
    setGradedConfig(null);
    setCataractN("");
    setCataractC("");
    setCataractP("");
    setCataractLocsDraft("");
  }, [
    gradedConfig,
    cataractN,
    cataractC,
    cataractP,
    upsertSegment,
    cataractLocsDraft,
  ]);

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
                  {/* Quick inputs OD */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setBiomicroscopyPresetNormal(
                          "biomicroscopyOD" as keyof EvaluationMainFormValues,
                        )
                      }
                    >
                      Normal
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenBiomicroscopyDialogOD(true)}
                    >
                      Adicionar achados
                    </Button>
                  </div>
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
                  {/* Quick inputs OS */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setBiomicroscopyPresetNormal(
                          "biomicroscopyOS" as keyof EvaluationMainFormValues,
                        )
                      }
                    >
                      Normal
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenBiomicroscopyDialogOS(true)}
                    >
                      Adicionar achados
                    </Button>
                  </div>
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

              {/* Dialog OD */}
              <CommandDialog
                open={openBiomicroscopyDialogOD}
                onOpenChange={setOpenBiomicroscopyDialogOD}
              >
                <CommandInput placeholder="Buscar achados" />
                <CommandList>
                  <CommandEmpty>Nenhum achado encontrado.</CommandEmpty>
                  <CommandGroup heading="Achados comuns (OD)">
                    {biomicroscopyQuickSegments.map((item) => {
                      const current =
                        (form.getValues("biomicroscopyOD") as string) ?? "";
                      const segmentBody = getBiomicroscopySegmentBody(
                        current,
                        item.segment,
                      );
                      const included = segmentBody
                        .toLowerCase()
                        .includes(extractSegmentValue(item.text).toLowerCase());
                      const isBleph = item.label === "Blefarite";
                      const isCataract = item.label === "Catarata (LOCS)";
                      const isHyperemia =
                        item.label === "Hiperemia conjuntival";
                      const isACA = item.label === "RCA (células/flare)";
                      const isAntSyn = item.label === "Sinéquias anteriores";
                      const isPostSyn = item.label === "Sinéquias posteriores";
                      return (
                        <CommandItem
                          key={`bio-od-${item.label}`}
                          onSelect={() => {
                            if (isBleph) {
                              setBlepharitisChoice("anterior");
                              setGradedConfig({
                                eye: "OD",
                                type: "blepharitis",
                              });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            if (isCataract) {
                              setCataractN("");
                              setCataractC("");
                              setCataractP("");
                              setGradedConfig({ eye: "OD", type: "cataract" });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            if (isHyperemia) {
                              setHyperemiaGrade("");
                              setHyperemiaPattern("");
                              setGradedConfig({
                                eye: "OD",
                                type: "conjunctivalHyperemia",
                              });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            if (isACA) {
                              setAcaCells("");
                              setAcaFlare("");
                              setGradedConfig({ eye: "OD", type: "aca" });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            if (isAntSyn) {
                              setAntSynQuadrants("");
                              setAntSynHours("");
                              setGradedConfig({
                                eye: "OD",
                                type: "anteriorSynechiae",
                              });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            if (isPostSyn) {
                              setPostSynExtent("");
                              setPostSynHours("");
                              setGradedConfig({
                                eye: "OD",
                                type: "posteriorSynechiae",
                              });
                              setOpenBiomicroscopyDialogOD(false);
                              return;
                            }
                            const value = extractSegmentValue(item.text);
                            toggleBiomicroscopyItem(
                              "biomicroscopyOD" as keyof EvaluationMainFormValues,
                              item.segment,
                              value,
                            );
                          }}
                        >
                          {included ? (
                            <Check className="text-primary" />
                          ) : (
                            <span className="inline-block h-4 w-4" />
                          )}
                          {item.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </CommandDialog>

              {/* Dialog OS */}
              <CommandDialog
                open={openBiomicroscopyDialogOS}
                onOpenChange={setOpenBiomicroscopyDialogOS}
              >
                <CommandInput placeholder="Buscar achados" />
                <CommandList>
                  <CommandEmpty>Nenhum achado encontrado.</CommandEmpty>
                  <CommandGroup heading="Achados comuns (OE)">
                    {biomicroscopyQuickSegments.map((item) => {
                      const current =
                        (form.getValues("biomicroscopyOS") as string) ?? "";
                      const segmentBody = getBiomicroscopySegmentBody(
                        current,
                        item.segment,
                      );
                      const included = segmentBody
                        .toLowerCase()
                        .includes(extractSegmentValue(item.text).toLowerCase());
                      const isBleph = item.label === "Blefarite";
                      const isCataract = item.label === "Catarata (LOCS)";
                      const isHyperemia =
                        item.label === "Hiperemia conjuntival";
                      const isACA = item.label === "RCA (células/flare)";
                      const isAntSyn = item.label === "Sinéquias anteriores";
                      const isPostSyn = item.label === "Sinéquias posteriores";
                      return (
                        <CommandItem
                          key={`bio-os-${item.label}`}
                          onSelect={() => {
                            if (isBleph) {
                              setBlepharitisChoice("anterior");
                              setGradedConfig({
                                eye: "OS",
                                type: "blepharitis",
                              });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            if (isCataract) {
                              setCataractN("");
                              setCataractC("");
                              setCataractP("");
                              setGradedConfig({ eye: "OS", type: "cataract" });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            if (isHyperemia) {
                              setHyperemiaGrade("");
                              setHyperemiaPattern("");
                              setGradedConfig({
                                eye: "OS",
                                type: "conjunctivalHyperemia",
                              });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            if (isACA) {
                              setAcaCells("");
                              setAcaFlare("");
                              setGradedConfig({ eye: "OS", type: "aca" });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            if (isAntSyn) {
                              setAntSynQuadrants("");
                              setAntSynHours("");
                              setGradedConfig({
                                eye: "OS",
                                type: "anteriorSynechiae",
                              });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            if (isPostSyn) {
                              setPostSynExtent("");
                              setPostSynHours("");
                              setGradedConfig({
                                eye: "OS",
                                type: "posteriorSynechiae",
                              });
                              setOpenBiomicroscopyDialogOS(false);
                              return;
                            }
                            const value = extractSegmentValue(item.text);
                            toggleBiomicroscopyItem(
                              "biomicroscopyOS" as keyof EvaluationMainFormValues,
                              item.segment,
                              value,
                            );
                          }}
                        >
                          {included ? (
                            <Check className="text-primary" />
                          ) : (
                            <span className="inline-block h-4 w-4" />
                          )}
                          {item.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </CommandDialog>

              {/* Graded details dialog */}
              <Dialog
                open={!!gradedConfig}
                onOpenChange={() => setGradedConfig(null)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {gradedConfig?.type === "blepharitis" &&
                        `Blefarite (${gradedConfig?.eye})`}
                      {gradedConfig?.type === "cataract" &&
                        `Catarata (${gradedConfig?.eye})`}
                      {gradedConfig?.type === "conjunctivalHyperemia" &&
                        `Hiperemia conjuntival (${gradedConfig?.eye})`}
                      {gradedConfig?.type === "aca" &&
                        `Atividade de câmara anterior (${gradedConfig?.eye})`}
                      {gradedConfig?.type === "anteriorSynechiae" &&
                        `Sinéquias anteriores (${gradedConfig?.eye})`}
                      {gradedConfig?.type === "posteriorSynechiae" &&
                        `Sinéquias posteriores (${gradedConfig?.eye})`}
                    </DialogTitle>
                  </DialogHeader>

                  {gradedConfig?.type === "blepharitis" && (
                    <div className="space-y-4">
                      <RadioGroup
                        value={blepharitisChoice}
                        onValueChange={(v) =>
                          setBlepharitisChoice(
                            v as "anterior" | "posterior" | "both",
                          )
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="blef-ant" value="anterior" />
                          <label htmlFor="blef-ant" className="text-sm">
                            Anterior
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="blef-post" value="posterior" />
                          <label htmlFor="blef-post" className="text-sm">
                            Posterior
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="blef-both" value="both" />
                          <label htmlFor="blef-both" className="text-sm">
                            Anterior e posterior
                          </label>
                        </div>
                      </RadioGroup>
                      <DialogFooter>
                        <Button type="button" onClick={applyBlepharitis}>
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}

                  {gradedConfig?.type === "cataract" && (
                    <div className="space-y-3">
                      <label className="mb-1 block text-sm">
                        LOCS (ex.: N3C2P1 ou N4 P2)
                      </label>
                      <Input
                        value={cataractLocsDraft}
                        onChange={(e) => parseLocsDraft(e.target.value)}
                        placeholder="Digite N1-6 C1-5 P1-5"
                      />
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div>
                          <div className="mb-1 text-xs text-muted-foreground">
                            Núcleo (N)
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["1", "2", "3", "4", "5", "6"].map((v) => (
                              <Button
                                key={`N-${v}`}
                                variant={
                                  cataractN === v ? "default" : "outline"
                                }
                                size="icon"
                                type="button"
                                onClick={() => setLocsComponent("N", v)}
                              >
                                N{v}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 text-xs text-muted-foreground">
                            Córtex (C)
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["1", "2", "3", "4", "5"].map((v) => (
                              <Button
                                key={`C-${v}`}
                                variant={
                                  cataractC === v ? "default" : "outline"
                                }
                                size="icon"
                                type="button"
                                onClick={() => setLocsComponent("C", v)}
                              >
                                C{v}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 text-xs text-muted-foreground">
                            Posterior (P)
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["1", "2", "3", "4", "5"].map((v) => (
                              <Button
                                key={`P-${v}`}
                                variant={
                                  cataractP === v ? "default" : "outline"
                                }
                                size="icon"
                                type="button"
                                onClick={() => setLocsComponent("P", v)}
                              >
                                P{v}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={applyCataract}>
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}

                  {gradedConfig?.type === "conjunctivalHyperemia" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm">
                            Grau (1–4)
                          </label>
                          <Select
                            value={hyperemiaGrade}
                            onValueChange={setHyperemiaGrade}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Grau" />
                            </SelectTrigger>
                            <SelectContent>
                              {["1", "2", "3", "4"].map((v) => (
                                <SelectItem key={`H-${v}`} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm">Padrão</label>
                          <Select
                            value={hyperemiaPattern}
                            onValueChange={(v) =>
                              setHyperemiaPattern(
                                v as "difusa" | "setorial" | "pericerática",
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                ["difusa", "setorial", "pericerática"] as const
                              ).map((v) => (
                                <SelectItem key={`HP-${v}`} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            if (!gradedConfig) return;
                            const fieldName = (
                              gradedConfig.eye === "OD"
                                ? "biomicroscopyOD"
                                : "biomicroscopyOS"
                            ) as keyof EvaluationMainFormValues;
                            const parts: string[] = [];
                            if (hyperemiaGrade)
                              parts.push(`grau ${hyperemiaGrade}`);
                            if (hyperemiaPattern)
                              parts.push(`${hyperemiaPattern}`);
                            if (parts.length === 0) return;
                            const text = `Conjuntiva: hiperemia ${parts.join(", ")};`;
                            upsertSegment(
                              fieldName,
                              /Conjuntiva: hiperemia[^;]*;\s*/gi,
                              text,
                            );
                            setGradedConfig(null);
                            setHyperemiaGrade("");
                            setHyperemiaPattern("");
                          }}
                        >
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}

                  {gradedConfig?.type === "aca" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm">
                            Células (SUN)
                          </label>
                          <Select value={acaCells} onValueChange={setAcaCells}>
                            <SelectTrigger>
                              <SelectValue placeholder="0, 0.5+, 1+..." />
                            </SelectTrigger>
                            <SelectContent>
                              {["0", "0.5+", "1+", "2+", "3+", "4+"].map(
                                (v) => (
                                  <SelectItem key={`cells-${v}`} value={v}>
                                    {v}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm">
                            Flare (SUN)
                          </label>
                          <Select value={acaFlare} onValueChange={setAcaFlare}>
                            <SelectTrigger>
                              <SelectValue placeholder="0, 0.5+, 1+..." />
                            </SelectTrigger>
                            <SelectContent>
                              {["0", "0.5+", "1+", "2+", "3+", "4+"].map(
                                (v) => (
                                  <SelectItem key={`flare-${v}`} value={v}>
                                    {v}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            if (!gradedConfig) return;
                            const fieldName = (
                              gradedConfig.eye === "OD"
                                ? "biomicroscopyOD"
                                : "biomicroscopyOS"
                            ) as keyof EvaluationMainFormValues;
                            const parts: string[] = [];
                            if (acaCells) parts.push(`células ${acaCells}`);
                            if (acaFlare) parts.push(`flare ${acaFlare}`);
                            if (parts.length === 0) return;
                            const text = `Câmara anterior: ${parts.join(", ")};`;
                            upsertSegment(
                              fieldName,
                              /Câmara anterior:[^;]*;\s*/gi,
                              text,
                            );
                            setGradedConfig(null);
                            setAcaCells("");
                            setAcaFlare("");
                          }}
                        >
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}

                  {gradedConfig?.type === "anteriorSynechiae" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm">
                            Quadrantes
                          </label>
                          <Select
                            value={antSynQuadrants}
                            onValueChange={setAntSynQuadrants}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {["1", "2", "3", "4"].map((v) => (
                                <SelectItem key={`ant-q-${v}`} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm">
                            Horas (opcional)
                          </label>
                          <Input
                            value={antSynHours}
                            onChange={(e) => setAntSynHours(e.target.value)}
                            placeholder="ex.: 2-4h"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            if (!gradedConfig) return;
                            const fieldName = (
                              gradedConfig.eye === "OD"
                                ? "biomicroscopyOD"
                                : "biomicroscopyOS"
                            ) as keyof EvaluationMainFormValues;
                            if (!antSynQuadrants) return;
                            const quad =
                              antSynQuadrants === "4"
                                ? "360°"
                                : `${antSynQuadrants} quadrantes`;
                            const hours = antSynHours ? `, ${antSynHours}` : "";
                            const text = `Íris: sinéquias anteriores (${quad}${hours});`;
                            upsertSegment(
                              fieldName,
                              /Íris: sinéquias anteriores[^;]*;\s*/gi,
                              text,
                            );
                            setGradedConfig(null);
                            setAntSynQuadrants("");
                            setAntSynHours("");
                          }}
                        >
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}

                  {gradedConfig?.type === "posteriorSynechiae" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm">Extensão</label>
                          <Select
                            value={postSynExtent}
                            onValueChange={(v) =>
                              setPostSynExtent(
                                v as "focais" | "setoriais" | "360°",
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {(["focais", "setoriais", "360°"] as const).map(
                                (v) => (
                                  <SelectItem key={`post-e-${v}`} value={v}>
                                    {v}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="mb-1 block text-sm">
                            Horas (opcional)
                          </label>
                          <Input
                            value={postSynHours}
                            onChange={(e) => setPostSynHours(e.target.value)}
                            placeholder="ex.: 6-8h"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => {
                            if (!gradedConfig) return;
                            const fieldName = (
                              gradedConfig.eye === "OD"
                                ? "biomicroscopyOD"
                                : "biomicroscopyOS"
                            ) as keyof EvaluationMainFormValues;
                            if (!postSynExtent) return;
                            const hours = postSynHours
                              ? `, ${postSynHours}`
                              : "";
                            const text = `Íris: sinéquias posteriores (${postSynExtent}${hours});`;
                            upsertSegment(
                              fieldName,
                              /Íris: sinéquias posteriores[^;]*;\s*/gi,
                              text,
                            );
                            setGradedConfig(null);
                            setPostSynExtent("");
                            setPostSynHours("");
                          }}
                        >
                          Aplicar
                        </Button>
                      </DialogFooter>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
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
                  {/* Quick inputs OD */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setFundoscopyPresetNormal(
                          "fundoscopyOD" as keyof EvaluationMainFormValues,
                        )
                      }
                    >
                      Normal
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenFundoscopyDialogOD(true)}
                    >
                      Adicionar achados
                    </Button>
                  </div>
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
                  {/* Quick inputs OS */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setFundoscopyPresetNormal(
                          "fundoscopyOS" as keyof EvaluationMainFormValues,
                        )
                      }
                    >
                      Normal
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenFundoscopyDialogOS(true)}
                    >
                      Adicionar achados
                    </Button>
                  </div>
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
              {/* Dialogs Fundoscopia */}
              <CommandDialog
                open={openFundoscopyDialogOD}
                onOpenChange={setOpenFundoscopyDialogOD}
              >
                <CommandInput placeholder="Buscar achados (OD)" />
                <CommandList>
                  <CommandEmpty>Nenhum achado encontrado.</CommandEmpty>
                  <CommandGroup heading="Achados (OD)">
                    {fundoscopyQuickSegments.map((item) => {
                      const current =
                        (form.getValues("fundoscopyOD") as string) ?? "";
                      const segmentBody = getFundoscopySegmentBody(
                        current,
                        item.segment,
                      );
                      const included = segmentBody
                        .toLowerCase()
                        .includes(extractSegmentValue(item.text).toLowerCase());
                      return (
                        <CommandItem
                          key={`fund-od-${item.label}`}
                          onSelect={() => {
                            // item.text é do formato "Segmento: valor;" -> extrair só o valor
                            const value = extractSegmentValue(item.text);
                            toggleFundoscopyItem(
                              "fundoscopyOD" as keyof EvaluationMainFormValues,
                              item.segment,
                              value,
                            );
                          }}
                        >
                          {included ? (
                            <Check className="text-primary" />
                          ) : (
                            <span className="inline-block h-4 w-4" />
                          )}
                          {item.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </CommandDialog>

              <CommandDialog
                open={openFundoscopyDialogOS}
                onOpenChange={setOpenFundoscopyDialogOS}
              >
                <CommandInput placeholder="Buscar achados (OE)" />
                <CommandList>
                  <CommandEmpty>Nenhum achado encontrado.</CommandEmpty>
                  <CommandGroup heading="Achados (OE)">
                    {fundoscopyQuickSegments.map((item) => {
                      const current =
                        (form.getValues("fundoscopyOS") as string) ?? "";
                      const segmentBody = getFundoscopySegmentBody(
                        current,
                        item.segment,
                      );
                      const included = segmentBody
                        .toLowerCase()
                        .includes(extractSegmentValue(item.text).toLowerCase());
                      return (
                        <CommandItem
                          key={`fund-os-${item.label}`}
                          onSelect={() => {
                            const value = extractSegmentValue(item.text);
                            toggleFundoscopyItem(
                              "fundoscopyOS" as keyof EvaluationMainFormValues,
                              item.segment,
                              value,
                            );
                          }}
                        >
                          {included ? (
                            <Check className="text-primary" />
                          ) : (
                            <span className="inline-block h-4 w-4" />
                          )}
                          {item.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
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
