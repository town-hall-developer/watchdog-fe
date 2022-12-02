import React from "react";
import { ParseResponse, QueryResponse } from "../../utils/api";
import {
  BarList,
  Block,
  Bold,
  Card,
  ColGrid,
  Color,
  Flex,
  Icon,
  Metric,
  Text,
  Title,
} from "@tremor/react";
import {
  CircleStackIcon,
  ClipboardIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import * as _ from "lodash";
import { sortData } from "../../utils/util";

interface LogGeneralProps {
  data: QueryResponse[];
  parseResult?: ParseResponse;
}
const LogGeneral: React.FC<LogGeneralProps> = ({ data, parseResult }) => {
  // console.log(Object.keys(_.countBy(data, "timestamp")));

  const barData = (data: QueryResponse[], iteratee: string): any[] => {
    let keys = Object.keys(_.countBy(data, iteratee));
    let values = Object.values(_.countBy(data, iteratee));
    return keys.map((key, index) => {
      return {
        name: key,
        value: values[index],
      };
    });
  };
  const donutData = (data: QueryResponse[]): any[] => {
    let keys = Object.keys(_.countBy(data, "status"));
    let values = Object.values(_.countBy(data, "status"));
    return keys.map((key, index) => {
      return {
        name: key,
        value: values[index],
      };
    });
  };
  // const valueFormatter = (number: number) =>
  //   `${Intl.NumberFormat("us").format(number).toString()} $`;

  const categories: {
    title: string;
    metric: string;
    icon: any;
    color: Color;
  }[] = [
    {
      title: "Number",
      metric: String(data.length),
      icon: ClipboardIcon,
      color: "indigo",
    },
    {
      title: "Number of Paths",
      metric: String(Object.keys(_.countBy(data, "path")).length),
      icon: LinkIcon,
      color: "fuchsia",
    },
    {
      title: "Datasource",
      metric: "test",
      icon: CircleStackIcon,
      color: "amber",
    },
  ];

  return (
    <ColGrid
      marginTop="mt-6"
      numColsSm={2}
      numColsLg={3}
      gapX="gap-x-6"
      gapY="gap-y-6"
    >
      {categories.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <Flex justifyContent="justify-start" spaceX="space-x-4">
            <Icon
              icon={item.icon}
              variant="light"
              size="xl"
              color={item.color}
            />
            <Block truncate={true}>
              <Text>{item.title}</Text>
              <Metric truncate={true}>{item.metric}</Metric>
            </Block>
          </Flex>
        </Card>
      ))}
      <Card>
        <Title>Requests by path</Title>
        <Flex marginTop="mt-6">
          <Text>
            <Bold>Path</Bold>
          </Text>
          <Text>
            <Bold>Count</Bold>
          </Text>
        </Flex>
        <BarList
          data={sortData(barData(data, "path")).slice(0, 5)}
          showAnimation={true}
          marginTop="mt-4"
        />
      </Card>
      <Card>
        <Title>Requests by clients</Title>
        <Flex marginTop="mt-6">
          <Text>
            <Bold>Path</Bold>
          </Text>
          <Text>
            <Bold>Count</Bold>
          </Text>
        </Flex>
        <BarList
          data={sortData(barData(data, "remote_addr")).slice(0, 5)}
          showAnimation={true}
          marginTop="mt-4"
        />
      </Card>
      <Card>
        <Title>Requests by clients</Title>
        <Flex marginTop="mt-6">
          <Text>
            <Bold>Path</Bold>
          </Text>
          <Text>
            <Bold>Count</Bold>
          </Text>
        </Flex>
        <BarList
          data={sortData(barData(data, "user_agent")).slice(0, 5)}
          showAnimation={true}
          marginTop="mt-4"
        />
      </Card>
      {/*<Card>
        <Title>Requests by status</Title>
        <Legend
          marginTop="mt-2"
          categories={donutData(data).map((item) => item.name)}
          colors={["green", "emerald", "yellow", "blue", "indigo", "purple"]}
        />
        <DonutChart
          data={donutData(data)}
          category="value"
          dataKey="name"
          valueFormatter={(value) => String(value)}
          marginTop="mt-6"
          colors={["green", "emerald", "yellow", "blue", "indigo", "purple"]}
        />
      </Card>*/}
    </ColGrid>
  );
};
export default LogGeneral;
