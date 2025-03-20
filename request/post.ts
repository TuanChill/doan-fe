import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";

export const getPostList = async ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => {
    const response = await fdAxios.get(`${API_ROUTES.POST}?populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}`);
    return response.data;
};

export const getPostDetail = async (id: string) => {
    const response = await fdAxios.get(`${API_ROUTES.POST}/${id}?populate=*`);
    return response.data;
};

export const getPostByCategory = async (category: string) => {
    const response = await fdAxios.get(`${API_ROUTES.POST}?category=${category}`);
    return response.data;
};

