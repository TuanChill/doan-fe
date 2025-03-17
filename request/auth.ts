import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";


export const login = async (identifier: string, password: string) => {
  const response = await fdAxios.post(API_ROUTES.LOGIN, { identifier, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await fdAxios.post(API_ROUTES.REGISTER, { username, email, password });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await fdAxios.post(API_ROUTES.FORGOT_PASSWORD, { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
) => {
  const response = await fdAxios.post(API_ROUTES.RESET_PASSWORD, {
    token,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await fdAxios.get(API_ROUTES.ME);
  return response.data;
};

export const updateUser = async (id: number, data: any) => {
  const response = await fdAxios.put(`${API_ROUTES.USERS}/${id}`, data);
  return response.data;
};
