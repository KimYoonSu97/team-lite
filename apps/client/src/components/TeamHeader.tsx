import { useQuery } from "@tanstack/react-query";
import type { ITeam, IUser } from "@teamlite/types";
import clsx from "clsx";
import { ChevronDown, Ellipsis, Link2, Star } from "lucide-react";
import { useParams } from "react-router";
import { getTeamDetail } from "../api";
import { useState } from "react";
import useModal from "../hooks/useModal";
import EditTeam from "./modalContent/EditTeam";
import EditTeamMember from "./modalContent/EditTeamMember";

/**
 * 팀헤더
 *
 */
const TeamHeader = () => {
  const { teamId } = useParams();
  const teamMemberModal = useModal();
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });
  if (teamDetail.isLoading) return null;

  return (
    <div className="px-7 py-4 flex justify-between items-center">
      {teamMemberModal.isModalOpen &&
        teamMemberModal.modal(
          "modal",
          <EditTeamMember
            onClose={teamMemberModal.closeModal}
            teamDetail={teamDetail.data!}
            members={true}
          />,
          true,
        )}
      <TeamName teamDetail={teamDetail.data!} />
      <div className="flex gap-2 text-text-1">
        {teamDetail.data?.teamType === "GROUP" && (
          <>
            <button
              className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center"
              onClick={teamMemberModal.openModal}
            >
              <div className="flex gap-2 justify-center items-center">
                <TeamMemberProfileList
                  members={teamDetail.data?.teamMembers.slice(0, 3)}
                />
                <p className="typo-regular typo-sm ">
                  {teamDetail.data?.teamMembers.length}
                </p>
              </div>
            </button>
            <button
              className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center"
              onClick={() => {
                alert("공유 기능은 준비중입니다.");
              }}
            >
              <Link2 width={20} height={20} />
            </button>
            <button
              className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center"
              onClick={() => {
                alert("즐겨찾기 기능은 준비중입니다.");
              }}
            >
              <Star width={20} height={20} />
            </button>
          </>
        )}
        <button
          className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center"
          onClick={() => {
            alert("더보기(복제,이동,휴지통) 기능은 준비중입니다.");
          }}
        >
          <Ellipsis width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default TeamHeader;

const ProfileImage = ({ src, id }: { src: string; id: string }) => {
  return <img src={src} className="w-6 h-6 rounded-full" alt={id}></img>;
};

const TeamMemberProfileList = ({ members }: { members: IUser[] }) => {
  return (
    <div className="flex relative">
      {members.map((member, index) => (
        <div
          key={`${member.id}-profile`}
          className={clsx(
            "border-2 rounded-[4px] border-white bg-bg-2 overflow-hidden w-7 h-7 flex justify-center items-center",
            index !== 0 && "absolute",
            index === 0 && members.length === 3 ? "mr-8" : "mr-4",
            index === 0 && "relative z-3",
            index === 1 && "left-4 z-2",
            index === 2 && "left-8 z-1",
          )}
        >
          <ProfileImage src={member.profileImage!} id={member.id} />
        </div>
      ))}
    </div>
  );
};

const TeamName = ({ teamDetail }: { teamDetail: ITeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const editTeamModal = useModal();
  const teamMemberModal = useModal();
  return (
    <div className="relative">
      {editTeamModal.isModalOpen &&
        editTeamModal.modal(
          "modal",
          <EditTeam
            onClose={editTeamModal.closeModal}
            teamDetail={teamDetail}
          />,
          true,
        )}
      {teamMemberModal.isModalOpen &&
        teamMemberModal.modal(
          "modal",
          <EditTeamMember
            onClose={teamMemberModal.closeModal}
            teamDetail={teamDetail}
          />,
          true,
        )}
      <div
        className="flex gap-2 items-center relative cursor-pointer py-1 px-3 rounded-[4px] hover:bg-bg-2 "
        onClick={handleOpen}
      >
        <p className="typo-2xl typo-medium text-text-1">{teamDetail.name}</p>
        <ChevronDown width={24} height={24} className="text-text-1" />
      </div>
      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-5"
            onClick={handleOpen}
          />
          <div className="absolute top-full mt-3 left-0 w-[280px] bg-white border border-line-3 rounded-[8px] shadow-md z-6">
            <div className="p-3 flex gap-3">
              {teamDetail.profileImage ? (
                <div className="w-12 h-12 bg-bg-1 rounded-[8px] overflow-hidden">
                  <img src={teamDetail.profileImage} alt="프로필이미지" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-bg-1 rounded-[8px] flex items-center justify-center">
                  <p className="typo-semibold typo-3xl text-text-1">
                    {teamDetail.name[0]}
                  </p>
                </div>
              )}
              <div className="flex flex-col justify-center gap-1">
                <p className="typo-medium typo-base text-text-1">
                  {teamDetail.name}
                </p>
                <p className="typo-regular typo-sm text-text-4">
                  {teamDetail.teamMembers.length}명의 팀원
                </p>
              </div>
            </div>
            <div className="border-b border-line-3" />
            <div className="p-3">
              <p className="typo-regular typo-sm text-text-1">
                {teamDetail.description}
              </p>
            </div>
            <div className="border-b border-line-3" />
            <div className="p-2">
              <button
                onClick={editTeamModal.openModal}
                className="block w-full text-left px-3 py-2 typo-regular typo-base text-text-1 rounded-[4px] hover:bg-bg-2"
              >
                팀 정보 변경
              </button>
              <button
                onClick={teamMemberModal.openModal}
                className="block w-full text-left px-3 py-2 typo-regular typo-base text-text-1 rounded-[4px] hover:bg-bg-2"
              >
                팀원 초대
              </button>
            </div>
            <div className="border-b border-line-3" />
            <div className="p-2">
              <button
                onClick={() => {
                  alert("탈퇴하기 기능은 준비중입니다.");
                }}
                className="block w-full text-left px-3 py-2 typo-regular typo-base text-text-1 rounded-[4px] hover:bg-bg-2"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
