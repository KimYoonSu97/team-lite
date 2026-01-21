import type { ITeam, IUser } from "@teamlite/types";
import clsx from "clsx";
import { ChevronDown, Ellipsis, Link2, Star } from "lucide-react";

const TeamHeader = ({ team }: { team: ITeam }) => {
  return (
    <div className="px-8 py-5 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <p className="typo-2xl typo-medium text-text-1">{team.name}</p>
        <ChevronDown width={24} height={24} className="text-text-1" />
      </div>
      <div className="flex gap-2 text-text-1">
        {team.teamType === "GROUP" && (
          <>
            <button className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center">
              <div className="flex gap-2 justify-center items-center">
                <TeamMemberProfileList members={team.teamMembers.slice(0, 3)} />
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
        <button className="rounded-[4px] border border-line-3 p-1 flex justify-center items-center">
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
