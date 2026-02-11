import type { ITask } from "@teamlite/types";
import dayjs from "dayjs";
import {
  PRIORITY_VALUE_LIST,
  TASK_STATUS_LIST,
  TASK_STATUS_VALUE_LIST,
} from "../../../constants";
import { useAuthStore } from "../../../store/auth/useAuthStore";
import { lazy } from "react";
import { Omega } from "lucide-react";
import StatusBadge from "../StatusBadge/StatusBadge";

import useModal from "../../../hooks/useModal";

const TaskLazy = lazy(() => import("../../modalContent/Task"));

const index = ({ task }: { task: ITask }) => {
  const taskModal = useModal();
  console.log(task.assignee.profileImage);

  return (
    <>
      {taskModal.isModalOpen &&
        taskModal.modal(
          "sideModal",
          <TaskLazy
            projectId={task.project.id}
            closeModal={taskModal.closeModal}
            task={task}
          />,
          false,
        )}
      <div
        onClick={() => {
          taskModal.openModal();
        }}
        className="px-8 py-6 border border-line-4 rounded-[20px] hover:shadow-xl cursor-pointer flex gap-8 justify-between bg-white"
      >
        <p className="truncate flex-1 typo-medium typo-base text-text-1">
          {task.title}
        </p>
        {/* <div className="shrink">
      </div> */}
        <div className="flex  gap-8 ">
          <div className="w-[97px] flex gap-2 items-center">
            {task.assignee.profileImage ? (
              <img
                src={task.assignee.profileImage}
                alt={`${task.assignee.nickname}의 프로필`}
                className="w-6 h-6 rounded-[4px]"
              />
            ) : (
              <div className="w-6 h-6 rounded-[4px] bg-bg-1 "></div>
            )}

            <p className="truncate">{task.assignee.nickname}</p>
          </div>
          <div className="w-[83px]  flex items-center justify-center">
            <StatusBadge status={task.status || "ACTIVE"} />
          </div>
          <div className="w-[103px]  flex items-center justify-center typo-medium typo-base text-text-2">
            {dayjs(task.duedate).format("YYYY-MM-DD")}
          </div>
          <div className="flex items-center justify-center typo-medium typo-base text-text-2">
            {PRIORITY_VALUE_LIST[Number(task.priority)]}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
