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
    <div className="flex w-full h-dvh">
      <div className="flex flex-col w-full justify-center">
        <form
          name="login"
          onSubmit={loginHookForm.handleSubmit(onSubmitLogin)}
          className="pl-30"
        >
          <p className="text-h1 text-brand-primary mb-8">
            로그인 후 사용 가능합니다.
          </p>
          <div className="w-70 mb-6">
            <input
              {...loginHookForm.register("email")}
              placeholder="이메일"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <p>{loginHookForm.formState.errors.email?.message}</p>
          </div>
          <div className="w-70 mb-10">
            <input
              {...loginHookForm.register("password")}
              placeholder="비밀번호"
              type="password"
              className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
            />
            <p>{loginHookForm.formState.errors.password?.message}</p>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-3 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold"
            >
              로그인
            </button>
            <button
              onClick={navigateToSignIn}
              className="px-8 py-3 text-text-sub hover:text-text-default transition-colors duration-200 text-body-m"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      <div className="w-full bg-linear-to-br from-brand-primary to-brand-primaryHover flex flex-col justify-center items-center">
        <div>
          <img src={logoLine} alt="logo-line" className="w-120" />
        </div>
      </div>
    </div>
  );
};

export default Login;
