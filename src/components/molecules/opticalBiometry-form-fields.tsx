import React, { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Input } from "../ui/input";

interface OpticalBiometryFormProps {
  eye: "OD" | "OS";
  opticalBiometryValue: string; // Valor atual (JSON) vindo do mainForm
  onChange: (value: string) => void; // Callback para atualizar o mainForm
}

interface OpticalBiometryValues {
  AL: string;
  K1: string;
  K1_axis: string;
  K2: string;
  K2_axis: string;
  DeltaK: string;
  DeltaK_axis: string;
  ACD: string;
  LT: string;
  WTW: string;
}

export function OpticalBiometryFormFields({
  eye,
  opticalBiometryValue,
  onChange,
}: OpticalBiometryFormProps) {
  // Inicializa os valores a partir da string JSON ou define os padrões
  const initialValues: OpticalBiometryValues = opticalBiometryValue
    ? JSON.parse(opticalBiometryValue)
    : {
        AL: "",
        K1: "",
        K1_axis: "",
        K2: "",
        K2_axis: "",
        DeltaK: "",
        DeltaK_axis: "",
        ACD: "",
        LT: "",
        WTW: "",
      };

  const [opticalBiometry, setOpticalBiometry] =
    useState<OpticalBiometryValues>(initialValues);

  // Atualiza o mainForm somente se o valor mudou
  useEffect(() => {
    const newValue = JSON.stringify(opticalBiometry);
    if (newValue !== opticalBiometryValue) {
      onChange(newValue);
    }
  }, [opticalBiometry, onChange, opticalBiometryValue]);

  const handleChange =
    (field: keyof OpticalBiometryValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOpticalBiometry((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <>
      <FormItem>
        <FormLabel htmlFor={`AL-${eye}`}>AL</FormLabel>
        <FormControl>
          <Input
            id={`AL-${eye}`}
            name={`AL-${eye}`}
            value={opticalBiometry.AL}
            onChange={handleChange("AL")}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel htmlFor={`K1-${eye}`}>K1</FormLabel>
          <FormControl>
            <Input
              id={`K1-${eye}`}
              name={`K1-${eye}`}
              value={opticalBiometry.K1}
              onChange={handleChange("K1")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor={`K1_axis-${eye}`}>@</FormLabel>
          <FormControl>
            <Input
              id={`K1_axis-${eye}`}
              name={`K1_axis-${eye}`}
              value={opticalBiometry.K1_axis}
              onChange={handleChange("K1_axis")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel htmlFor={`K2-${eye}`}>K2</FormLabel>
          <FormControl>
            <Input
              id={`K2-${eye}`}
              name={`K2-${eye}`}
              value={opticalBiometry.K2}
              onChange={handleChange("K2")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor={`K2_axis-${eye}`}>@</FormLabel>
          <FormControl>
            <Input
              id={`K2_axis-${eye}`}
              name={`K2_axis-${eye}`}
              value={opticalBiometry.K2_axis}
              onChange={handleChange("K2_axis")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel htmlFor={`DeltaK-${eye}`}>ΔK</FormLabel>
          <FormControl>
            <Input
              id={`DeltaK-${eye}`}
              name={`DeltaK-${eye}`}
              value={opticalBiometry.DeltaK}
              onChange={handleChange("DeltaK")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor={`DeltaK_axis-${eye}`}>@</FormLabel>
          <FormControl>
            <Input
              id={`DeltaK_axis-${eye}`}
              name={`DeltaK_axis-${eye}`}
              value={opticalBiometry.DeltaK_axis}
              onChange={handleChange("DeltaK_axis")}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>

      <FormItem>
        <FormLabel htmlFor={`ACD-${eye}`}>ACD</FormLabel>
        <FormControl>
          <Input
            id={`ACD-${eye}`}
            name={`ACD-${eye}`}
            value={opticalBiometry.ACD}
            onChange={handleChange("ACD")}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel htmlFor={`LT-${eye}`}>LT</FormLabel>
        <FormControl>
          <Input
            id={`LT-${eye}`}
            name={`LT-${eye}`}
            value={opticalBiometry.LT}
            onChange={handleChange("LT")}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel htmlFor={`WTW-${eye}`}>WTW</FormLabel>
        <FormControl>
          <Input
            id={`WTW-${eye}`}
            name={`WTW-${eye}`}
            value={opticalBiometry.WTW}
            onChange={handleChange("WTW")}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
}
