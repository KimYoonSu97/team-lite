import React, { useEffect } from "react";
import { publicAxios } from "../../api/axios";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useNavigate } from "react-router";
import logoLine from "../../assets/logo-line.png";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

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
  const navigateToSignIn = () => {
    navigate("/signIn");
  };
  return (
    <div className="flex w-full h-dvh">
      <div className="flex flex-col w-full justify-center">
        <form name="login" onSubmit={onSubmit} className="pl-30">
          <p className="text-h1 text-brand-primary mb-6">
            로그인 후 사용 가능합니다.
          </p>
          <div className="w-50 border-b border-solid border-brand-primary mb-3">
            <input
              placeholder="아이디"
              type="text"
              name="email"
              className="block pt-1 pb-1 w-full"
            />
          </div>
          <div className="w-50 border-b border-solid border-brand-primary mb-8">
            <input
              placeholder="비밀번호"
              type="password"
              name="password"
              className="block pt-1 pb-1 w-full"
            />
          </div>
          <div className="flex gap-8">
            <button
              type="submit"
              className="text-body-m text-brand-primary block"
            >
              로그인
            </button>
            <button
              onClick={navigateToSignIn}
              className="text-body-m text-text-sub block"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      <div className="w-full bg-brand-primary flex flex-col justify-center items-center">
        <div>
          <img src={logoLine} alt="logo-line" className="w-120" />
        </div>
      </div>
    </div>
  );
};

export default Login;
