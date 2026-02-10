import { authAxios } from "../axios";

export const searchUserByEmail = async (email: string) => {
  const res = await authAxios.get(`/users?email=${email}`);
  console.log(res);
  return res.data;
};
