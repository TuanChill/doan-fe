import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";


export const sendContact = async (data: any) => {
    const response = await fdAxios.post(API_ROUTES.SEND_CONTACT, data);
    return response.data;
};