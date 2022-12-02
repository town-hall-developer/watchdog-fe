import React from "react";
import { AreaChart } from "@tremor/react";
import { QueryResponse } from "../../utils/api";
import * as _ from "lodash";

export interface AreaChart {
  date: string;
  "Total Requests": number;
  "Abnormal Requests": number;
}
interface LogAnalysisProps {
  data: QueryResponse[];
}
const LogAnalysis: React.FC<LogAnalysisProps> = ({ data }) => {
  const [areaChartData, setAreaChartData] = React.useState<AreaChart[]>([]);

  React.useEffect(() => {
    areaChart();
  }, []);

  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us")
      .format(number / 1000)
      .toString()}K`;
  const areaChart = () => {
    let areaChartData: AreaChart[] = [];
    let dates = Object.keys(_.countBy(data, "timestamp"));
    dates.map((date, index) => {
      dates[index] = date.slice(0, 10);
    });
    dates = _.uniq(dates);
    console.log(dates);

    let requests = data.map((item, index) => {
      return {
        type: item.type,
        date: item.timestamp.slice(0, 10),
      };
    });

    dates.map((date, index) => {
      areaChartData.push({
        date: date,
        "Total Requests": requests.filter((item) => item.date === date).length,
        "Abnormal Requests": requests.filter(
          (item) => item.type === "abnormal" && item.date === date
        ).length,
      });
    });
    setAreaChartData(areaChartData);
  };
  return (
    <AreaChart
      data={areaChartData}
      categories={["Total Requests", "Abnormal Requests"]}
      dataKey="date"
      height="h-72"
      colors={["cyan", "red"]}
      valueFormatter={undefined}
      marginTop="mt-4"
    />
  );
};
export default LogAnalysis;
