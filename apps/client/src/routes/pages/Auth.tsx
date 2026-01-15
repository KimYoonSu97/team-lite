import React, { useEffect } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router";
import { publicAxios } from "../../api/axios";
import { useAuthStore } from "../../store/auth/useAuthStore";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const userStore = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await publicAxios
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data);

      userStore.login(accessToken as string, user, true);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (!accessToken) {
    return <div>Error</div>;
  }

  return <div>Auth</div>;
};

export default Auth;
