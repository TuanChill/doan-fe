import crypto from 'crypto';
import axios from 'axios';

// Cấu hình MoMo
interface MomoConfig {
  partnerCode: string;
  accessKey: string;
  secretKey: string;
  endpoint: string;
  redirectUrl: string;
  ipnUrl: string; // Instant Payment Notification URL
}

// Thông tin hóa đơn
interface OrderInfo {
  orderId: string;
  amount: number;
  orderInfo: string;
  extraData?: string;
  requestId: string;
  requestType: string;
}

const momoConfig: MomoConfig = {
  partnerCode: process.env.MOMO_PARTNER_CODE || '',
  accessKey: process.env.MOMO_ACCESS_KEY || '',
  secretKey: process.env.MOMO_SECRET_KEY || '',
  endpoint: process.env.MOMO_ENDPOINT || 'https://test-payment.momo.vn/v2/gateway/api/create',
  redirectUrl: process.env.MOMO_REDIRECT_URL || 'http://localhost:3000/payment/result',
  ipnUrl: process.env.MOMO_IPN_URL || 'http://localhost:3000/api/payment/momo/ipn'
};

// Hàm tạo chữ ký số cho MoMo
const createSignature = (rawSignature: string): string => {
  return crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(rawSignature)
    .digest('hex');
};

// Hàm tạo yêu cầu thanh toán MoMo
export const createMomoPayment = async (orderInfo: OrderInfo) => {
  const { orderId, amount, orderInfo: info, extraData, requestId, requestType } = orderInfo;

  const rawSignature = 
    `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData || ''}&ipnUrl=${momoConfig.ipnUrl}&orderId=${orderId}&orderInfo=${info}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = createSignature(rawSignature);

  const requestBody = {
    partnerCode: momoConfig.partnerCode,
    accessKey: momoConfig.accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: info,
    redirectUrl: momoConfig.redirectUrl,
    ipnUrl: momoConfig.ipnUrl,
    extraData: extraData || '',
    requestType: requestType,
    signature: signature,
    lang: 'vi'
  };

  try {
    const response = await axios.post(momoConfig.endpoint, requestBody);
    return response.data;
  } catch (error) {
    console.error('MoMo payment error:', error);
    throw error;
  }
};

// Hàm xác thực callback từ MoMo
export const verifyMomoSignature = (
  requestBody: any
): boolean => {
  const { accessKey, amount, extraData, ipnUrl, orderId, orderInfo, orderType, partnerCode, payType, requestId, responseTime, resultCode, transId } = requestBody;

  const secretKey = momoConfig.secretKey;
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

  const computedSignature = createSignature(rawSignature);
  return computedSignature === requestBody.signature;
}; 