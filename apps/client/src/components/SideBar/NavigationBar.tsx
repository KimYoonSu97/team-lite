import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPersonalTeam, getProjectList, getTeamDetail } from "../../api";
import logoColor from "../../assets/logo-color.png";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Frame,
  GripVertical,
  House,
  PanelRightOpen,
  Plus,
  Search,
} from "lucide-react";
import clsx from "clsx";
import type { ITeam } from "@teamlite/types";

const NavigationBar = ({ toggle }: { toggle: () => void }) => {
  const user = useAuthStore();

  const param = useParams();
  const teamId = param.teamId;

  const [teamDetail, personalTeam] = useQueries({
    queries: [
      {
        queryKey: ["teamDetail", teamId],
        queryFn: () => getTeamDetail(teamId!),
      },
      {
        queryKey: ["personalTeam"],
        queryFn: () => getPersonalTeam(user.user!.id),
      },
    ],
  });

  return (
    <div className="w-[260px] border-r border-line-3 pt-2">
      <LogoSection toggle={toggle} />
      <div className="px-3 flex flex-col gap-2">
        {!personalTeam.isLoading && !personalTeam.isError && (
          <NavigationSection personalTeam={personalTeam.data!} />
        )}

        <BookmarkSection />
        {!personalTeam.isLoading && !personalTeam.isError && (
          <PersonalSection personalTeam={personalTeam.data!} />
        )}
        {!teamDetail.isLoading &&
          !teamDetail.isError &&
          teamDetail.data?.teamType === "GROUP" && (
            <TeamSpaceSection team={teamDetail.data!} />
          )}
      </div>
    </div>
  );
};

export default NavigationBar;

const LogoSection = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className="h-15 py-[10px] px-6 flex items-center justify-between ">
      <img src={logoColor} width={128} alt="로고" />
      <div className="cursor-pointer" onClick={toggle}>
        <PanelRightOpen width={24} height={24} className="text-brand-primary" />
      </div>
    </div>
  );
};

const menuList = [
  {
    id: "dashboard",
    title: "대시보드",
    icon: <House width={20} height={20} className="text-text-1" />,
    path: (teamId: string) => `team/${teamId}`,
  },
  {
    id: "search",
    title: "검색",
    icon: <Search width={20} height={20} className="text-text-1" />,
    path: (personalTeamId: string) => `search`,
  },
  {
    id: "notification",
    title: "알림",
    icon: <Bell width={20} height={20} className="text-text-1" />,
    path: (personalTeamId: string) => "notification",
  },
  {
    id: "chat",
    title: "채팅",
    icon: <Frame width={20} height={20} className="text-text-1" />,
    path: (personalTeamId: string) => "chat",
  },
];
const NavigationSection = ({ personalTeam }: { personalTeam: ITeam }) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  return (
    <section className="border-b border-line-5 ">
      {menuList.map((menu, index) => (
        <button
          onClick={() => {
            if (menu.id === "dashboard") {
              navigate(menu.path(teamId!));
            } else {
              alert("준비중임ㅋ");
            }
          }}
          key={`menu-${index}`}
          className={clsx(
            "w-full flex items-center gap-2 p-3 typo-lg typo-medium text-text-1 rounded-[8px] hover:bg-bg-2 ",
            index === 0 && "bg-bg-2",
          )}
        >
          {menu.icon}
          <p>{menu.title}</p>
        </button>
      ))}
    </section>
  );
};

const NavigatorListItem = ({ title }: { title: string }) => {
  return (
    <div className="py-3 flex gap-2 text-text-1 items-center">
      <GripVertical width={20} height={20} />
      <p className="typo-lg typo-medium ">{title}</p>
    </div>
  );
};

const SectionContainer = ({
  children,
  title,

  navigate,
}: {
  children: React.ReactNode;
  title: string;

  navigate?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="p-3 border-b border-line-5">
      <div className="text-text-4 typo-medium typo-sm flex items-center justify-between">
        <button onClick={toggle} className="flex items-center gap-1">
          <p>{title}</p>
          <div>
            {isOpen ? (
              <ChevronUp width={16} height={16} />
            ) : (
              <ChevronDown width={16} height={16} />
            )}
          </div>
        </button>
        {navigate && (
          <button onClick={navigate}>
            <Plus width={16} height={16} className="text-brand-primary" />
          </button>
        )}
      </div>
      {isOpen && <div>{children}</div>}
    </section>
  );
};
const BookmarkSection = () => {
  return (
    <SectionContainer title={"bookmark"}>
      <NavigatorListItem title={"준비중임ㅋ"} />
    </SectionContainer>
  );
};

const PersonalSection = ({ personalTeam }: { personalTeam: ITeam }) => {
  const navigate = useNavigate();
  return (
    <SectionContainer
      title={"personal"}
      navigate={() => navigate(`team/${personalTeam.id}/add-project`)}
    >
      {personalTeam.project.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {
              navigate(`team/${personalTeam.id}/project/${item.id}`);
            }}
          >
            <NavigatorListItem title={item.title} />
          </button>
        );
      })}
    </SectionContainer>
  );
};

const TeamSpaceSection = ({ team }: { team: ITeam }) => {
  const navigate = useNavigate();

  return (
    <SectionContainer
      title={"team"}
      navigate={() => navigate(`team/${team.id}/add-project`)}
    >
      {team.project.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {
              navigate(`team/${team.id}/project/${item.id}`);
            }}
          >
            <NavigatorListItem title={item.title} />
          </button>
        );
      })}
    </SectionContainer>
  );
};

// <div className="h-[80px] border">
//   <div class="flex items-center justify-center  cursor-pointer p-[6px]">
//     <div class="w-12 h-12 flex justify-center items-center border-2 border-brand-sub2 rounded-[12px]">
//       <div class="w-10 h-10 rounded-[8px] flex items-center justify-center bg-bg-2">
//         김
//       </div>
//     </div>
//   </div>
// </div>
// <div className="p-4 border">Navigation</div>
// <PrivateNavigation />
// {/* {teamDetail.data?.isPublic} */}
// {teamDetail.data?.teamType !== "PERSONAL" && <GroupTeamNav />}

// <div className="p-4 border">Chatting</div>
// <div
//   onClick={() => {
//     user.logout();
//     navigator("/login");
//   }}
// >
//   로그아웃
// </div>
