import React from "react";
import TaskListItem from "../TaskListItem";
import { useQuery } from "@tanstack/react-query";
import { getAllTaskListByProjectId } from "../../../api";
import { useSearchParams } from "react-router";

const index = ({
  projectId,
  teamId,
  tab,
}: {
  projectId: string;
  teamId: string;
  tab: string;
}) => {
  const [searchParams] = useSearchParams();
  const taskList = useQuery({
    queryKey: ["taskList", projectId, searchParams.get("tab")],
    queryFn: () =>
      getAllTaskListByProjectId(projectId, searchParams.get("tab")!),
    enabled: projectId !== "",
  });

  if (taskList.isError || taskList.isLoading) {
    return <div>로딩</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {taskList.data?.map((task) => {
        return <TaskListItem task={task} key={task.id} />;
      })}
    </div>
  );
};

export default index;
