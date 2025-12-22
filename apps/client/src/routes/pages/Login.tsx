import React, { useEffect } from "react";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { publicAxios } from "../../api/axios";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useNavigate } from "react-router";

const Login = () => {
  const { login, accessToken, user } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await publicAxios.post("/auth/login", { email, password });

    if (res.status === 201) {
      login(res.data.accessToken, res.data.user, true);
      navigate("/");
    }
  };
  return (
    <div>
      <form name="login" method="post" onSubmit={onSubmit}>
        <TextInput placeholder="아이디" type="text" name="email" />
        <TextInput placeholder="비밀번호" type="password" name="password" />
        <Button name="로그인하기" />
      </form>
    </div>
  );
};

export default Login;
