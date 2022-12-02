import React from "react";
import { Badge } from "@tremor/react";
import {
  CalendarDaysIcon,
  CircleStackIcon,
  VariableIcon,
} from "@heroicons/react/24/solid";
import { getDateFormat, verifyField } from "../../utils/util";

interface ParseBadgeProps {
  condition?: {
    field: { key: string; value: string; operator: "=" | "=!" | "=~" }[];
    date: {
      start: {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
      };
      end: {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
      };
    };
  };
  datasource?: "nginx" | "alb" | "all";
}
const ParseBadge: React.FC<ParseBadgeProps> = (result) => {
  return (
    <div>
      <>
        <div style={{ display: "flex", marginTop: "10px" }}>
          {result.condition?.field.map((field, index) => {
            return (
              <div key={Math.random()} style={{ marginRight: "5px" }}>
                <Badge
                  icon={VariableIcon}
                  text={
                    result?.condition?.field[index].key +
                      " " +
                      result?.condition?.field[index].operator +
                      " " +
                      result?.condition?.field[index].value || ""
                  }
                  color={
                    verifyField(result?.condition?.field[index].key)
                      ? "green"
                      : "red"
                  }
                />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Badge
            icon={CalendarDaysIcon}
            text={
              "start = " + getDateFormat(result.condition?.date.start) || ""
            }
            color="green"
          />
          <div style={{ width: "5px" }} />
          <Badge
            icon={CalendarDaysIcon}
            text={"end = " + getDateFormat(result?.condition?.date.end) || ""}
            color="green"
          />
          <div style={{ width: "10px" }} />
          <Badge
            icon={CircleStackIcon}
            text={"datasource = " + result?.datasource || ""}
            color="blue"
          />
        </div>
      </>
    </div>
  );
};
export default ParseBadge;
