import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getTeamDetail } from "../../api";
import GroupTeamNav from "./GroupTeamNav";

const NavigationBar = () => {
  const user = useAuthStore();
  const navigator = useNavigate();
  const param = useParams();
  const teamId = param.teamId;
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });

  return (
    <div className="border w-[240px]">
      <div className="h-[80px] border">{teamDetail.data?.name}</div>
      <div className="p-4 border">Navigation</div>
      <div className="p-4 border">Private</div>
      {/* {teamDetail.data?.isPublic} */}
      {teamDetail.data?.teamType !== "PERSONAL" && <GroupTeamNav />}

      <div className="p-4 border">Chatting</div>
      <div
        onClick={() => {
          user.logout();
          navigator("/login");
        }}
      >
        로그아웃
      </div>
    </div>
  );
};

export default NavigationBar;
