import React from "react";
import ErrorText from "../ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { createTaskSchema } from "@teamlite/types";
import type { ICreateTaskDto } from "@teamlite/types";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { getTeamMembers, createTask } from "../../api";
import { PRIORITY_LIST } from "../../constants";

const AddTask = ({ closeModal }: { closeModal: () => void }) => {
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
      // 테스크가 추가되면 그게 전체작업인지.. 나의 작업인지 확인해서 긍정업데이트 실시
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

export default AddTask;
