import React, { useState } from "react";
import type { ITeam, IUser } from "@teamlite/types";
import { Container } from "./EditTeam";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { addTeamMembers, searchUserByEmail } from "../../api";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const emailSchema = z.object({
  email: z.string(),
});

const EditTeamMember = ({
  onClose,
  teamDetail,
  members = false,
}: {
  onClose: () => void;
  teamDetail: ITeam;
  members?: boolean;
}) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<IUser | null>(null);
  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: { email: string }) => {
    setUser(null);
    const res = await searchUserByEmail(data.email);
    if (res.email) {
      setUser(res);
    } else {
      alert("해당 이메일을 가진 사용자를 찾을 수 없습니다.");
    }
  };

  const addMemberMutation = useMutation({
    mutationFn: async (data: { teamId: string; userIds: string[] }) => {
      await addTeamMembers(data.teamId, data.userIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamDetail", teamDetail.id],
      });
    },
    onError: () => {},
  });

  return (
    <Container title="팀원 초대" onClose={onClose}>
      <div className="flex flex-col gap-6">
        <form onSubmit={emailForm.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between px-4 rounded-[4px] border border-line-3 w-full">
            <input
              className="w-full py-4 outline-none"
              placeholder="초대할 대상의 이메일을 검색하세요"
              {...emailForm.register("email")}
            />
            <button type="submit">
              <Search />
            </button>
          </div>
        </form>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              {user.profileImage ? (
                <div className="w-10 h-10 bg-bg-1 rounded-[8px] overflow-hidden">
                  <img src={user.profileImage} alt="프로필이미지" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-bg-1 rounded-[8px] flex items-center justify-center">
                  <p className="typo-semibold typo-lg text-text-1">
                    {user.nickname[0]}
                  </p>
                </div>
              )}
              <div>
                <p className="typo-medium typo-sm text-text-1">
                  {user.nickname}
                </p>
                <p className="typo-regular typo-sm text-text-4">{user.email}</p>
              </div>
              <div className="ml-auto">
                {teamDetail.teamMembers.some(
                  (member) => member.id === user.id,
                ) ? (
                  <Button
                    variant="tintGray"
                    size="small"
                    onClick={() => {}}
                    name="팀원"
                  />
                ) : (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => {
                      addMemberMutation.mutate({
                        teamId: teamDetail.id,
                        userIds: [user.id],
                      });
                    }}
                    name="초대하기"
                  />
                )}
              </div>
            </div>
          ) : (
            <div>사용자를 검색하세요.</div>
          )}
        </div>
      </div>
      {members && (
        <div className="mt-4">
          <div className="border-b border-line-3" />
          <div className="py-2"></div>
          <p>팀원</p>
          <div className="mt-4 flex flex-col gap-4 max-h-[200px] overflow-y-auto">
            {teamDetail.teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                {member.profileImage ? (
                  <div className="w-10 h-10 bg-bg-1 rounded-[8px] overflow-hidden">
                    <img src={member.profileImage} alt="프로필이미지" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-bg-1 rounded-[8px] flex items-center justify-center">
                    <p className="typo-semibold typo-lg text-text-1">
                      {member.nickname[0]}
                    </p>
                  </div>
                )}
                <div>
                  <p className="typo-medium typo-sm text-text-1">
                    {member.nickname}
                  </p>
                  <p className="typo-regular typo-sm text-text-4">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default EditTeamMember;
