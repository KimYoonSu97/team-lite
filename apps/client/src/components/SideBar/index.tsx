import { useNavigate, useLocation } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import Button from "../Button";
import styled from "styled-components";
import logoColor from "../../assets/logo-color.png";

const Index = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col gap-15 p-8">
      <div>
        <img src={logoColor} alt="logo-color" />
      </div>
      <div className="flex flex-col gap-4 items-start">
        <button
          onClick={() => {
            alert("채팅기능은 준비중입니다.");
          }}
          className="text-h3 text-text-sub block"
        >
          채팅
        </button>
        <button
          className="text-h3 text-brand-primary block"
          onClick={() => {
            navigate("/");
          }}
        >
          홈화면
        </button>
        <button
          className="text-h3 text-text-sub block"
          onClick={() => {
            navigate("/projects");
          }}
        >
          내 프로젝트
        </button>
        <button
          className="text-h3 text-text-sub block"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Index;

const S = {
  Container: styled.div`
    padding: 20px 0;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
  `,
};
