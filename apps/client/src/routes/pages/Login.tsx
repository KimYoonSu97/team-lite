import { useEffect } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useNavigate } from "react-router";
import googleIcon from "../../assets/svg/google.svg";
import githubIcon from "../../assets/svg/github.svg";
import logo from "../../assets/logo-color.png";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="flex w-full h-dvh justify-center items-center">
      <div className="flex flex-col justify-between items-center max-w-[420px]">
        <div
          className={
            "w-[420px] h-[80px] flex flex-col justify-center items-center"
          }
        >
          <img
            src={logo}
            alt="로고"
            width={260}
            height={80}
            className={"contain-layout"}
          />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center mt-7">
          <h1 className="typo-4xl whitespace-pre-wrap text-center text-text-1 ">
            {"간편로그인으로\n서비스를 바로 이용하세요"}
          </h1>
          <p className="typo-xl text-text-4 ">3초만에 빠른 회원가입</p>
        </div>
        <div className={"mt-16 w-full flex flex-col gap-4"}>
          <div
            className={
              "w-full rounded-[8px] border border-line-3 pb-[18px] pt-[18px] pl-5 pr-5 flex justify-between items-center cursor-pointer"
            }
            onClick={() => {
              window.location.href = "/api/auth/google";
            }}
          >
            <img src={googleIcon} width={20} height={20} alt="google" />
            <p className="typo-base text-text-1 typo-medium">
              Google로 시작하기
            </p>
            <div className={"w-[20px] h-[20px]"}></div>
          </div>
          <div
            className={
              "w-full rounded-[8px] border border-line-3 pb-[18px] pt-[18px] pl-5 pr-5 flex justify-between items-center cursor-pointer bg-black "
            }
            onClick={() => {
              window.location.href = `/api/auth/github`;
            }}
          >
            <img src={githubIcon} width={20} height={20} alt="github" />
            <p className="typo-base text-white typo-medium">
              Github으로 시작하기
            </p>
            <div className={"w-[20px] h-[20px]"}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
