import axios from "axios";

const apiUrl = "https://dev.townhall.place";
const parserUrl = "http://localhost:8000";

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
  error?: string;
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

export const postParse = async (query: string): Promise<ParseResponse> => {
  const response = await axios.post<ParseResponse>(`${parserUrl}/parse`, {
    query,
  });
  // console.log(response.data);
  return response.data;
};
export const postQuery = async (query: string): Promise<QueryResponse[]> => {
  const response = await axios.post<QueryResponse[]>(`${parserUrl}/query`, {
    query,
  });
  // console.log(response.data);
  return response.data;
};
