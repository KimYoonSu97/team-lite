import React from "react";
import { TASK_STATUS_VALUE_LIST } from "../../../constants";
import clsx from "clsx";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center typo-medium typo-xs text-text-1 px-4 py-1 rounded-full",
        status === "ACTIVE" && "bg-[#FDF7E1]",
        status === "IN_PROGRESS" && "bg-[#E0F1F2]",
        status === "ON_HOLD" && "bg-zinc-100",
        status === "COMPLETED" && "bg-[#ECE8F6]",
        status === "CLOSED" && "bg-zinc-100",
      )}
    >
      <div
        className={clsx(
          "w-2 h-2 rounded-full",
          status === "ACTIVE" && "bg-brand-sub3",
          status === "IN_PROGRESS" && "bg-brand-sub1",
          status === "ON_HOLD" && "bg-brand-primary",
          status === "COMPLETED" && "bg-zinc-600",
          status === "CLOSED" && "bg-zinc-600",
        )}
      ></div>
      {TASK_STATUS_VALUE_LIST[status]}
    </div>
  );
};

export default StatusBadge;
