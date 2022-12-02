import { Card, DonutChart, Title } from "@tremor/react";
import { donutData } from "../../data";
import React from "react";

const Donut: React.FC = () => {
  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} user`;

  return (
    <Card>
      <Title>User per Chat Room</Title>
      <DonutChart
        height="h-60"
        data={donutData}
        category="sales"
        dataKey="name"
        valueFormatter={valueFormatter}
        marginTop="mt-2"
        colors={["teal", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};
export default Donut;
