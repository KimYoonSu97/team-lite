import { useQuery } from "@tanstack/react-query";
import type { ITeam } from "@teamlite/types";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import { getTeamList } from "../../api";
import useModal from "../../hooks/useModal";
import AddTeamModal from "../modalContent/AddTeamModal";
import { PanelRightClose, Plus } from "lucide-react";

const TeamBar = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => {
  const navigator = useNavigate();
  const { teamId } = useParams();
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
      {isModalOpen && modal("modal", <AddTeamModal onClose={closeModal} />)}

      <div className="w-[76px] flex flex-col gap-2 bg-brand-primary p-2 ">
        {!isOpen && (
          <div
            onClick={toggle}
            className="flex items-center justify-center  cursor-pointer p-[18px]"
          >
            <PanelRightClose width={24} height={24} className="text-white" />
          </div>
        )}
        {teamList.data?.map((team) => (
          <div
            key={team.id}
            onClick={() => onClickTeam(team)}
            className={
              "flex items-center justify-center  cursor-pointer p-[6px]"
            }
          >
            <div
              className={clsx(
                "w-12 h-12 flex justify-center items-center",
                teamId === team.id
                  ? "border-2 border-brand-sub2 rounded-[12px]"
                  : "",
              )}
            >
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center bg-bg-2 typo-2xl">
                {team.name[0]}
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={openModal}
          className={" flex items-center justify-center cursor-pointer p-[6px]"}
        >
          <div className="w-[32px] h-[32px] rounded-[8px]  flex items-center justify-center ">
            <Plus width={24} color="white" height={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamBar;
