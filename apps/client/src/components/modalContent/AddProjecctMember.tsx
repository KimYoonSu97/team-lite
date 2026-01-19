import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { addProjectMember } from "../../api";
import type { IUser } from "@teamlite/types";

const AddProjecctMember = ({ onClose }: { onClose: () => void }) => {
  const { projectId, teamId } = useParams();
  const queryClient = useQueryClient();
  const teamMemberList = queryClient.getQueryData([
    "teamDetail",
    teamId,
    "memberList",
  ]) as IUser[];
  const projectMemberList = queryClient.getQueryData([
    "projectDetail",
    projectId,
    "memberList",
  ]) as IUser[];

  const addProjectMutation = useMutation({
    mutationFn: async (data: { projectId: string; userId: string }) => {
      await addProjectMember(data.projectId, [data.userId]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectDetail", projectId, "memberList"],
      });
      onClose();
    },
    onError: () => {
      onClose();
    },
  });

  return (
    <div className="bg-white p-4">
      <div className="p-4 border">
        <p>팀 멤버 리스트</p>
        <div className="p-4 border">
          {teamMemberList?.map((member: IUser) => (
            <div>
              <div key={member.id}>{member.nickname}</div>
              {projectMemberList?.some((user) => user.id !== member.id) && (
                <button
                  onClick={() =>
                    addProjectMutation.mutate({
                      projectId: projectId!,
                      userId: member.id,
                    })
                  }
                >
                  추가
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border">
        <p>프로젝트 멤버 리스트</p>
        <div className="p-4 border">
          {projectMemberList?.map((member: IUser) => (
            <div key={member.id}>{member.nickname}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProjecctMember;
