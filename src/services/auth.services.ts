import myAxios from ".";
import {
  AuthResponse,
  LoginData,
  RegisterData,
  SuccessResponse,
} from "../types/";

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await myAxios.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await myAxios.post<SuccessResponse<AuthResponse>>(
      "auth/login",
      data
    );
    return response.data.data;
  },
};
