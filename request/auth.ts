import { API_ROUTES } from "@/const/api";
import axios from "axios";


export const login = async (identifier: string, password: string) => {
  const response = await axios.post(API_ROUTES.LOGIN, { identifier, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(API_ROUTES.REGISTER, { username, email, password });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(API_ROUTES.FORGOT_PASSWORD, { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
) => {
  const response = await axios.post(API_ROUTES.RESET_PASSWORD, {
    token,
    password,
  });
  return response.data;
};

