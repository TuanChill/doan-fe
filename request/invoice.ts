import { fdAxios } from "@/components/config/axios.config";
import { API_ROUTES } from "@/const/api";
import qs from "qs";

export const getInvoiceByTransId = async (transId: string) => {
  const res = await fdAxios.get(
    `${API_ROUTES.INVOICE}?filters[transId][$eq]=${transId}&populate[invoice_details][populate]=ticket`
  );
  return res.data;
};

enum InvoiceStatus {
  EXPIRED = "EXPIRED",
  UNEXPIRED = "UNEXPIRED",
}

export const getAllInvoice = async (userId: string, page: number, pageSize: number, status?: InvoiceStatus) => {
  let params = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
    populate: '*',
    filters: {
      users_permissions_user: {
        id: {
          $eq: userId,
        },
      },
    },
    sort: ['createdAt:desc']
  });

  if(status === InvoiceStatus.EXPIRED) {
    params += '&filters[invoice_detail][validDate][$eq]=EXPIRED';
  } else if(status === InvoiceStatus.UNEXPIRED) {
    params += '&filters[status][$eq]=UNEXPIRED';
  }

  const res = await fdAxios.get(`${API_ROUTES.INVOICE}?${params}`);
  return res.data;
}