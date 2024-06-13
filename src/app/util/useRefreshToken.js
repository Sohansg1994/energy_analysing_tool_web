import { useAuthStore } from "../util/store";
import { REFRESH_TOKEN_KEY } from "./CommonUtil";
import { axiosRefresh } from "./axios";

const useRefreshToken = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  return async () => {
    return await axiosRefresh.get("/user/token").then((response) => {
      setAuthData(response?.data?.data[0]);
      localStorage.setItem(REFRESH_TOKEN_KEY, response?.data?.data[0].refreshToken);
      return response?.data?.data[0].accessToken;
    }).catch((error) => {
      return "empty";
    })
  };
}

export default useRefreshToken;