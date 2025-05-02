"use client";

import { type EyeLog } from "@prisma/client";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

interface TonometryChartProps {
  evaluations: Array<{
    createdAt: Date;
    eyes: {
      rightEye: {
        logs: EyeLog[];
      };
      leftEye: {
        logs: EyeLog[];
      };
    } | null;
  }>;
}

interface ChartDataPoint {
  date: string;
  OD: number | "N/A";
  OS: number | "N/A";
}

const chartConfig = {
  OD: {
    label: "Olho Direito (OD)",
    color: "hsl(var(--sidebar-foreground))",
  },
  OS: {
    label: "Olho Esquerdo (OS) - Tracejado",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

const isValidNumericValue = (value: string | null | undefined): boolean => {
  if (!value) return false;
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

export function TonometryChart({ evaluations }: TonometryChartProps) {
  const chartData = evaluations
    .map((evaluation) => {
      const rightEyeTonometry = evaluation.eyes?.rightEye?.logs.find(
        (log) => log.type === "TONOMETRY",
      );
      const leftEyeTonometry = evaluation.eyes?.leftEye?.logs.find(
        (log) => log.type === "TONOMETRY",
      );

      const odValue = rightEyeTonometry?.details;
      const osValue = leftEyeTonometry?.details;

      return {
        date: new Date(evaluation.createdAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        OD: isValidNumericValue(odValue) ? parseFloat(odValue!) : "N/A",
        OS: isValidNumericValue(osValue) ? parseFloat(osValue!) : "N/A",
      } as ChartDataPoint;
    })
    .filter((data) => data.OD !== "N/A" || data.OS !== "N/A")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (chartData.length === 0) {
    return (
      <p className="text-muted-foreground">
        Nenhum dado de tonometria disponível.
      </p>
    );
  }

  const validODValues = chartData.filter(
    (d): d is ChartDataPoint & { OD: number } => typeof d.OD === "number",
  );
  const validOSValues = chartData.filter(
    (d): d is ChartDataPoint & { OS: number } => typeof d.OS === "number",
  );

  const averageOD =
    validODValues.length > 0
      ? validODValues.reduce((acc, curr) => acc + curr.OD, 0) /
        validODValues.length
      : 0;

  const averageOS =
    validOSValues.length > 0
      ? validOSValues.reduce((acc, curr) => acc + curr.OS, 0) /
        validOSValues.length
      : 0;

  // Calculate min and max values for the domain
  const allValues = [
    ...validODValues.map((d) => d.OD),
    ...validOSValues.map((d) => d.OS),
  ];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const domainMin = Math.max(0, minValue - 4);
  const domainMax = maxValue + 4;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>
          Média OD:{" "}
          {validODValues.length > 0 ? `${Math.round(averageOD)} mmHg` : "N/A"}
        </div>
        <div>
          Média OE:{" "}
          {validOSValues.length > 0 ? `${Math.round(averageOS)} mmHg` : "N/A"}
        </div>
      </div>
      <ChartContainer config={chartConfig}>
        <LineChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 12,
            bottom: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[domainMin, domainMax]}
            label={{
              value: "Pressão (mmHg)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(label: string) => {
                  if (label === "OS") return "Olho Esquerdo (OS) - Tracejado";
                  if (label === "OD") return "Olho Direito (OD)";
                  return label;
                }}
              />
            }
          />
          <Line
            dataKey="OD"
            type="monotone"
            stroke="var(--color-OD)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="0"
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number | "N/A") =>
                value === "N/A" ? "N/A" : value
              }
            />
          </Line>
          <Line
            dataKey="OS"
            type="monotone"
            stroke="var(--color-OS)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number | "N/A") =>
                value === "N/A" ? "N/A" : value
              }
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  );
}
