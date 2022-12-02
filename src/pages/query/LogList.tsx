import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { statusColor } from "../../utils/util";
import React from "react";
import { QueryResponse } from "../../utils/api";

export enum SelectOption {
  PATH = "path",
  PROTOCOL = "protocol",
  METHOD = "method",
  STATUS = "status",
  REMOTE_ADDR = "remote_addr",
  TIMESTAMP = "timestamp",
  TYPE = "type",
}

interface LogListProps {
  data: QueryResponse[];
}
const LogList: React.FC<LogListProps> = ({ data }) => {
  return (
    <>
      <Table marginTop="mt-2">
        <TableHead>
          <TableRow>
            {Object.values(SelectOption).map((value, index) => {
              return (
                <TableHeaderCell
                  key={Math.random()}
                  textAlignment={index === 0 ? "text-left" : "text-center"}
                >
                  {value}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={Math.random()}>
                <TableCell>
                  <div>
                    {item.path.length > 50
                      ? item.path.slice(0, 50) + "..."
                      : item.path}
                  </div>
                </TableCell>
                <TableCell textAlignment="text-center">
                  <div>{item.protocol}</div>
                </TableCell>
                <TableCell textAlignment="text-center">
                  <Badge text={item.method} color="blue" />
                </TableCell>
                <TableCell textAlignment="text-center">
                  <Badge
                    text={String(item.status)}
                    color={statusColor(item.status)}
                  />
                </TableCell>
                <TableCell textAlignment="text-center">
                  {item.remote_addr}
                </TableCell>
                <TableCell textAlignment="text-center">
                  {item.timestamp}
                </TableCell>
                <TableCell textAlignment="text-center">
                  <Badge
                    text={item.type || "undefined"}
                    color={item.type === "normal" ? "green" : "red"}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LogList;
