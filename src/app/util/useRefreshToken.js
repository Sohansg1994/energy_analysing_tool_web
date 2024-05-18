import { useAuthStore } from "../util/store";
import { axiosPublic } from "./axios";

const useRefreshToken = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  return async () => {
    const response = await axiosPublic.get("/user/token");
    setAuthData(response?.data?.data[0]);
    return response?.data?.data[0].accessToken;
  };
}

export default useRefreshToken;