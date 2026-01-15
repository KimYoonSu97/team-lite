import { redirect } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";

export const protectedLoader = async () => {
  const { accessToken, isLoggedIn } = useAuthStore.getState();
  if (!accessToken || !isLoggedIn) {
    return redirect("/login");
    // return null;
  }
  return null;
};
