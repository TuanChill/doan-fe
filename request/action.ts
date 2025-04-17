import { fdAxios } from "@/components/config/axios.config"
import { API_ROUTES } from "@/const/api";

export const getUserPointsHistory = async (userId: number) => {
    const params = {
        filters: {
            users_permissions_user: {
              id: {
                $eq: userId,
              },
            },
        },
        pagination: {
            page: 1,
            pageSize: 10,
        },
        sort:["createdAt:desc"],
    }

    const res = await fdAxios.get(API_ROUTES.ACTIVITY_POINTS, { params });
    return res.data;
}

export const getUserPointsHistoryUsed = async (userId: number) => {
    const params = {
        pagination: {
            page: 1,
            pageSize: 10,
        },
        filters: {
            point: {
                $lt: 0,
            },
            users_permissions_user: {
                id: {
                  $eq: userId,
                },
              },
        },
        sort:["createdAt:desc"],
    }

    const res = await fdAxios.get(API_ROUTES.ACTIVITY_POINTS, { params });
    return res.data;
}