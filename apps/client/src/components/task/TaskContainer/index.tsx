import React from "react";
import TaskCard from "../TaskCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTaskListByProjectId } from "../../../api";

const index = ({
  projectId,
  teamId,
  tab,
}: {
  projectId: string;
  teamId: string;
  tab: string;
}) => {
  const taskList = useQuery({
    queryKey: ["taskList", projectId],
    queryFn: () => getAllTaskListByProjectId(projectId),
    enabled: projectId !== "",
  });

  if (taskList.isError || taskList.isLoading) {
    return <div>로딩</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {taskList.data?.map((task) => {
        return <TaskCard task={task} key={task.id} />;
      })}
    </div>
  );
};

export default index;
