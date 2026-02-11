import type { ITask } from "@teamlite/types";

import { getDueDateTime } from "../../../util/dayUtil";
import { PRIORITY_VALUE_LIST } from "../../../constants";
import { lazy } from "react";
import useModal from "../../../hooks/useModal";

const TaskLazy = lazy(() => import("../../modalContent/Task"));

const index = ({ task }: { task: ITask }) => {
  const taskModal = useModal();

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
        className="flex w-[376px] gap-4 p-6 border border-line-4 rounded-[20px] cursor-pointer shrink-0 "
        onClick={() => taskModal.openModal()}
      >
        <div className="flex flex-col gap-2 items-center">
          <p>{PRIORITY_VALUE_LIST[Number(task.priority)]}</p>

          <p className="typo-semibold text-[14px] text-brand-primary flex items-center">
            D-{getDueDateTime(task.duedate)}
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="typo-medium typo-sm text-text-4 flex items-center">
            {task.project.title}
          </p>
          <p className="typo-medium typo-base text-text-1 flex items-center">
            {task.title}
          </p>
        </div>
      </div>
    </>
  );
};

export default index;
