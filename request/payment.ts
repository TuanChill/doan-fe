import { fdAxios } from "@/components/config/axios.config";

export const createVNPayURLPayment = async (data: any) => {
  const res = await fdAxios.post("/buy-ticket/create-payment-url", data);
  return res.data;
};
