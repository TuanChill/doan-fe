import { API_ROUTES } from "@/const/api";
import { fdAxios } from "@/components/config/axios.config";


export const getExhibit = async (id: string) => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}/${id}?populate=*`);
    return response.data;
};

export const getExhibitList = async (page: number, limit: number) => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`);
    return response.data;
};

export const getCategoryArtifact = async () => {
    const response = await fdAxios.get(API_ROUTES.CATEGORY_ARTIFACT);
    return response.data;
};