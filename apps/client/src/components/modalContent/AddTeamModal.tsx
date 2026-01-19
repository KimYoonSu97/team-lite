import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ICreateTeamDto } from "@teamlite/types";
import { createTeamSchema } from "@teamlite/types";
import React from "react";
import { useForm } from "react-hook-form";
import { createTeam } from "../../api";
import ErrorText from "../ErrorText";

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

export default AddTeamModal;
