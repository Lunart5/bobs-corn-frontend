import myAxios from ".";
import { Purchase, SuccessResponse } from "../types";

export const purchaseService = {
  postPucharse: async () => {
    const response = await myAxios.post<SuccessResponse<Purchase>>("/purchases");
    return response.data.data;
  },

  getMyPurchases: async (): Promise<Purchase[]> => {
    const response = await myAxios.get<SuccessResponse<Purchase[]>>("purchases/me");
    return response.data.data;
  },

  getUserPurchases: async (userId: number): Promise<Purchase[]> => {
    const response = await myAxios.get<SuccessResponse<Purchase[]>>(
      `/purchases/user/${userId}`
    );
    return response.data.data;
  },
};
