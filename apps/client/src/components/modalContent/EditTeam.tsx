import React from "react";
import {
  createTeamSchema,
  type ICreateTeamDto,
  type ITeam,
} from "@teamlite/types";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeam } from "../../api";

const EditTeam = ({
  onClose,
  teamDetail,
}: {
  onClose: () => void;
  teamDetail: ITeam;
}) => {
  const queryClient = useQueryClient();
  const editTeamForm = useForm<ICreateTeamDto>({
    resolver: zodResolver(createTeamSchema),
    values: {
      name: teamDetail.name,
      description: teamDetail.description || "",
      profileImage: teamDetail.profileImage || null,
      members: [],
    },
  });
  const onSubmit = (data: ICreateTeamDto) => {
    editTeamMutation.mutate(data);
  };
  const editTeamMutation = useMutation({
    mutationFn: async (data: ICreateTeamDto) => {
      await updateTeam(teamDetail.id, data);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", teamDetail.id],
      });
    },
    onError: () => {
      alert("팀 정보 변경에 실패했습니다.");
    },
  });

  return (
    <Container title="팀 정보 변경" onClose={onClose}>
      <form onSubmit={editTeamForm.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div>profile</div>
          <div className="flex flex-col gap-3 typo-regular typo-base text-text-1">
            <p className="">이름</p>
            <input
              {...editTeamForm.register("name")}
              className="p-4 rounded-[4px] border border-line-3  "
            />
          </div>
          <div className="flex flex-col gap-3 typo-regular typo-base text-text-1">
            <p className="">설명</p>
            <textarea
              {...editTeamForm.register("description")}
              className="p-4 rounded-[4px] border border-line-3 resize-none"
              rows={4}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-8 justify-center">
          <Button name="취소" variant="gray" onClick={onClose} />
          <Button name="수정" variant="primary" />
        </div>
      </form>
    </Container>
  );
};

export default EditTeam;

export const Container = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) => {
  return (
    <div className="w-[420px] bg-white rounded-[8px]">
      <div className="flex justify-center items-center p-4 relative">
        <p className="typo-medium typo-lg text-text-1">{title}</p>
        <button onClick={onClose} className="absolute right-4">
          <X width={24} height={24} />
        </button>
      </div>
      <div className="border-b border-line-3" />
      <div className="p-8">{children}</div>
    </div>
  );
};
