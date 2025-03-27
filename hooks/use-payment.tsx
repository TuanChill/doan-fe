export const usePayment = () => {
  const createVNPayPayment = async (price: number, tickets: number) => {
    const date = new Date();
    const tmnCode = process.env.VNPAY_TMN_CODE;
    const hashSecret = process.env.VNPAY_HASH_SECRET;
    const orderInfo = `Thanh toán vé tham quan bảo tàng - ${tickets} vé`;
    const amount = price;
  };

  return {};
};
