import { redirect } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";

export const protectedLoader = async () => {
  const { accessToken, isLoggedIn } = useAuthStore.getState();
  console.log(accessToken, isLoggedIn);
  if (!accessToken || !isLoggedIn) {
    return redirect("/login");
  }
  return null;
};
