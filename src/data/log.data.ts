import { LogItem, ParseItem } from "../utils/type";

const randomIp = (): string => {
  return (
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255)
  );
};

export const logData: ParseItem[] = [
  {
    timestamp: new Date().toLocaleString(),
    remote_addr: randomIp(),
    path: "/api/chat/adf",
    status: 403,
    protocol: "HTTP/1.1",
    method: "GET",
    user_agent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
  },
  {
    timestamp: new Date().toLocaleString(),
    remote_addr: randomIp(),
    path: "/api/idp/fes",
    status: 200,
    protocol: "HTTP/1.1",
    method: "GET",
    user_agent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
  },
  {
    timestamp: new Date().toLocaleString(),
    remote_addr: randomIp(),
    path: "/api/chat/sdf",
    status: 200,
    protocol: "HTTP/1.1",
    method: "GET",
    user_agent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
  },
];
