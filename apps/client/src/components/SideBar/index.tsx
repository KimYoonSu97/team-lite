import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import Button from "../Button";

const Index = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        name={"로그아웃"}
      />
    </div>
  );
};

export default Index;
