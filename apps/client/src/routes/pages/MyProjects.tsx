import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { getTeamList } from "../../api";
import ProjectCard from "../../components/ProjectCard";
import type { IProject, ITeam } from "@teamlite/types";

const projectSortControllerSelectList = [
  {
    name: "최신 순",
    value: "createdAt",
  },
  {
    name: "가나다 순",
    value: "name",
  },
  {
    name: "할일 많은 순",
    value: "taskCount",
  },
];

const MyProjects = () => {
  const { user } = useAuthStore();
  const [projectSortController, setProjectSortController] = useState(
    projectSortControllerSelectList[0]
  );

  const teamList = useQuery({
    queryKey: ["teamList"],
    queryFn: getTeamList,
  });

  // Get all projects from all teams
  const allProjects =
    teamList.data?.reduce((acc: IProject[], team: ITeam) => {
      return [...acc, ...(team.projects || [])];
    }, []) || [];

  return (
    <div className="pt-15">
      <div className="text-h2 text-text-default pl-12">
        {user?.nickname}님의 프로젝트
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <div className="pl-12">
          <p className="text-h2 text-brand-primary">내 프로젝트</p>
        </div>
        <div className="flex gap-2 pl-12">
          {projectSortControllerSelectList.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => setProjectSortController(item)}
                className={`${projectSortController.value === item.value ? "text-brand-primary text-body-m-bold" : "text-text-sub text-body-m"} `}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-scroll pl-12 pb-4">
          <div className="mt-4 flex gap-4">
            {allProjects.length > 0 ? (
              allProjects.map((project: IProject) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="text-body-m text-text-sub">
                아직 프로젝트가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
