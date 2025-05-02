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

export function TonometryChart({ evaluations }: TonometryChartProps) {
  const chartData = evaluations
    .map((evaluation) => {
      const rightEyeTonometry = evaluation.eyes?.rightEye?.logs.find(
        (log) => log.type === "TONOMETRY",
      );
      const leftEyeTonometry = evaluation.eyes?.leftEye?.logs.find(
        (log) => log.type === "TONOMETRY",
      );

      return {
        date: new Date(evaluation.createdAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        OD: rightEyeTonometry?.details
          ? parseFloat(rightEyeTonometry.details)
          : null,
        OS: leftEyeTonometry?.details
          ? parseFloat(leftEyeTonometry.details)
          : null,
      };
    })
    .filter((data) => data.OD !== null || data.OS !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (chartData.length === 0) {
    return (
      <p className="text-muted-foreground">
        Nenhum dado de tonometria disponível.
      </p>
    );
  }

  return (
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
              labelFormatter={(label) => {
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
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
}
