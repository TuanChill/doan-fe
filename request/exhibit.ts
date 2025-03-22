import { API_ROUTES } from "@/const/api";
import { fdAxios } from "@/components/config/axios.config";
import { assign, get } from "lodash";


export const getExhibit = async (id: string) => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}/${id}?populate=*`);
    return response.data;
};

export const getExhibitList = async (page: number, limit: number, category_artifact?: string[]) => {
    const params = {
        pagination: {
            page: page,
            pageSize: limit
        },
        populate: '*',
    };
    if (get(category_artifact, "length", 0) > 0) {
        assign(params, {
            filters: {
                category_artifact: {
                    $in: category_artifact
                }
            }
        });
    }


    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}`, { params });
    return response.data;
};

export const getCategoryArtifact = async () => {
    const response = await fdAxios.get(API_ROUTES.CATEGORY_ARTIFACT);
    return response.data;
};

export const getFeaturedArtifact = async (page: number = 1, limit: number = 3) => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}?populate=*&filters[isFeatured][$eq]=true&pagination[page]=${page}&pagination[pageSize]=${limit}`);
    return response.data;
};

export const getCountExhibit = async () => {
    const response = await fdAxios.get(`${API_ROUTES.EXHIBIT}?pagination[withCount]=true&pagination[pageSize]=1`);
    return response.data;
};
