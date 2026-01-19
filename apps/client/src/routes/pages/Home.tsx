import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/useAuthStore";
import {
  createTeamSchema,
  type ICreateTeamDto,
  type ITeam,
} from "@teamlite/types";
import useModal from "../../hooks/useModal";
import { useEffect, useState } from "react";
import { createTeam, getMyTaskList, getTeamList } from "../../api";
import TaskCard from "../../components/TaskCard";
import TeamCard from "../../components/TeamCard";
import InteractBox from "../../components/InteractBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "../../components/ErrorText";
import { useNavigate } from "react-router";

const taskSortControllerSelectList = [
  {
    name: "중요도 높은순",
    value: "priority",
  },
  {
    name: "마감일 빠른 순",
    value: "dueDate",
  },
  {
    name: "최신 순",
    value: "createdAt",
  },
];

const teamSortControllerSelectList = [
  {
    name: "최신 순",
    value: "createdAt",
  },
  { name: "가나다 순", value: "name" },
];

const Home = () => {
  const navigate = useNavigate();
  const teamList = useQuery({
    queryKey: ["teamList"],
    queryFn: getTeamList,
  });

  useEffect(() => {
    if (teamList.data) {
      const personalTeam = teamList.data.find(
        (team) => team.teamType === "PERSONAL",
      );
      navigate(`/team/${personalTeam?.id}`);
    }
  }, [teamList.data]);

  return (
    <div className="">
      로딩중
      {/* {isModalOpen && modal(<AddTeamModal onClose={closeModal} />)}
      <div className="text-h2 text-text-default pl-12">
        {user?.nickname}님 반갑습니다.
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <div className="pl-12">
          <p className="text-h2 text-brand-primary">내가 담당자인 할일</p>
        </div>
        <div className="flex gap-2 pl-12">
          {taskSortControllerSelectList.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => setTaskSortController(item)}
                className={`${taskSortController.value === item.value ? "text-brand-primary text-body-m-bold" : "text-text-sub text-body-m"} `}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-scroll pl-12 pb-4">
          <div className="mt-4 flex gap-4">
            {taskList.data?.map((task: any) => {
              return (
                <InteractBox key={task.id}>
                  <TaskCard task={task} />
                </InteractBox>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <div className="pl-12 flex gap-2">
          <p className="text-h2 text-brand-primary">내 팀</p>
          <button className="text-body-m text-text-sub" onClick={openModal}>
            팀 추가
          </button>
        </div>
        <div className="flex gap-2 pl-12">
          {teamSortControllerSelectList.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => setTeamSortController(item)}
                className={`${teamSortController.value === item.value ? "text-brand-primary text-body-m-bold" : "text-text-sub text-body-m"} `}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-scroll pl-12 pb-4">
          <div className="mt-4 flex gap-4">
            {teamList.data?.map((team: ITeam) => (
              <InteractBox key={team.id}>
                <TeamCard team={team} />
              </InteractBox>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;

const AddTeamModal = ({ onClose }: { onClose: () => void }) => {
  const createTeamHookForm = useForm<ICreateTeamDto>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [],
      profileImage: null,
    },
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: async (data: ICreateTeamDto) => {
      await createTeam(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamList"],
      });
      onClose();
    },
  });

  const onSubmit = (data: ICreateTeamDto) => {
    postMutation.mutate(data);
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form
        className="w-[450px] bg-white rounded-[20px] p-[30px] flex flex-col gap-6 shadow-xl"
        onSubmit={createTeamHookForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-h1 text-brand-primary">팀 만들기</p>
          <div className="w-full h-px bg-brand-primary" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <input
              placeholder="팀 이름"
              type="text"
              {...createTeamHookForm.register("name")}
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={createTeamHookForm.formState.errors.name?.message}
            />
          </div>
          <div className="w-full">
            <input
              placeholder="팀 설명"
              type="text"
              {...createTeamHookForm.register("description")}
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={createTeamHookForm.formState.errors.description?.message}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold"
          >
            만들기
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 text-text-sub hover:text-text-default transition-colors duration-200 text-body-m"
          >
            닫기
          </button>
        </div>
      </form>
    </div>
  );
};
