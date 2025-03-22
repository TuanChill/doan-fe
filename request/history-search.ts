import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";
import qs from "qs";

export const getHistorySearch = async (userId: string, page: number, pageSize: number) => {

  const params = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
    sort: "createdAt:desc",
    populate: 'users_permissions_user',
    filters: {
      users_permissions_user: {
        id: {
          $eq: userId,
        },
      },
    },
  });

  const res = await fdAxios.get(
    `${API_ROUTES.HISTORY_SEARCH}?${params}`
  );
  return res.data;
};

export const createHistorySearch = async (userId: string, keyword: string) => {
  const res = await fdAxios.post(
    `${API_ROUTES.HISTORY_SEARCH}`,
    {
      data: {
        search: keyword,
        users_permissions_user: userId,
      },
    }
  );
  return res.data;
};
