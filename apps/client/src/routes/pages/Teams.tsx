import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { authAxios } from "../../api/axios";
import {
  createProjectSchema,
  type ICreateProjectDto,
  type IUser,
} from "@teamlite/types";
import { useState } from "react";
import {
  getMyTaskListByTeamId,
  getProjectList,
  getTeamDetail,
} from "../../api";
import ProjectCard from "../../components/ProjectCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorText from "../../components/ErrorText";
import { useAuthStore } from "../../store/auth/useAuthStore";
import CommonContainer from "../../components/CommonContainer";
import TaskListItem from "../../components/task/TaskListItem";
import TaskCardItem from "../../components/task/TaskCardItem";

const projectSortControllerSelectList = [
  {
    name: "할일 많은 순",
    value: "taskCount",
  },
  {
    name: "가나다 순",
    value: "name",
  },
  {
    name: "최신 순",
    value: "createdAt",
  },
];

const Teams = () => {
  const { teamId } = useParams();
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });
  const teamProjectList = useQuery({
    queryKey: ["teamDetail", teamId, "projectList"],
    queryFn: () => getProjectList(teamId!),
  });

  const newTaskList = useQuery({
    queryKey: ["teamDetail", teamId, "taskList", "dashboard", "newTasks"],
    queryFn: async () =>
      await getMyTaskListByTeamId(teamId!, {
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
  });

  const comingTaskList = useQuery({
    queryKey: ["teamDetail", teamId, "taskList", "dashboard", "comingTasks"],
    queryFn: () =>
      getMyTaskListByTeamId(teamId!, { sortBy: "duedate", sortOrder: "asc" }),
  });

  if (teamDetail.isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <CommonContainer>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3 overflow-hidden">
            <p className="typo-medium typo-sm text-text-4">전체 프로젝트</p>
            <div className="flex gap-4 w-full overflow-x-auto">
              {teamProjectList.data?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="typo-medium typo-sm text-text-4">새로운 작업</p>
            <div className="flex gap-4 w-full overflow-x-auto">
              {newTaskList.data?.data?.map((task) => (
                <TaskCardItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="typo-medium typo-sm text-text-4">다가오는 일정</p>
            <div className="flex flex-col gap-3">
              {comingTaskList.data?.data?.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </CommonContainer>
    </>
  );
};

export default Teams;
