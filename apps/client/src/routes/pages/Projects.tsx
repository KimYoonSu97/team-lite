import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { authAxios } from "../../api/axios";

const Projects = () => {
  const { projectId } = useParams();
  const projectDetail = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => {
      const res = await authAxios.get(`/projects/${projectId}`);
      return res.data;
    },
  });
  const myTaskList = useQuery({
    queryKey: ["myTaskList", projectId],
    queryFn: async () => {
      const res = await authAxios.get(`/tasks/${projectId}`);
      return res.data;
    },
  });

  return (
    <div>
      <div>Projects {projectId}</div>
      <div>
        <p> project name</p>
        {projectDetail.data?.title}
      </div>
      <S.Container>
        <p>내할일</p>
        <div>
          {myTaskList.data?.map((task: any) => {
            return (
              <S.Box key={task.id}>
                <p>{task.title}</p>
              </S.Box>
            );
          })}
        </div>
      </S.Container>
    </div>
  );
};

export default Projects;

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
