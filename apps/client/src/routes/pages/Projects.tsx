import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useParams,
  useSearchParams,
  type SetURLSearchParams,
} from "react-router";
import useModal from "../../hooks/useModal";
import dayjs from "dayjs";
import {
  createTask,
  getAllTaskListByProjectId,
  getMyTaskListByProjectId,
  getProjectDetail,
  getProjectMember,
  getTeamDetail,
  getTeamMembers,
} from "../../api";
import {
  createTaskSchema,
  type ICreateTaskDto,
} from "@teamlite/types/src/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorText from "../../components/ErrorText";
import { PRIORITY_LIST } from "../../constants";
import type { IUser } from "@teamlite/types";
import AddProjecctMember from "../../components/modalContent/AddProjecctMember";
import CommonContainer from "../../components/CommonContainer";
import TeamHeader from "../../components/TeamHeader";
import { Eclipse, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
// const teamMemberList = useQuery({
//   queryKey: ["teamDetail", teamId, "memberList"],
//   queryFn: () => getTeamMembers(teamId!),
// });

// const projectMemberList = useQuery({
//   queryKey: ["projectDetail", projectId, "memberList"],
//   queryFn: () => getProjectMember(projectId!),
// });
// const addProjectMemberModal = useModal();

const taskTabList = [
  {
    lable: "전체 작업",
    value: "all",
  },
  {
    lable: "나의 작업",
    value: "my",
  },
];

const Projects = () => {
  const { projectId, teamId } = useParams();
  const [searchQuery, setSearchQuery] = useSearchParams();
  useEffect(() => {
    if (searchQuery.get("tab") === null) {
      setSearchQuery({ tab: "all" });
    }
  }, [projectId, teamId]);

  const [teamDetail, projectDetail] = useQueries({
    queries: [
      {
        queryKey: ["teamDetail", teamId],
        queryFn: () => getTeamDetail(teamId!),
      },
      {
        queryKey: ["projectDetail", projectId],
        queryFn: () => getProjectDetail(projectId!),
      },
    ],
  });

  if (teamDetail.isLoading || projectDetail.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TeamHeader team={teamDetail.data!}></TeamHeader>
      <CommonContainer>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="typo-4xl text-text-1">{projectDetail.data?.title}</p>
            <Ellipsis width={24} height={24} />
          </div>
          <div>{projectDetail.data?.description}</div>
        </div>
        <div>
          <TaskTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allCount={projectDetail.data?.allTaskCount}
            myCount={projectDetail.data?.myTaskCount}
          />
        </div>
      </CommonContainer>
    </div>
  );
};

export default Projects;

const TaskTab = ({
  searchQuery,
  setSearchQuery,
  allCount,
  myCount,
}: {
  searchQuery: URLSearchParams;
  setSearchQuery: SetURLSearchParams;
  allCount: number;
  myCount: number;
}) => {
  return (
    <div className={"flex gap-4 text-text-1"}>
      {taskTabList.map((item) => (
        <button
          key={item.value}
          onClick={() => {
            setSearchQuery({ tab: item.value });
          }}
          className={clsx(
            "pb-3 px-1 border-b-2 typo-2xl",
            searchQuery.get("tab") === item.value
              ? " border-zinc-600 text-text-1"
              : " border-white text-text-4",
          )}
        >
          <div className={"flex gap-2 items-center"}>
            <p>{item.lable}</p>
            <p
              className={clsx(
                "typo-base px-2 py-1 rounded-[50px]",
                searchQuery.get("tab") === item.value
                  ? "text-white bg-zinc-600"
                  : "text-text-4 bg-zinc-200",
              )}
            >
              {item.value === "all" ? allCount : myCount}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

const AddTaskModal = ({ closeModal }: { closeModal: () => void }) => {
  const createTaskHookForm = useForm<ICreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      deadLine: dayjs().add(1, "month").format("YYYY-MM-DD"),
      priority: "3",
      assigneeId: "",
    },
  });

  const params = useParams();
  const queryClient = useQueryClient();
  const memberList = useQuery({
    queryKey: ["teamDetail", params.teamId, "memberList"],
    queryFn: () => getTeamMembers(params.teamId!),
  });

  const taskMutation = useMutation({
    mutationFn: (data: ICreateTaskDto) => {
      return createTask(params.projectId!, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myTaskList", params.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskList", params.projectId],
      });
      alert("할일이 추가되었습니다.");
      closeModal();
    },
    onError: () => {
      alert("할일이 추가되지 않았습니다.");
    },
  });

  const onSubmit = (data: ICreateTaskDto) => {
    taskMutation.mutate(data);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form
        className="w-[500px] bg-white rounded-[20px] p-[30px] flex flex-col gap-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onSubmit={createTaskHookForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-h1 text-brand-primary">할일 추가</p>
          <div className="w-full h-px bg-brand-primary" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              제목
            </label>
            <input
              {...createTaskHookForm.register("title")}
              placeholder="할일 제목을 입력하세요"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={createTaskHookForm.formState.errors.title?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              내용
            </label>
            <input
              {...createTaskHookForm.register("content")}
              placeholder="할일 내용을 입력하세요"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <ErrorText
              error={createTaskHookForm.formState.errors.content?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              설명
            </label>
            <textarea
              {...createTaskHookForm.register("description")}
              placeholder="상세 설명을 입력하세요"
              className="block pt-2 pb-2 w-full border-2 border-border-default rounded-lg focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub min-h-[80px] resize-none px-3"
            />
            <ErrorText
              error={createTaskHookForm.formState.errors.description?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              담당자
            </label>
            <select
              {...createTaskHookForm.register("assigneeId")}
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 bg-transparent"
            >
              <option value="">담당자를 선택하세요</option>
              {memberList.data?.map((member: any) => {
                return (
                  <option key={member.id} value={member.id}>
                    {member.nickname}
                  </option>
                );
              })}
            </select>
            <ErrorText
              error={createTaskHookForm.formState.errors.assigneeId?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              우선순위
            </label>
            <select
              {...createTaskHookForm.register("priority")}
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 bg-transparent"
            >
              {PRIORITY_LIST.map((level) => {
                return (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                );
              })}
            </select>
            <ErrorText
              error={createTaskHookForm.formState.errors.priority?.message}
            />
          </div>

          <div className="w-full">
            <label className="text-body-m-bold text-text-default mb-2 block">
              마감일
            </label>
            <input
              type="date"
              {...createTaskHookForm.register("deadLine")}
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200"
            />
            <ErrorText
              error={createTaskHookForm.formState.errors.deadLine?.message}
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
            onClick={closeModal}
            className="px-6 py-2 text-text-sub hover:text-text-default transition-colors duration-200 text-body-m"
          >
            닫기
          </button>
        </div>
      </form>
    </div>
  );
};

{
  /* {addProjectMemberModal.isModalOpen &&
        addProjectMemberModal.modal(
          <AddProjecctMember onClose={addProjectMemberModal.closeModal} />,
        )}
      <div>사이드 네비게이션에서 프로젝트를 눌렀을때 나오는 화면</div>
      <div className="border p-4">
        <p>팀의 전체 팀원 리스트</p>
        <div className="border p-4">
          {teamMemberList.data?.map((member: IUser) => {
            return <div key={member.id}>{member.nickname}</div>;
          })}
        </div>
      </div>
      <div className="border p-4">
        <div onClick={addProjectMemberModal.openModal}>팀원추가</div>
        <p>프로젝트에 추가된 팀원</p>
        <div>
          {projectMemberList.data?.map((member: IUser) => {
            return <div key={member.id}>{member.nickname}</div>;
          })}
        </div>
      </div> */
}
{
  /* {addTaskModal.isModalOpen &&
        addTaskModal.modal(
          <AddTaskModal closeModal={addTaskModal.closeModal} />
        )}
      <div className="text-h2 text-text-default pl-12 mb-7">
        {projectDetail.data?.title}
      </div>

      <div className="flex flex-col gap-2 mt-7">
        <div className="pl-12 flex gap-2 items-center">
          <p className="text-h2 text-brand-primary">내 할일</p>
          <button
            onClick={addTaskModal.openModal}
            className="px-4 py-1.5 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-caption"
          >
            할일 추가
          </button>
        </div>
        <div className="overflow-x-scroll pl-12 pb-4">
          <div className="mt-4 flex gap-4">
            {myTaskList.data?.map((task: any) => {
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
        <div className="pl-12">
          <p className="text-h2 text-brand-primary">팀 할일</p>
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
      </div> */
}
