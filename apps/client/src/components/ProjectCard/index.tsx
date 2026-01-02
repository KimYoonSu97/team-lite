import type { IProject } from "@teamlite/types";
import { StickyNote } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router";

const index = ({ project }: { project: IProject }) => {
  const param = useParams();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/projects/${param.teamId}/${project.id}`)}
      key={project.id}
      className={
        "w-[250px] h-[150px] bg-bg-layer1 rounded-[20px] p-[15px] flex flex-col justify-between shrink-0"
      }
    >
      <div className="flex flex-col gap-2">
        <p className="text-h3 text-brand-primary">{project.title}</p>
        <div className="w-full h-px bg-border-default" />
        <p className="text-caption text-text-default">{project.description}</p>
      </div>
      <div>
        <div className="flex justify-end gap-1">
          <StickyNote width={18} height={18} color={"#00c6d8"} />
          <p className="text-caption text-brand-primary">할일개수</p>
        </div>
      </div>
    </div>
  );
};

export default index;
