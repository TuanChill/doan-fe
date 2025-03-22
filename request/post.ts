import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";
import qs from "qs";
export const getPostList = async ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => {
    const params = qs.stringify({
        populate: '*',
        pagination: {
            page,
            pageSize: limit
        },
        order: ['createdAt:desc']
    });

    const response = await fdAxios.get(`${API_ROUTES.POST}?${params}`);
    return response.data;
};


export const getPostDetail = async (id: string) => {
    const response = await fdAxios.get(`${API_ROUTES.POST}/${id}?populate=*`);
    return response.data;
};

export const getPostByCategory = async (page: number, limit: number, category?: string) => {
    let params = qs.stringify({
        populate: '*',
        pagination: {
            page,
            pageSize: limit
        },
        order: ['createdAt:desc', 'view:desc']
    });

    if (category) {
        params += `&filters[category][$in]=${category}`;
    }

    const response = await fdAxios.get(`${API_ROUTES.POST}?${params}`);
    return response.data;
};

export const getPostHighlight = async (page: number, limit: number) => {
    const response = await fdAxios.get(`${API_ROUTES.POST}?isHighlight=true&pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`);
    return response.data;
};

export const getPostUpcomingEvents = async (page: number, limit: number) => {
    const params = qs.stringify({
        filters: {
            date: {
                $gte: new Date()
            }
        },
        pagination: {
            page,
            pageSize: limit
        },
        populate: '*'
    });
    const response = await fdAxios.get(`${API_ROUTES.POST}?${params}`);
    return response.data;
};


export const getPostCategory = async () => {
    const response = await fdAxios.get(`${API_ROUTES.CATEGORY}`);
    return response.data;
};

export const getCountPost = async () => {
    const response = await fdAxios.get(`${API_ROUTES.POST}?pagination[withCount]=true&pagination[pageSize]=1`);
    return response.data;
};
