import dayjs from "dayjs";

export const getDeadlineTime = (
  date: string | Date | dayjs.Dayjs | number | undefined,
) => {
  const now = dayjs();
  const diff = dayjs(date).diff(now, "day");
  if (diff < 0) {
    return "종료";
  }
  return `${diff}`;
};
