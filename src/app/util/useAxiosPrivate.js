import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import useRefreshToken from "./useRefreshToken";
import { useAuthStore } from "./store";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const authData = useAuthStore((state) => state.authData);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authData?.accessToken}`
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responesInterceptor = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest =  error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responesInterceptor);
    }
  }, [authData, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;