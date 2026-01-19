import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectSchema } from "@teamlite/types";
import type { ICreateProjectDto } from "@teamlite/types";
import React from "react";
import { useForm } from "react-hook-form";
import { authAxios } from "../../api/axios";
import ErrorText from "../ErrorText";

const AddProject = ({
  onClose,
  teamId,
  isPersonal,
}: {
  onClose: () => void;
  teamId: string;
  isPersonal?: boolean;
}) => {
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
      await authAxios.post(`/projects/${teamId}`, data);
    },
    onSuccess: () => {
      alert("프로젝트 추가 성공");
      if (isPersonal) {
        queryClient.invalidateQueries({
          queryKey: ["personalTeam"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["teamDetail", teamId, "projectList"],
        });
      }

      onClose();
    },
    onError: () => {
      alert("프로젝트 추가 실패");
    },
  });

  const queryClient = useQueryClient();

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

export default AddProject;
