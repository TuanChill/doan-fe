import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";

export const getInvoiceByTransId = async (transId: string) => {
  const res = await fdAxios.get(
    `${API_ROUTES.INVOICE}?filters[transId][$eq]=${transId}&populate[invoice_details][populate]=ticket`
  );
  return res.data;
};
