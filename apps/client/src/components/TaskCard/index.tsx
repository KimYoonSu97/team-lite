import type { ITask } from "@teamlite/types";
import dayjs from "dayjs";
import {
  PRIORITY_VALUE_LIST,
  TASK_STATUS_LIST,
  TASK_STATUS_VALUE_LIST,
} from "../../constants";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { lazy } from "react";

const StatusSelect = lazy(() => import("./StatusSelect"));

const index = ({ task }: { task: ITask }) => {
  const userId = useAuthStore((state) => state.user?.id);
  const daysRemaining = dayjs(task.duedate).diff(dayjs(), "day");

  return (
    <div
      key={task.id}
      className={
        "w-[250px] h-[250px] bg-bg-layer1 rounded-[20px] p-[15px] flex flex-col justify-between shrink-0"
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-h3 text-brand-primary">{task.title}</p>
          <p className="text-caption text-text-sub">
            {PRIORITY_VALUE_LIST[task.priority ? task.priority : "1"]}
          </p>
        </div>
        <div className="w-full h-px bg-brand-primary" />
        <div className="h-[120px] overflow-scroll scrollbar-hide">
          <p className="text-caption text-text-default ">{task.content}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="text-text-sub text-caption">
            {task.owner.nickname}님의 요청
          </p>
          {task.assignee?.id === userId ? (
            <StatusSelect task={task} />
          ) : (
            <p className="text-text-sub text-caption">
              {TASK_STATUS_VALUE_LIST[task.status ? task.status : "ACTIVE"]}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text-sub text-caption">
            {daysRemaining === 0
              ? "D-day"
              : daysRemaining < 0
                ? "기한 지남"
                : `D-${daysRemaining}`}
          </p>
          <p className="text-text-sub text-caption">
            {dayjs(task.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
