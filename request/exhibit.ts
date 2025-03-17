import { API_ROUTES } from "@/const/api";
import { fdAxios } from "@/components/config/axios.config";


export const getExhibit = async (id: number) => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}/${id}`);
    return response.data;
};

export const getExhibitList = async () => {
    const response = await fdAxios.get(API_ROUTES.EXHIBIT);
    return response.data;
};

export const getCategoryArtifact = async () => {
    const response = await fdAxios.get(API_ROUTES.CATEGORY_ARTIFACT);
    return response.data;
};