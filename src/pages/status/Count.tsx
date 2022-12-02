import { BadgeDelta, Card, Flex, Metric, Text, Title } from "@tremor/react";
import React from "react";

export default function Count() {
  return (
    <Card>
      <Title>User Count</Title>

      <Card marginTop="mt-3">
        <Flex justifyContent="justify-between" alignItems="items-center">
          <Text>Active User</Text>
          <BadgeDelta
            deltaType="moderateDecrease"
            text="+12.3%"
            isIncreasePositive={true}
            tooltip="change user count for 1 day"
            size="sm"
          />
        </Flex>
        <Metric>4,200</Metric>
      </Card>
      <Card marginTop="mt-6">
        <Flex justifyContent="justify-between" alignItems="items-center">
          <Text>Total User</Text>
          <BadgeDelta
            deltaType="moderateIncrease"
            text="+12.3%"
            isIncreasePositive={true}
            tooltip="change user count for 1 day"
            size="sm"
          />
        </Flex>
        <Metric>23,456</Metric>
      </Card>
    </Card>
  );
}
