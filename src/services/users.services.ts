import myAxios from ".";
import { SuccessResponse, User } from "../types";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await myAxios.get<SuccessResponse<User[]>>("/users");
    return response.data.data;
  },
};
