import React from "react";
import { Block, ColGrid } from "@tremor/react";
import Chart from "./Chart";
import Uptime from "./Uptime";
import Donut from "./Donut";
import Count from "./Count";

const Status: React.FC = () => {
  return (
    <>
      <ColGrid
        numColsMd={2}
        numColsLg={3}
        gapX="gap-x-8"
        gapY="gap-y-8"
        marginTop="mt-6"
      >
        <Count />
        <Donut />
        <Uptime />
      </ColGrid>

      <Block marginTop="mt-6">
        <Chart />
      </Block>
    </>
  );
};

export default Status;
