import type { ITask } from "@teamlite/types";

import dayjs from "dayjs";
import { getDueDateTime } from "../../../util/dayUtil";

const index = ({ task }: { task: ITask }) => {
  return (
    <div className="flex w-[376px] gap-4 p-6 border border-line-4 rounded-[20px] cursor-pointer shrink-0 ">
      <div className="flex flex-col gap-2 items-center">
        <p>{task.priority}</p>

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
  );
};

export default index;
