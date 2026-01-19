import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { authAxios } from "../../api/axios";
import useModal from "../../hooks/useModal";
import {
  createProjectSchema,
  type ICreateProjectDto,
  type IUser,
} from "@teamlite/types";
import { useState } from "react";
import { getProjectList, getTeamDetail, getTeamMembers } from "../../api";
import ProjectCard from "../../components/ProjectCard";
import InteractBox from "../../components/InteractBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorText from "../../components/ErrorText";
import { useAuthStore } from "../../store/auth/useAuthStore";

const projectSortControllerSelectList = [
  {
    name: "할일 많은 순",
    value: "taskCount",
  },
  {
    name: "가나다 순",
    value: "name",
  },
  {
    name: "최신 순",
    value: "createdAt",
  },
];

const Teams = () => {
  const { teamId } = useParams();

  const addMemberModal = useModal();
  const addProjectModal = useModal();
  const [projectSortController, setProjectSortController] = useState(
    projectSortControllerSelectList[0],
  );
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });
  const teamProjectList = useQuery({
    queryKey: ["teamDetail", teamId, "projectList"],
    queryFn: () => getProjectList(teamId!),
  });
  const teamMemberList = useQuery({
    queryKey: ["teamDetail", teamId, "memberList"],
    queryFn: () => getTeamMembers(teamId!),
  });

  return (
    <div className="">
      <div>사이드 바에서 팀을 눌렀을때 나오는 페이지</div>
      {addMemberModal.isModalOpen &&
        addMemberModal.modal(
          <AddMemberModal onClose={addMemberModal.closeModal} />,
        )}
      <div className="text-h2 pt-4 pb-4 text-brand-primary w-full flex justify-center items-center gap-2">
        <p>멤버 리스트</p>
        <button
          onClick={addMemberModal.openModal}
          className="px-3 py-1 bg-brand-accent text-text-onAccent rounded-lg hover:bg-brand-accentHover transition-all duration-200 text-caption"
        >
          멤버 추가
        </button>
      </div>
      {/* 
      {addProjectModal.isModalOpen &&
        addProjectModal.modal(
          <AddProjectModal onClose={addProjectModal.closeModal} />,
        )}
      <div className="flex-1">
        <div className="text-h2 text-text-default pl-12">
          {teamDetail.data?.name} 팀 페이지입니다.
        </div>
        <div className="flex flex-col gap-2 mt-7">
          <div className="pl-12 flex gap-2 items-center">
            <p className="text-h2 text-brand-primary">프로젝트</p>
            <button
              onClick={addProjectModal.openModal}
              className="px-4 py-1.5 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-caption"
            >
              프로젝트 추가
            </button>
          </div>
          <div className="pl-12 flex gap-2">
            {projectSortControllerSelectList.map((item) => {
              return (
                <button
                  key={item.value}
                  onClick={() => setProjectSortController(item)}
                  className={`${projectSortController.value === item.value ? "text-brand-primary text-body-m-bold" : "text-text-sub text-body-m"} `}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="overflow-x-scroll pl-12 pb-4">
          <div className="mt-4 flex gap-4">
            {teamProjectList.data?.map((project: any) => {
              return (
                <InteractBox key={project.id}>
                  <ProjectCard key={project.id} project={project} />
                </InteractBox>
              );
            })}
          </div>
        </div>
      </div>
      <div className="rounded-lg shadow-2xl mr-12 flex flex-col gap-2 min-w-[300px]">
      
        <div className="flex flex-col gap-4 overflow-auto pl-12 pr-12 pb-4">
          {teamMemberList.data?.map((member: IUser) => {
            return (
              <div key={member.id} onClick={() => {}} className="flex gap-2">
                <div className="bg-bg-layer1 rounded-[10px] w-[50px] h-[50px]"></div>
                <div>
                  <p className="text-h3 text-text-default">{member.nickname}</p>
                  <p className={"text-caption text-text-sub"}>{member.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Teams;

const AddMemberModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const userEmail = useAuthStore((state) => state.user?.email);
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<IUser | null>(null);

  const searchMember = async () => {
    setSearchResult(null);
    if (!searchString) {
      alert("검색어를 입력하세요.");
      return;
    }
    if (searchString === userEmail) {
      alert("자신은 검색 할 수 없습니다.");
      return;
    }
    const res = await authAxios.get(`/users?email=${searchString}`);
    if (res.data.length === 0) {
      alert("해당 이메일로 등록된 사용자가 없습니다.");
      return;
    }
    console.log(res.data);
    setSearchResult(res.data);
  };

  const addMember = async () => {
    await authAxios.post("/teams/add-members", {
      teamId: param.teamId,
      members: [searchResult?.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["teamDetail", param.teamId, "memberList"],
    });
    alert("멤버 추가 성공");
    setSearchString("");
    setSearchResult(null);
  };

  return (
    <div
      className="w-[450px] bg-white rounded-[20px] p-[30px] flex flex-col gap-6 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 w-full">
        <p className="text-h1 text-brand-primary">멤버 검색</p>
        <div className="w-full h-px bg-brand-primary" />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-3 items-end">
          <input
            name="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="이메일로 검색하세요"
            className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
          />
          <button
            onClick={searchMember}
            className="px-6 py-2 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold whitespace-nowrap"
          >
            검색
          </button>
        </div>

        {searchResult && (
          <div className="bg-bg-layer1 rounded-lg p-4 flex flex-col gap-2">
            <p className="text-body-m-bold text-text-default">검색 결과</p>
            <div className="flex flex-col gap-1">
              <p className="text-body-l text-text-default">
                {searchResult.nickname}
              </p>
              <p className="text-caption text-text-sub">{searchResult.email}</p>
            </div>
            <button
              onClick={addMember}
              className="mt-2 px-4 py-2 bg-brand-accent text-text-onAccent rounded-lg hover:bg-brand-accentHover transition-all duration-200 text-body-m-bold"
            >
              해당 멤버 추가하기
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 text-text-sub hover:text-text-default transition-colors duration-200 text-body-m"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

const AddProjectModal = ({ onClose }: { onClose: () => void }) => {
  const createProjectHookForm = useForm<ICreateProjectDto>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      profileImage: null,
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: ICreateProjectDto) => {
      await authAxios.post(`/projects/${params.teamId}`, data);
    },
    onSuccess: () => {
      alert("프로젝트 추가 성공");
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", params.teamId, "projectList"],
      });
      onClose();
    },
    onError: () => {
      alert("프로젝트 추가 실패");
    },
  });

  const queryClient = useQueryClient();
  const params = useParams();
  const onSubmit = (data: ICreateProjectDto) => {
    createProjectMutation.mutate(data);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form
        className="w-[450px] bg-white rounded-[20px] p-[30px] flex flex-col gap-6 shadow-xl"
        onSubmit={createProjectHookForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-h1 text-brand-primary">프로젝트 추가</p>
          <div className="w-full h-px bg-brand-primary" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              프로젝트 이름
            </label>
            <input
              {...createProjectHookForm.register("name")}
              placeholder="프로젝트 이름을 입력하세요"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={createProjectHookForm.formState.errors.name?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              프로젝트 설명
            </label>
            <input
              {...createProjectHookForm.register("description")}
              placeholder="프로젝트 설명을 입력하세요"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={
                createProjectHookForm.formState.errors.description?.message
              }
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold"
          >
            추가
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
