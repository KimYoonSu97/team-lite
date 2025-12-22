import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/useAuthStore";
import styled from "styled-components";
import Button from "../../components/Button";
import { authAxios } from "../../api/axios";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router";
import type { ITeam } from "@teamlite/types";
import Modal from "../../components/Modal";
import { useState } from "react";
import { createPortal } from "react-dom";

const Home = () => {
  const { user } = useAuthStore();
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const teamList = useQuery({
    queryKey: ["teamList"],
    queryFn: async () => {
      const res = await authAxios.get("/teams");

      return res.data;
    },
  });

  return (
    <div>
      <div>반갑습니다. {user?.nickname}님</div>
      <Button
        name="add team modal open"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      {isModalOpen &&
        createPortal(
          <Modal
            onClose={() => {
              setIsModalOpen(false);
            }}
            item={<AddTeamModal onClose={() => setIsModalOpen(false)} />}
          />,
          document.getElementById("modal")!
        )}

      <S.Container>
        <p>task list</p>
        <div></div>
      </S.Container>
      <S.Container>
        <p>team list</p>
        <div></div>
      </S.Container>
      <S.Container>
        <p>my own team</p>
        <div>
          {teamList.data?.map((team: ITeam) => (
            <S.TeamCard
              key={team.id}
              onClick={() => {
                navigation(`/teams/${team.id}`);
              }}
            >
              {team.name}
            </S.TeamCard>
          ))}
        </div>
      </S.Container>
      <S.Container>
        <p>난중에 모달처리해야함</p>
        <form>
          <TextInput name="name" />
          <Button name="add team" />
        </form>
      </S.Container>
    </div>
  );
};

export default Home;

const AddTeamModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <S.AddTeamModalContainer onClick={(e) => e.stopPropagation()}>
      <p>add team modal</p>
      <div>dfnlaksdnfklnsk</div>
      <TextInput name="name" />
      <TextInput name="description" />
      <button onClick={() => {}}>add</button>
      <button onClick={onClose}>close</button>
    </S.AddTeamModalContainer>
  );
};

const S = {
  Container: styled.div`
    padding: 10px;
    border: 1px solid red;
  `,
  TeamCard: styled.div`
    padding: 10px;
    background-color: aqua;
    border-radius: 10px;
  `,
  AddTeamModalContainer: styled.div`
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  `,
};
