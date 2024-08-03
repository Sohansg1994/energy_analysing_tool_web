import axios from "axios";
import { REFRESH_TOKEN_KEY } from "./CommonUtil";

// const BASE_URL = "http://3.7.61.251:8080";
const BASE_URL = "http://localhost:8080";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const axiosRefresh = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem(REFRESH_TOKEN_KEY)
  }
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})