export const PRIORITY_LIST = [
  {
    value: "1",
    label: "선택",
    description: "아이디어, 개선 또는 제안 방안에 해당하거나, 있으면 좋은 작업",
  },
  {
    value: "2",
    label: "여유",
    description: "시간 여유 있을 때 처리할 수 있거나, 우선순위가 낮은 작업",
  },
  {
    value: "3",
    label: "보통",
    description: "일반적인 작업이거나, 데드라인은 있지만 급하지 않은 작업",
  },
  {
    value: "4",
    label: "중요",
    description:
      "다른 작업이 해당 작업이 끝나기를 기다리거나, 가까운 시일 내 처리 필요한 작업",
  },
  {
    value: "5",
    label: "긴급",
    description: "오늘 안에 처리가 필요하거나, 지연 시 문제가 발생하는 작업",
  },
];
export const PRIORITY_VALUE_LIST: Record<number, string> = {
  1: "선택",
  2: "여유",
  3: "보통",
  4: "중요",
  5: "긴급",
};

export const TASK_STATUS_LIST = [
  { value: "ACTIVE", label: "시작 전" },
  { value: "IN_PROGRESS", label: "진행중" },
  { value: "ON_HOLD", label: "보류" },
  { value: "COMPLETED", label: "완료" },
  { value: "CLOSED", label: "종료" },
];

export const TASK_STATUS_VALUE_LIST: Record<string, string> = {
  ACTIVE: "시작 전",
  IN_PROGRESS: "진행중",
  ON_HOLD: "보류",
  COMPLETED: "완료",
  CLOSED: "종료",
};
