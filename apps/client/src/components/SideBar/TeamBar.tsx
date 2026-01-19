import { useQuery } from "@tanstack/react-query";
import type { ITeam } from "@teamlite/types";
import React from "react";
import { useNavigate } from "react-router";
import { getTeamList } from "../../api";
import useModal from "../../hooks/useModal";
import AddTeamModal from "../modalContent/AddTeamModal";

const TeamBar = () => {
  const navigator = useNavigate();
  const teamList = useQuery({
    queryKey: ["teamList"],
    queryFn: getTeamList,
  });
  const { isModalOpen, closeModal, openModal, modal } = useModal();

  const onClickTeam = (team: ITeam) => {
    navigator(`/team/${team.id}`);
  };
  return (
    <>
      {isModalOpen && modal(<AddTeamModal onClose={closeModal} />)}

      <div className="border w-[73px] flex flex-col gap-2">
        <div className="h-[80px] border">상단 공백</div>
        {teamList.data?.map((team) => (
          <div
            key={team.id}
            onClick={() => onClickTeam(team)}
            className={
              "border flex items-center justify-center pt-[10px] pb-[10px] cursor-pointer"
            }
          >
            <div className="w-[32px] h-[32px] rounded-[8px] border flex items-center justify-center">
              {team.name[0]}
            </div>
          </div>
        ))}
        <div
          onClick={openModal}
          className={
            "border flex items-center justify-center pt-[10px] pb-[10px] cursor-pointer"
          }
        >
          <div className="w-[32px] h-[32px] rounded-[8px] border flex items-center justify-center ">
            +
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamBar;
