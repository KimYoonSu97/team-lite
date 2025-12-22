import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { publicAxios } from "../../api/axios";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
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
    <div>
      <form name="signUp" id="signUp" onSubmit={onSubmit}>
        <div>
          <p>이메일</p>
          <TextInput
            type="text"
            name="email"
            form="signUp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>비밀번호</p>
          <TextInput type="password" name="password" form="signUp" />
        </div>
        <div>
          <p>닉네임</p>
          <TextInput type="text" name="nickname" form="signUp" />
          <Button name="회원가입" />
        </div>
      </form>
      <Button name="이메일 중복 확인" onClick={onClickCheckEmail} />
    </div>
  );
};

export default SignIn;
