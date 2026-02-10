import { use, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createTaskSchema } from "@teamlite/types";
import type { ICreateTaskDto, IProject, ITask, IUser } from "@teamlite/types";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import { createTask, getProjectMember, updateTask } from "../../api";
import { ChevronsRight, X } from "lucide-react";
import { PRIORITY_LIST, TASK_STATUS_LIST } from "../../constants";
import InputRow from "../input/InputRow";
import SelectInput from "../SelectInput/SelectInput";
import StatusBadge from "../task/StatusBadge/StatusBadge";
import dayjs from "dayjs";
import AssigneeSelect from "../task/sideModal/AssigneeSelect";
import PrioritySelect from "../task/sideModal/PrioritySelect";
import StatusSelect from "../task/sideModal/StatusSelect";
import DueDateSelect from "../task/sideModal/DueDateSelect";
import Button from "../Button";
import { useAuthStore } from "../../store/auth/useAuthStore";

export interface SelectItem {
  value: string;
  label: string;
}
export interface PriorityItem {
  value: string;
  label: string;
  description: string;
}
const Task = ({
  closeModal,
  projectId,
  task,
}: {
  closeModal: () => void;
  projectId: string;
  task?: ITask;
}) => {
  const userId = useAuthStore((state) => state.user?.id);
  const createTaskHookForm = useForm<ICreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      dueDate: "",
      priority: "",
      status: "",
      assigneeId: "",
    },
    values: {
      title: task?.title || "",
      content: task?.content || "",
      description: task?.description || "",
      dueDate: task?.duedate ? dayjs(task?.duedate).toISOString() : "",
      priority: task?.priority || "",
      status: task?.status || "",
      assigneeId: task?.assignee.id || "",
    },
  });

  const seletedDate = useWatch({
    control: createTaskHookForm.control,
    name: "dueDate",
  });

  const seletedAssignee = useWatch({
    control: createTaskHookForm.control,
    name: "assigneeId",
  });
  const seletedPriority = useWatch({
    control: createTaskHookForm.control,
    name: "priority",
  });

  const seletedStatus = useWatch({
    control: createTaskHookForm.control,
    name: "status",
  });

  const queryClient = useQueryClient();

  const memberList = useQuery({
    queryKey: ["projectMember", projectId],
    queryFn: () => getProjectMember(projectId!),
  });

  const taskMutation = useMutation({
    mutationFn: (data: ICreateTaskDto) => {
      return createTask(projectId!, data);
    },
    onSuccess: () => {
      // 테스크가 추가되면 그게 전체작업인지.. 나의 작업인지 확인해서 긍정업데이트 실시
      queryClient.invalidateQueries({
        queryKey: ["taskList", projectId],
      });
      alert("할일이 추가되었습니다.");
      closeModal();
    },
    onError: () => {
      alert("할일이 추가되지 않았습니다.");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: ICreateTaskDto) => {
      return updateTask(task!.id, data);
    },
    onSuccess: () => {
      // 테스크가 추가되면 그게 전체작업인지.. 나의 작업인지 확인해서 긍정업데이트 실시
      queryClient.invalidateQueries({
        queryKey: ["taskList", projectId],
      });
      alert("할일이 수정되었습니다.");
      closeModal();
    },
    onError: () => {
      alert("할일이 수정되지 않았습니다.");
    },
  });

  const onSubmit = (data: ICreateTaskDto) => {
    taskMutation.mutate(data);
  };

  const onSubmitEdit = (data: ICreateTaskDto) => {
    if (!task) {
      alert("에러가 발생했습니다.");

      return;
    }

    if (task.owner.id !== userId && task.assignee.id !== userId) {
      alert("현재는 담당자나 작성자만 수정이 가능합니다.");
      return;
    }
    updateTaskMutation.mutate(data);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" bg-white flex flex-col gap-6 shadow-xl  overflow-y-auto h-dvh border-l border-line-3 w-[50dvw]"
    >
      <div className="w-full h-[76px]  px-8 py-5 flex justify-between items-center">
        <div
          className="w-[32px] h-[32px] flex justify-center items-center"
          onClick={() => {
            closeModal();
          }}
        >
          <ChevronsRight width={20} height={20} />
        </div>
        {/* <div className="w-[32px] h-[32px]  flex justify-center items-center">
          <ChevronsRight width={20} height={20} />
        </div> */}
      </div>
      <div className="px-20 py-16">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (task) {
              createTaskHookForm.handleSubmit(onSubmitEdit)();
            } else {
              createTaskHookForm.handleSubmit(onSubmit)();
            }
          }}
        >
          <div>
            <input
              type="text"
              placeholder="작업 이름을 입력하세요"
              className="typo-4xl text-text-1 pb-4 border-b border-line-3 placeholder:text-text-5 focus:outline-none w-full"
              {...createTaskHookForm.register("title")}
            />
          </div>
          <div className="flex flex-col gap-2">
            {memberList.data && (
              <InputRow title="담당자">
                <AssigneeSelect
                  memberList={memberList.data}
                  setState={(user: IUser) => {
                    createTaskHookForm.setValue("assigneeId", user.id);
                  }}
                  state={seletedAssignee}
                />
              </InputRow>
            )}
            <InputRow title="상태값">
              <StatusSelect
                setState={(value: SelectItem) => {
                  createTaskHookForm.setValue("status", value.value);
                }}
                status={seletedStatus}
              />
            </InputRow>

            <InputRow title="마감일">
              <DueDateSelect
                setState={(value: string) => {
                  createTaskHookForm.setValue("dueDate", value);
                }}
                state={seletedDate}
              />
            </InputRow>
            <InputRow title="중요도">
              <PrioritySelect
                setState={(value: PriorityItem) => {
                  createTaskHookForm.setValue("priority", value.value);
                }}
                state={seletedPriority}
              />
            </InputRow>
            <InputRow title="내용" multiLine>
              <textarea
                {...createTaskHookForm.register("content")}
                placeholder="작업 내용을 입력하세요"
                className="w-full resize-none h-45 px-3 py-2 border border-line-3 rounded-[4px] placeholder:text-text-5  focus:outline-none"
              />
            </InputRow>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              name="취소"
              onClick={closeModal}
              variant="tintGray"
              size="medium"
            />
            {task ? (
              <Button
                name="수정"
                type="submit"
                variant="primary"
                size="medium"
              />
            ) : (
              <Button
                name="등록"
                type="submit"
                variant="primary"
                size="medium"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Task;
