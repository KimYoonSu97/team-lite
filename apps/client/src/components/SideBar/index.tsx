import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getTeamList } from "../../api";
import type { ITeam } from "@teamlite/types";
import TeamBar from "./TeamBar";
import NavigationBar from "./NavigationBar";

const Index = () => {
  return (
    <div className="h-full">
      <div className="flex h-full">
        <TeamBar />
        <NavigationBar />
      </div>
    </div>
  );
};

export default Index;
