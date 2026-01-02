import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { authAxios } from "../../api/axios";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import type { IUser } from "@teamlite/types";
import { useState } from "react";
import TextInput from "../../components/TextInput";
import { getProjectList, getTeamDetail, getTeamMembers } from "../../api";
import ProjectCard from "../../components/ProjectCard";

const projectSortControllerSelectList = [
  {
    name: "할일 많은 순",
    value: "taskCount",
  },
  {
    name: "가나다 순",
    value: "name",
  },
  {
    name: "최신 순",
    value: "createdAt",
  },
];

const Teams = () => {
  const { teamId } = useParams();
  const navigation = useNavigate();
  const addMemberModal = useModal();
  const addProjectModal = useModal();
  const [projectSortController, setProjectSortController] = useState(
    projectSortControllerSelectList[0]
  );
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });
  const teamProjectList = useQuery({
    queryKey: ["teamDetail", teamId, "projectList"],
    queryFn: () => getProjectList(teamId!),
  });
  const teamMemberList = useQuery({
    queryKey: ["teamDetail", teamId, "memberList"],
    queryFn: () => getTeamMembers(teamId!),
  });

  return (
    <div className="pt-15">
      {addMemberModal.isModalOpen &&
        addMemberModal.modal(
          <AddMemberModal onClose={addMemberModal.closeModal} />
        )}
      {addProjectModal.isModalOpen &&
        addProjectModal.modal(
          <AddProjectModal onClose={addProjectModal.closeModal} />
        )}
      {/* <div>
        <button onClick={addMemberModal.openModal}>멤버 추가</button>
      </div> */}
      {/* <div>
        <button onClick={addProjectModal.openModal}>프로젝트 추가</button>
      </div> */}
      <div className="text-h2 text-text-default pl-12">
        {teamDetail.data?.name} 팀 페이지입니다.
      </div>
      <div className="flex flex-col gap-2 mt-7">
        <div className="pl-12">
          <p className="text-h2 text-brand-primary">프로젝트</p>{" "}
        </div>
        <div className="pl-12">
          {projectSortControllerSelectList.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => setProjectSortController(item)}
                className={`${projectSortController.value === item.value ? "text-brand-primary text-body-m-bold" : "text-text-sub text-body-m"} `}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-scroll pl-12 pb-4">
        <div className="mt-4 flex gap-4">
          {teamProjectList.data?.map((project: any) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>

      {/* <S.Container>
        <p>멤버 리스트</p>
        <div>
          {teamMemberList.data?.map((member: any) => {
            return (
              <S.Box key={member.id} onClick={() => {}}>
                {member.nickname}
              </S.Box>
            );
          })}
        </div>
      </S.Container> */}
    </div>
  );
};

export default Teams;

const AddMemberModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<IUser | null>(null);

  const searchMember = async () => {
    const res = await authAxios.get(`/users?email=${searchString}`);
    setSearchResult(res.data);
  };

  const addMember = async () => {
    await authAxios.post("/teams/add-members", {
      teamId: param.teamId,
      members: [searchResult?.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["teamDetail", param.teamId, "memberList"],
    });
    alert("멤버 추가 성공");
    setSearchString("");
    setSearchResult(null);
  };

  return (
    <Modal.Container>
      <p>멤버 검색</p>

      <TextInput
        name="search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button onClick={searchMember}>검색</button>
      <p>검색 결과</p>
      <div>
        {searchResult && (
          <div>
            <p>{searchResult.nickname}</p>
            <p>{searchResult.email}</p>
            <button onClick={addMember}>해당멤버 추가하기</button>
          </div>
        )}
      </div>
      <button onClick={onClose}>닫기</button>
    </Modal.Container>
  );
};

const AddProjectModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const params = useParams();
  const addProject = async () => {
    await authAxios.post(`/projects/${params.teamId}`, {
      name,
      description,
    });
    alert("프로젝트 추가 성공");
    queryClient.invalidateQueries({
      queryKey: ["teamDetail", params.teamId, "projectList"],
    });
    onClose();
  };
  return (
    <Modal.Container>
      <p>프로젝트 추가</p>
      <p>이름</p>
      <TextInput
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <p>설명</p>
      <TextInput
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button onClick={addProject}>추가</button>

      <button onClick={onClose}>닫기</button>
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
