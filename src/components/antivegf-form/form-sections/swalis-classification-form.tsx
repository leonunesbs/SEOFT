"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import {
  swalisDescriptions,
  swalisOptions,
} from "~/lib/schemas/antivegf-schema";

import { AlertTriangle } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export function SwalisClassificationForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start justify-start">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Classificação Swalis (Urgência e Prioridade) *
          <Link
            href="https://www.saude.ce.gov.br/wp-content/uploads/sites/9/2018/06/nota_tecnica_fluxo_acesso_cirurgias_eletivas_14_10_2020.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 26 24"
              stroke="currentColor"
              aria-label="Informações sobre Classificação Swalis"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 17h.01M12 12h.01M12 7h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="swalisClassification"
          control={control}
          render={({ field }) => (
            <>
              <div
                className="mt-2 flex flex-wrap gap-2"
                role="group"
                aria-labelledby="swalis-classification"
              >
                {swalisOptions.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={field.value === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => field.onChange(option)}
                    aria-pressed={field.value === option}
                    className={
                      field.value === option
                        ? option === "A1" || option === "A2"
                          ? "bg-red-600 hover:bg-red-700"
                          : option === "B"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : option === "C"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-600 hover:bg-gray-700"
                        : ""
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {swalisDescriptions[field.value] && (
                <div className="mt-2 rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-700">
                    {swalisDescriptions[field.value]}
                  </p>
                </div>
              )}
            </>
          )}
        />
        {errors.swalisClassification && (
          <span className="text-sm text-red-500">
            {errors.swalisClassification.message as string}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
