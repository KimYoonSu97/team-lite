import type { ITask } from "@teamlite/types";
import dayjs from "dayjs";

const index = ({ task }: { task: ITask }) => {
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
          <p className="text-caption text-text-sub">{task.priority}</p>
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
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text-sub text-caption">
            {dayjs(task.duedate).format("YYYY-MM-DD")} 남음
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
