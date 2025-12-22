import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { authAxios } from "../../api/axios";
import styled from "styled-components";

const Teams = () => {
  const { teamId } = useParams();
  const navigation = useNavigate();
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: async () => {
      const res = await authAxios(`/teams/${teamId}`);

      return res.data;
    },
  });
  const teamProjectList = useQuery({
    queryKey: ["teamDetail", teamId, "projectList"],
    queryFn: async () => {
      const res = await authAxios(`/projects/${teamId}/list`);

      return res.data;
    },
  });

  return (
    <div>
      <div>{teamDetail.data?.name}</div>
      <S.Container>
        <p>프로젝트 리스트</p>
        <div>
          {teamProjectList.data?.map((project: any) => {
            return (
              <S.Box
                key={project.id}
                onClick={() => {
                  navigation(`/projects/${project.id}`);
                }}
              >
                {project.title}
              </S.Box>
            );
          })}
        </div>
      </S.Container>
    </div>
  );
};

export default Teams;

const S = {
  Container: styled.div`
    padding: 10px;
    border: 1px solid red;
  `,
  Box: styled.div`
    padding: 10px;
    background-color: aqua;
  `,
};
