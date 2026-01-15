import React, { useEffect } from "react";
import { publicAxios } from "../../api/axios";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useNavigate } from "react-router";
import logoLine from "../../assets/logo-line.png";
import type { ILoginDto } from "@teamlite/types";
import { loginSchema } from "@teamlite/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const loginHookForm = useForm<ILoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmitLogin = async (data: ILoginDto) => {
    const res = await publicAxios.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (res.status === 201) {
      login(res.data.accessToken, res.data.user, true);
      navigate("/");
    }
  };

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const navigateToSignIn = () => {
    navigate("/signIn");
  };
  return (
    <div className="flex w-full h-dvh justify-center items-center">
      <div className="flex flex-col justify-between items-center max-w-[420px]">
        <div className={"w-[260px] h-[80px] bg-blue-100"}>로고</div>
        <div className="flex flex-col gap-3 justify-center items-center mt-7">
          <h1 className="text-h1">간편로그인으로 서비스를 바로 이용하세요</h1>
          <p>3초만에 빠른 회원가입</p>
        </div>
        <div className={"mt-7 w-full flex flex-col gap-2"}>
          <button className={"w-full bg-amber-400 p-5"}>
            <a href={`/api/auth/github`}>깃허브로 로그인하기</a>
          </button>
          <button className={"w-full bg-amber-400 p-5"}>
            <a href={`/api/auth/google`}>구글로 로그인하기</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
