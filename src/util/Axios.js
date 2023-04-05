import axios from "axios";
import { setLogout } from "./Auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export const webClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;

/**
 * Handle Axios Errors And Return Error Message
 * @param {*} error
 * @returns error message
 */
export function axiosError(error) {
  if (error.code === "ERR_NETWORK") {
    return { message: "Internal Server Error" };
  }
  if (error.response.status === 500) {
    return { message: "Internal Server Error" };
  }
  if (error.response.status === 422) {
    return error.response.data.errors;
  }
  if (error.response.status === 401) {
    setLogout();
    window.location.replace("/auth/login/401");
  }

  return "Somthings wrong try again later.";
}
