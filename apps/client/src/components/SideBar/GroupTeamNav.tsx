import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProjectList } from "../../api";
import { useNavigate, useParams } from "react-router";
import type { IProject } from "@teamlite/types";

const GroupTeamNav = () => {
  const param = useParams();
  const teamId = param.teamId;
  const teamProjectList = useQuery({
    queryKey: ["teamDetail", teamId, "projectList"],
    queryFn: () => getProjectList(teamId!),
  });
  const navigate = useNavigate();
  const handleClickProject = (projectId: string) => {
    navigate(`/team/${teamId}/project/${projectId}`);
  };

  return (
    <div className="p-4 border">
      <div>TeamSpace</div>
      <div>
        {teamProjectList.data?.map((project: IProject) => {
          return (
            <div
              key={project.id}
              className="p-2 border cursor-pointer"
              onClick={() => handleClickProject(project.id)}
            >
              <p className="text-body-m text-text-default">{project.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupTeamNav;
