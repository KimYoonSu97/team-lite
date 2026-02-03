import React from "react";
import type { ITask } from "@teamlite/types";
import { TASK_STATUS_LIST } from "../../../constants";
import { useMutation } from "@tanstack/react-query";
import { patchTaskStatus } from "../../../api";

const StatusSelect = ({ task }: { task: ITask }) => {
  const [status, setStatus] = React.useState(task.status);
  const statusMutation = useMutation({
    mutationFn: async (status: string) => {
      console.log(status);
      return await patchTaskStatus(task.id, status);
    },
    onSuccess: () => {
      alert("수정에 성공했습니다.");
    },
    onError: () => {
      alert("수정에 실패했습니다.");
    },
  });
  return (
    <select
      className="text-caption text-text-default block pt-2 pb-2 border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 bg-transparent"
      value={status!}
      onChange={(e) => {
        if (!confirm("수정하시겠습니까?")) return;
        setStatus(e.target.value);
        statusMutation.mutate(e.target.value);
      }}
    >
      {TASK_STATUS_LIST.map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

export default StatusSelect;
