import axios from "axios";
import React from "react";

const apiUrl = "https://dev.townhall.place";
const parserUrl = "https://bastion.townhall.place/watchdog/api";

export interface ParseResponse {
  status: "success" | "fail";
  function?: string;
  datasource?: "nginx" | "alb" | "all";
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
  errors?: { error: string }[];
}
export interface QueryResponse {
  uuid: string;
  timestamp: string;
  remote_addr: string;
  path: string;
  status: string;
  protocol: string;
  method: string;
  user_agent: string;
  datasource: "nginx" | "alb";
  type?: "abnormal" | "normal";
}

export const postParse = async (
  query: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<ParseResponse> => {
  const response = await axios.post<ParseResponse>(`${parserUrl}/parse`, {
    query,
  });
  // console.log(response.data);
  return response.data;
};
export const postQuery = async (
  query: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<QueryResponse[]> => {
  await setLoading(true);
  const response = await axios.post<QueryResponse[]>(`${parserUrl}/query`, {
    query,
  });
  await setLoading(false);
  // console.log(response.data);
  return response.data;
};
