import { useNavigate } from "react-router-dom"
import { PATHS } from "./CommonUtil";

function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = (error, jobDescription) => {
    if (error?.status === 403 || error.status === 401 || error?.response?.status === 403 || error?.response?.status === 401) {
      navigate(PATHS.SIGN_IN);
    } else {
      navigate(PATHS.ERROR, {
        state: {
          action: jobDescription,
          code: error.code,
          message: error.message,
          stack: error.stack
        }
      });
    }
  }

  return handleError;
}

export default useErrorHandler;