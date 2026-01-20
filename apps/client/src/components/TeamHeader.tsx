import type { ITeam, IUser } from "@teamlite/types";
import { Link2, Star } from "lucide-react";
import React from "react";

const TeamHeader = ({ team }: { team: ITeam }) => {
  return (
    <div className="px-8 py-5 flex justify-between items-center">
      <p className="typo-2xl typo-medium text-text-1">{team.name}</p>
      <div className="flex gap-2 text-text-1">
        {team.teamType === "GROUP" && (
          <>
            <button className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center bg-amber-200">
              <div className="flex gap-2 justify-center items-center ">
                <TeamMemberProfileList members={team.teamMembers} />
                <p className="typo-regular typo-sm ">
                  {team.teamMembers.length}
                </p>
              </div>
            </button>
            <button className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center">
              <Link2 width={20} height={20} />
            </button>
            <button className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center">
              <Star width={20} height={20} />
            </button>
          </>
        )}

        <button>setting</button>
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
      {members.map((member) => (
        <div
          key={`${member.id}-profile`}
          className={
            "border-2 rounded-[4px] border-white bg-bg-2 overflow-hidden"
          }
        >
          <ProfileImage src={member.profileImage!} id={member.id} />
        </div>
      ))}
    </div>
  );
};
