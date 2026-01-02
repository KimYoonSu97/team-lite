import React, { useEffect, useState } from "react";
import { publicAxios } from "../../api/axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";
import logoLine from "../../assets/logo-line.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const nickname = formData.get("nickname");
    const res = await publicAxios.post("/users", { email, password, nickname });
    if (res.data.id) {
      alert("회원가입 성공! 로그인해주세요");
      navigate("/login");
    }
  };

  const onClickCheckEmail = async () => {
    const res = await publicAxios.post("/users/check-email", { email });
    if (res.data.isAvailable) {
      alert("사용 가능한 이메일입니다.");
    } else {
      alert("이미 사용 중인 이메일입니다.");
    }
  };

  return (
    <div className="flex w-full h-dvh">
      <div className="flex flex-col w-full justify-center">
        <form name="signUp" id="signUp" onSubmit={onSubmit} className="pl-30">
          <p className="text-h1 text-brand-primary mb-8">회원이 되어보세요.</p>
          <div className="flex flex-col gap-5">
            <div className="w-70">
              <input
                type="text"
                name="nickname"
                form="signUp"
                placeholder="닉네임"
                className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
              />
            </div>
            <div className="w-70 flex gap-3 items-end">
              <input
                type="text"
                name="email"
                form="signUp"
                placeholder="이메일"
                value={email}
                className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-1.5 text-caption text-text-inverse bg-text-sub hover:bg-text-default rounded transition-colors duration-200 whitespace-nowrap"
                onClick={onClickCheckEmail}
              >
                중복 확인
              </button>
            </div>
            <div className="w-70">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                form="signUp"
                className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
              />
            </div>
            <div className="w-70 mb-4">
              <input
                type="password"
                name="password"
                placeholder="비밀번호 확인"
                form="signUp"
                className="block pt-2 pb-2 w-full border-b-2 border-border-default focus:border-brand-primary focus:outline-none transition-colors duration-200 placeholder:text-text-sub"
              />
            </div>
          </div>

          <div>
            <button
              className="px-8 py-3 bg-brand-primary text-text-inverse rounded-lg hover:bg-brand-primaryHover transition-all duration-200 text-body-m-bold"
              type="submit"
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

export default SignIn;
