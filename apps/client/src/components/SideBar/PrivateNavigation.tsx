import React from "react";
import useModal from "../../hooks/useModal";
import AddProject from "../modalContent/AddProject";
import { useQuery } from "@tanstack/react-query";
import { getPersonalTeam } from "../../api";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useNavigate } from "react-router";

const PrivateNavigation = () => {
  const { openModal, isModalOpen, closeModal, modal } = useModal();
  const user = useAuthStore();
  const navigate = useNavigate();
  const personalTeam = useQuery({
    queryKey: ["personalTeam"],
    queryFn: () => getPersonalTeam(user.user!.id),
  });
  const handleClickProject = (projectId: string) => {
    navigate(`/team/${personalTeam.data?.id}/project/${projectId}`);
  };

  return (
    <div className="p-4 border">
      {isModalOpen &&
        modal(
          <AddProject
            onClose={closeModal}
            teamId={personalTeam.data?.id!}
            isPersonal
          />,
        )}
      <div className="flex justify-between">
        <p>Private</p>
        <div onClick={openModal}>
          <p>개인플젝추가</p>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-2 border">
        {personalTeam.data?.project.map((project) => (
          <div
            className="cursor-pointer"
            key={project.id}
            onClick={() => handleClickProject(project.id)}
          >
            {project.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateNavigation;
