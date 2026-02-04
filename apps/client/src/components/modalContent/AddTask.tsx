import React, { useRef, useState } from "react";
import ErrorText from "../ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { createTaskSchema } from "@teamlite/types";
import type { ICreateTaskDto, IProject, IUser } from "@teamlite/types";
import dayjs from "dayjs";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import { getTeamMembers, createTask } from "../../api";
import { ChevronsRight, X } from "lucide-react";
import { PRIORITY_LIST, TASK_STATUS_LIST } from "../../constants";
import InputRow from "../input/InputRow";
import { useAuthStore } from "../../store/auth/useAuthStore";
import SelectInput from "../SelectInput/SelectInput";
import StatusBadge from "../task/StatusBadge/StatusBadge";

interface SelectItem {
  value: string;
  label: string;
}

interface PriorityItem {
  value: string;
  label: string;
  description: string;
}

const AddTask = ({ closeModal }: { closeModal: () => void }) => {
  const createTaskHookForm = useForm<ICreateTaskDto>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      deadLine: "",
      priority: "",
      status: "",
      assigneeId: "",
    },
  });

  const seletedDate = useWatch({
    control: createTaskHookForm.control,
    name: "deadLine",
  });

  const params = useParams();
  const queryClient = useQueryClient();

  const memberList = queryClient.getQueryData([
    "projectDetail",
    params.projectId,
  ]) as IProject;

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
    <div
      onClick={(e) => e.stopPropagation()}
      className=" bg-white flex flex-col gap-6 shadow-xl  overflow-y-auto h-dvh border-l border-line-3 w-[50dvw]"
    >
      <div className="w-full h-[76px] bg-amber-200 px-8 py-5 flex justify-between items-center">
        <div className="w-[32px] h-[32px] bg-amber-400 flex justify-center items-center">
          <ChevronsRight width={20} height={20} />
        </div>
        <div className="w-[32px] h-[32px] bg-amber-400 flex justify-center items-center">
          <ChevronsRight width={20} height={20} />
        </div>
      </div>
      <div className="px-20 py-16">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            createTaskHookForm.handleSubmit(onSubmit)();
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
            <InputRow title="담당자">
              <AssigneeSelect
                memberList={memberList.projectMembers}
                setState={(user: IUser) => {
                  createTaskHookForm.setValue("assigneeId", user.id);
                }}
              />
            </InputRow>
            <InputRow title="상태값">
              <StatusSelect
                setState={(value: SelectItem) => {
                  createTaskHookForm.setValue("status", value.value);
                }}
              />
            </InputRow>

            <InputRow title="마감일">
              <DeadLineSelect
                setState={(value: string) => {
                  createTaskHookForm.setValue("deadLine", value);
                }}
                state={seletedDate}
              />
            </InputRow>
            <InputRow title="중요도">
              <PrioritySelect
                setState={(value: PriorityItem) => {
                  createTaskHookForm.setValue("priority", value.value);
                }}
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
            <button
              onClick={closeModal}
              className="px-6 py-2 text-text-sub hover:text-text-default transition-colors duration-200 text-body-m"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

const AssigneeSelect = ({
  memberList,
  setState,
}: {
  memberList: IUser[];
  setState: (user: IUser) => void;
}) => {
  const [selectedMember, setSelectedMember] = useState<IUser[]>([]);
  return (
    <SelectInput<IUser>
      mode="single"
      items={memberList}
      value={selectedMember}
      onChange={(value) => {
        setSelectedMember(value as IUser[]);
        setState(value as IUser);
      }}
      getItemKey={(member) => member.id}
      renderSelectedItem={(member, onRemove) => (
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-[4px] overflow-hidden">
            <img src={member.profileImage!} alt={member.nickname} />
          </div>
          <p className="typo-medium typo-sm text-text-1">{member.nickname}</p>
        </div>
      )}
      renderListItem={(member) => (
        <div className="cursor-pointer flex gap-2 items-center p-2 hover:bg-bg-2 rounded-[4px]">
          <div className="w-6 h-6 rounded-[4px] overflow-hidden">
            <img src={member.profileImage!} alt={member.nickname} />
          </div>
          <p className="typo-medium typo-sm text-text-1">{member.nickname}</p>
          <p className="typo-regular typo-sm text-text-4">{member.email}</p>
        </div>
      )}
      emptyMessage="팀원이 없습니다."
      placeholder="선택"
    />
  );
};

const PrioritySelect = ({
  setState,
}: {
  setState: (value: PriorityItem) => void;
}) => {
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(
    null,
  );

  return (
    <SelectInput<PriorityItem>
      mode="single"
      items={PRIORITY_LIST}
      value={selectedPriority}
      onChange={(value) => {
        setSelectedPriority(value as PriorityItem);
        setState(value as PriorityItem);
      }}
      getItemKey={(item) => item.value}
      renderSelectedItem={(item) => (
        <div className="flex gap-2 items-center">
          <p className="typo-regular typo-base text-text-1">{item.label}</p>
        </div>
      )}
      renderListItem={(item) => (
        <div className="cursor-pointer flex gap-2 items-center p-2 hover:bg-bg-2 rounded-[4px]">
          <p className="typo-regular typo-base text-text-1 shrink-0">
            {item.label}
          </p>
          <p className="typo-regular typo-sm text-text-5 flex-1 truncate">
            {item.description}
          </p>
        </div>
      )}
      emptyMessage="우선순위가 없습니다."
      placeholder="선택"
    />
  );
};

const StatusSelect = ({
  setState,
}: {
  setState: (status: SelectItem) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<SelectItem | null>(null);
  return (
    <SelectInput<SelectItem>
      mode="single"
      items={TASK_STATUS_LIST}
      value={selectedStatus}
      onChange={(value) => {
        setSelectedStatus(value as SelectItem);
        setState(value as SelectItem);
      }}
      getItemKey={(item) => item.value}
      renderSelectedItem={(item) => (
        <div className="flex gap-2 items-center">
          <StatusBadge status={item.value} />
        </div>
      )}
      renderListItem={(item) => <StatusBadge status={item.value} />}
      emptyMessage="상태가 없습니다."
      placeholder="선택"
      dropdownClassName="flex gap-2"
    />
  );
};

const DeadLineSelect = ({
  setState,
  state,
}: {
  setState: (value: string) => void;
  state: string;
}) => {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full rounded-[4px] overflow-hidden">
      <input
        type="date"
        onChange={(e) => {
          setState(e.target.value);
        }}
        ref={dateRef}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        onClick={() => {
          dateRef.current?.showPicker();
        }}
        className="flex-1 py-2 px-3 relative cursor-pointer hover:bg-bg-2"
      >
        {state ? (
          <p className="typo-regular typo-base text-text-1">{state}</p>
        ) : (
          <p className="typo-regular typo-base text-text-5">선택</p>
        )}
      </div>
    </div>
  );
};
