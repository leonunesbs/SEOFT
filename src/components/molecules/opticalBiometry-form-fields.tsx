import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

import { UseFormReturn } from "react-hook-form";
import { EvaluationMainFormValues } from "../organisms/evaluation-main-form";
import { Input } from "../ui/input";

interface OpticalBiometryFormProps {
  eye: "OD" | "OS";
  mainForm: UseFormReturn<EvaluationMainFormValues>;
  form: UseFormReturn<{
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
  }>;
}

export function OpticalBiometryFormFields({
  eye,
  mainForm,
  form,
}: OpticalBiometryFormProps) {
  const { register, getValues } = form;
  return (
    <>
      <FormItem>
        <FormLabel>AL</FormLabel>
        <FormControl>
          <Input
            {...register(`${eye}.AL`, {
              onChange: () => {
                mainForm.setValue(
                  `opticalBiometry${eye}`,
                  mainForm.getValues(`opticalBiometry${eye}`)
                    ? JSON.stringify({
                        ...JSON.parse(
                          mainForm.getValues(`opticalBiometry${eye}`) as string,
                        ),
                        AL: getValues(`${eye}.AL`),
                      })
                    : "",
                );
              },
            })}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>K1</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.K1`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          K1: getValues(`${eye}.K1`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>@</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.K1_axis`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          K1_axis: getValues(`${eye}.K1_axis`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>K2</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.K2`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          K2: getValues(`${eye}.K2`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>@</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.K2_axis`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          K2_axis: getValues(`${eye}.K2_axis`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>&Delta;K</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.DeltaK`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          DeltaK: getValues(`${eye}.DeltaK`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>@</FormLabel>
          <FormControl>
            <Input
              {...register(`${eye}.DeltaK_axis`, {
                onChange: () => {
                  mainForm.setValue(
                    `opticalBiometry${eye}`,
                    mainForm.getValues(`opticalBiometry${eye}`)
                      ? JSON.stringify({
                          ...JSON.parse(
                            mainForm.getValues(
                              `opticalBiometry${eye}`,
                            ) as string,
                          ),
                          DeltaK_axis: getValues(`${eye}.DeltaK_axis`),
                        })
                      : "",
                  );
                },
              })}
              placeholder="Informe o resultado"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>
      <FormItem>
        <FormLabel>ACD</FormLabel>
        <FormControl>
          <Input
            {...register(`${eye}.ACD`, {
              onChange: () => {
                mainForm.setValue(
                  `opticalBiometry${eye}`,
                  mainForm.getValues(`opticalBiometry${eye}`)
                    ? JSON.stringify({
                        ...JSON.parse(
                          mainForm.getValues(`opticalBiometry${eye}`) as string,
                        ),
                        ACD: getValues(`${eye}.ACD`),
                      })
                    : "",
                );
              },
            })}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem>
        <FormLabel>LT</FormLabel>
        <FormControl>
          <Input
            {...register(`${eye}.LT`, {
              onChange: () => {
                mainForm.setValue(
                  `opticalBiometry${eye}`,
                  mainForm.getValues(`opticalBiometry${eye}`)
                    ? JSON.stringify({
                        ...JSON.parse(
                          mainForm.getValues(`opticalBiometry${eye}`) as string,
                        ),
                        LT: getValues(`${eye}.LT`),
                      })
                    : "",
                );
              },
            })}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem>
        <FormLabel>WTW</FormLabel>
        <FormControl>
          <Input
            {...register(`${eye}.WTW`, {
              onChange: () => {
                mainForm.setValue(
                  `opticalBiometry${eye}`,
                  mainForm.getValues(`opticalBiometry${eye}`)
                    ? JSON.stringify({
                        ...JSON.parse(
                          mainForm.getValues(`opticalBiometry${eye}`) as string,
                        ),
                        WTW: getValues(`${eye}.WTW`),
                      })
                    : "",
                );
              },
            })}
            placeholder="Informe o resultado"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
}
