import React from "react";
import TeamHeader from "../../components/TeamHeader";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTeamDetail } from "../../api";
import CommonContainer from "../../components/CommonContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@teamlite/types";
import type { ICreateProjectDto } from "@teamlite/types";
import { useForm } from "react-hook-form";
import { authAxios } from "../../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AddProject = () => {
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSubmit = (data: ICreateProjectDto) => {
    createProjectMutation.mutate(data);
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
    mutationFn: async (data: ICreateProjectDto) => {
      await authAxios.post(`/projects/${teamId}`, data);
    },
    onSuccess: () => {
      alert("프로젝트 추가 성공");
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", teamId, "projectList"],
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
    <div>
      <TeamHeader team={teamDetail.data!}></TeamHeader>
      <CommonContainer>
        <form
          onSubmit={createProjectHookForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col gap-8">
            <input
              type="text"
              placeholder="프로젝트명을 입력하세요"
              className="typo-4xl text-text-1 pb-4 border-b border-line-3 placeholder:text-text-5 focus:outline-none"
              {...createProjectHookForm.register("name")}
            />
            <div className="flex flex-col gap-2 text-text-3 typo-regular typo-base">
              <div className="flex gap-5">
                <p>팀원</p>
                <div>일단 내비둠</div>
              </div>
              <div className="flex gap-5 ">
                <p>설명</p>
                <div className=" flex-1">
                  <textarea
                    placeholder="간략한 프로젝트 설명을 입력하세요 줄바꿈도 적용됩니다."
                    {...createProjectHookForm.register("description")}
                    className="w-full resize-none h-45 px-3 py-2 border border-line-3 rounded-[4px] placeholder:text-text-5  focus:outline-none"
                  />
                </div>
              </div>
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
    </div>
  );
};

export default AddProject;
