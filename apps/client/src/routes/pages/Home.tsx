import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth/useAuthStore";
import styled from "styled-components";
import Button from "../../components/Button";
import { authAxios } from "../../api/axios";
import TextInput from "../../components/TextInput";
import { useNavigate } from "react-router";
import type { ITeam } from "@teamlite/types";

const Home = () => {
  const { user } = useAuthStore();
  const navigation = useNavigate();
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
};
