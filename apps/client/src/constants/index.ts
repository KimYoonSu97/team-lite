export const PRIORITY_LIST = [
  { value: "1", label: "보류" },
  { value: "2", label: "여유" },
  { value: "3", label: "보통" },
  { value: "4", label: "높음" },
  { value: "5", label: "긴급" },
];
export const PRIORITY_VALUE_LIST: Record<string, string> = {
  "1": "보류",
  "2": "여유",
  "3": "보통",
  "4": "높음",
  "5": "긴급",
};

export const TASK_STATUS_LIST = [
  { value: "ACTIVE", label: "요청" },
  { value: "ON_HOLD", label: "보류" },
  { value: "IN_PROGRESS", label: "진행중" },
  { value: "COMPLETED", label: "완료" },
  { value: "CLOSED", label: "종료" },
];

export const TASK_STATUS_VALUE_LIST: Record<string, string> = {
  ACTIVE: "요청",
  ON_HOLD: "보류",
  IN_PROGRESS: "진행중",
  COMPLETED: "완료",
  CLOSED: "종료",
};
