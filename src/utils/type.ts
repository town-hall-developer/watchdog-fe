export interface LogItem extends ParseItem {
  type: "valid" | "abnormal" | "etc";
}

export interface ParseItem {
  path: string;
  protocol: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
  status: number;
  remote_addr: string;
  user_agent: string;
  timestamp: string;
}
