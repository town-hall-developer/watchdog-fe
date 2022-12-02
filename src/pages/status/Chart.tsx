import { AreaChart, Card, Title } from "@tremor/react";
import { areaChartData } from "../../data";
import React from "react";

export default function Chart() {
  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us")
      .format(number / 1000)
      .toString()}K`;

  return (
    <Card>
      <Title>Total Request per day</Title>
      <AreaChart
        data={areaChartData}
        categories={["Total Requests", "Valid Requests", "Abnormal Requests"]}
        dataKey="date"
        height="h-72"
        colors={["cyan", "lime", "red"]}
        valueFormatter={dataFormatter}
        marginTop="mt-4"
      />
    </Card>
  );
}
