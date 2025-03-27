import { fdAxios } from "@/components/config/axios.config";

export const getTicket = async (invoiceDetailId: string) => {
  const res = await fdAxios.post(`/buy-ticket/get-qr-code-ticket`, {
    invoiceDetailId,
  });
  return res.data;
};

