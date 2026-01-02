import type { ITeam } from "@teamlite/types";
import { useNavigate } from "react-router";
import { Ellipsis } from "lucide-react";
import dayjs from "dayjs";

const index = ({ team }: { team: ITeam }) => {
  const navigation = useNavigate();

  return (
    <div
      onClick={() => navigation(`/teams/${team.id}`)}
      className="w-[250px] h-[150px] bg-bg-layer1 rounded-[20px] p-[15px] flex flex-col justify-between shrink-0"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p className="text-h1 text-system-warning">4</p>
          <p className="text-caption text-text-sub">개의 할일</p>
        </div>
        <Ellipsis />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-caption text-text-sub">
          {team.owner.nickname}님의 팀
        </p>
        <p className="text-h1 text-brand-primary">{team.name}</p>
        <p className="text-caption text-text-sub">
          {dayjs(team.createdAt).format("YYYY-MM-DD")}
        </p>
      </div>
    </div>
  );
};

export default index;
