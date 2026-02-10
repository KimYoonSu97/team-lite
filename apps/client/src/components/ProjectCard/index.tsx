import type { IProject } from "@teamlite/types";
import { StickyNote } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router";

const index = ({ project }: { project: IProject }) => {
  const param = useParams();
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/projects/${param.teamId}/${project.id}?tab=all`)
      }
      key={project.id}
      className={
        "shrink-0 w-[180px] h-[120px] rounded-[20px] px-6 py-4 flex flex-col gap-6 border-line-4 border cursor-pointer justify-between bg-white"
      }
    >
      <div>
        <p className="typo-medium typo-base text-text-1">{project.title}</p>
      </div>
      <p className="typo-sm typo-semibold text-brand-primary">
        {project.allTaskCount}개{" "}
        <span className="typo-medium text-text-4">남음</span>
      </p>
    </div>
  );
};

export default index;
