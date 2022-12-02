import {
  Card,
  Flex,
  Text,
  Title,
  Tracking,
  TrackingBlock,
} from "@tremor/react";
import { trackerData } from "../../data";
import React from "react";

const Uptime: React.FC = () => {
  const statusStyles = (
    status: string
  ): "emerald" | "rose" | "gray" | "amber" => {
    switch (status) {
      case "Operational":
        return "emerald";
      case "Downtime":
        return "rose";
      case "Maintenance":
        return "gray";
      case "Degraded":
        return "amber";
      default:
        return "gray";
    }
  };

  return (
    <Card>
      <Title>Status monitoring</Title>

      <Flex marginTop="mt-3" alignItems="items-center">
        <Title>realtime-chat</Title>
        <Text>Uptime 99.4%</Text>
      </Flex>
      <Tracking marginTop="mt-2">
        {trackerData.map((item) => (
          <TrackingBlock
            color={statusStyles(item.status)}
            tooltip={item.status}
            key={item.id}
          />
        ))}
      </Tracking>
      <Flex marginTop="mt-3" alignItems="items-center">
        <Title>api-chat</Title>
        <Text>Uptime 99.4%</Text>
      </Flex>
      <Tracking marginTop="mt-2">
        {trackerData.map((item) => (
          <TrackingBlock
            color={statusStyles(item.status)}
            tooltip={item.status}
            key={item.id}
          />
        ))}
      </Tracking>
      <Flex marginTop="mt-3" alignItems="items-center">
        <Title>IDP</Title>
        <Text>Uptime 99.4%</Text>
      </Flex>
      <Tracking marginTop="mt-2">
        {trackerData.map((item) => (
          <TrackingBlock
            color={statusStyles(item.status)}
            tooltip={item.status}
            key={item.id}
          />
        ))}
      </Tracking>
    </Card>
  );
};
export default Uptime;
