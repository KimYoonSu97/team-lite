import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { authAxios } from "../../api/axios";
import useModal from "../../hooks/useModal";
import TextInput from "../../components/TextInput";
import dayjs from "dayjs";
import TaskCard from "../../components/TaskCard";
import {
  getAllTaskListByProjectId,
  getMyTaskListByProjectId,
  getProjectDetail,
  getTeamMembers,
} from "../../api";

const Projects = () => {
  const { projectId } = useParams();
  const addTaskModal = useModal();
  const projectDetail = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: () => getProjectDetail(projectId!),
  });
  const myTaskList = useQuery({
    queryKey: ["myTaskList", projectId],
    queryFn: () => getMyTaskListByProjectId(projectId!),
  });

  const taskList = useQuery({
    queryKey: ["taskList", projectId],
    queryFn: () => getAllTaskListByProjectId(projectId!),
  });

  return (
    <div>
      <div>Projects {projectId}</div>
      <button onClick={addTaskModal.openModal}>할일 추가</button>
      {addTaskModal.isModalOpen &&
        addTaskModal.modal(
          <AddTaskModal closeModal={addTaskModal.closeModal} />
        )}
      <div>
        <p> project name</p>
        {projectDetail.data?.title}
      </div>
      <S.Container>
        <p>내할일</p>
        <div>
          {myTaskList.data?.map((task: any) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </S.Container>
      <S.Container>
        <p>팀 할일</p>
        <div>
          {taskList.data?.map((task: any) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </S.Container>
    </div>
  );
};

export default Projects;

const AddTaskModal = ({ closeModal }: { closeModal: () => void }) => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(
    dayjs().add(1, "month").format("YYYY-MM-DD")
  );
  const [priority, setPriority] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const queryClient = useQueryClient();
  const memberList = useQuery({
    queryKey: ["teamDetail", params.teamId, "memberList"],
    queryFn: () => getTeamMembers(params.teamId!),
  });
  const addTask = async () => {
    await authAxios.post(`/tasks/${params.projectId}`, {
      title,
      content,
      description,
      deadLine: dayjs(deadline).toISOString(),
      priority,
      assigneeId,
    });
    queryClient.invalidateQueries({
      queryKey: ["myTaskList", params.projectId],
    });
    alert("할일이 추가되었습니다.");
    closeModal();
  };
  return (
    <Modal.Container>
      <p>할일추가</p>
      <p>이름</p>
      <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <p>내용</p>
      <TextInput value={content} onChange={(e) => setContent(e.target.value)} />
      <p>설명</p>
      <TextInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>담당자</p>
      <select
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
      >
        {memberList.data?.map((member: any) => {
          return (
            <option key={member.id} value={member.id}>
              {member.nickname}
            </option>
          );
        })}
      </select>
      <p>우선순위</p>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {["1", "2", "3", "4", "5"].map((member: any) => {
          return (
            <option key={member.id} value={member.id}>
              {member}
            </option>
          );
        })}
      </select>
      <p>{deadline}</p>
      <button onClick={addTask}>추가</button>
      <button onClick={closeModal}>닫기</button>
    </Modal.Container>
  );
};

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

const Modal = {
  Container: styled.div`
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  `,
};
