export const statusColor = (
  status: string
): "green" | "orange" | "red" | "slate" => {
  switch (Math.floor(parseInt(status) / 100)) {
    case 2:
      return "green";
    case 4:
      return "orange";
    case 5:
      return "red";
    default:
      return "slate";
  }
};

export const verifyField = (field?: string): boolean => {
  const keys = [
    "status",
    "path",
    "protocol",
    "method",
    "user_agent",
    "remote_addr",
    "timestamp",
  ];
  return keys.indexOf(field || "") !== -1;
};

export const getDateFormat = (date?: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}): String => {
  return (
    date?.year +
    "." +
    date?.month +
    "." +
    date?.day +
    " at " +
    date?.hour +
    ":" +
    date?.minute +
    ":" +
    date?.second
  );
};

export const sortData = (data: any[]) =>
  data.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
  });
