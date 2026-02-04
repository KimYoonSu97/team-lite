import { useState } from "react";

import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProjectMember, createProject, getTeamDetail } from "../../api";
import CommonContainer from "../../components/CommonContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@teamlite/types";
import type { ICreateProjectDto, IUser } from "@teamlite/types";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { X } from "lucide-react";
import SelectInput from "../../components/SelectInput/SelectInput";
import InputRow from "../../components/input/InputRow";

const AddProject = () => {
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<IUser[]>([]);
  const onSubmit = (data: ICreateProjectDto) => {
    const members = selectedMember.map((member) => member.id);
    createProjectMutation.mutate({ data, members });
  };
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });

  const createProjectHookForm = useForm<ICreateProjectDto>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      profileImage: null,
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async ({
      data,
      members,
    }: {
      data: ICreateProjectDto;
      members: string[] | [];
    }) => {
      const res = await createProject(teamId!, data);
      if (members.length > 0) {
        await addProjectMember(res.id, members);
      }
    },
    onSuccess: () => {
      alert("프로젝트 추가 성공");
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", teamId, "projectList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", teamId],
      });
    },
    onError: () => {
      alert("프로젝트 추가 실패");
    },
  });
  if (teamDetail.isLoading || teamDetail.isError) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CommonContainer>
        <form
          onSubmit={createProjectHookForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-16 pt-16"
        >
          <div className="flex flex-col gap-8">
            <input
              type="text"
              placeholder="프로젝트명을 입력하세요"
              className="typo-4xl text-text-1 pb-4 border-b border-line-3 placeholder:text-text-5 focus:outline-none"
              {...createProjectHookForm.register("name")}
            />
            <div className="flex flex-col gap-2 text-text-3 typo-regular typo-base">
              <InputRow title="팀원">
                <TeamMemberSelect
                  teamMemberList={teamDetail.data!.teamMembers}
                  selectedMember={selectedMember}
                  setSelectedMember={setSelectedMember}
                />
              </InputRow>
              <InputRow title="설명" multiLine>
                <div className=" flex-1">
                  <textarea
                    placeholder="간략한 프로젝트 설명을 입력하세요 줄바꿈도 적용됩니다."
                    {...createProjectHookForm.register("description")}
                    className="w-full resize-none h-45 px-3 py-2 border border-line-3 rounded-[4px] placeholder:text-text-5  focus:outline-none"
                  />
                </div>
              </InputRow>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-zinc-600 rounded-[8px]"
            >
              <p className="typo-base typo-medium text-white">취소</p>
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-brand-primary rounded-[8px]"
            >
              <p className="typo-base typo-medium text-white">등록</p>
            </button>
          </div>
        </form>
      </CommonContainer>
    </>
  );
};

export default AddProject;

const TeamMemberSelect = ({
  teamMemberList,
  selectedMember,
  setSelectedMember,
}: {
  teamMemberList: IUser[];
  selectedMember: IUser[];
  setSelectedMember: React.Dispatch<React.SetStateAction<IUser[]>>;
}) => {
  const userId = useAuthStore((state) => state.user?.id);
  return (
    <SelectInput<IUser>
      mode="multiple"
      items={teamMemberList.filter((member) => member.id !== userId)}
      value={selectedMember}
      onChange={(value) => setSelectedMember(value as IUser[])}
      getItemKey={(member) => member.id}
      renderSelectedItem={(member, onRemove) => (
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-[4px] overflow-hidden">
            <img src={member.profileImage!} alt={member.nickname} />
          </div>
          <p className="typo-medium typo-sm text-text-1">{member.nickname}</p>
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="z-50"
            >
              <X width={16} height={16} />
            </button>
          )}
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
