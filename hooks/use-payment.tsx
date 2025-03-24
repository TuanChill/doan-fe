export const usePayment = () => {
  const handlePaymentWithVNPay = async (orderId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/payment/vnpay`,
      {
        method: "POST",
        body: JSON.stringify({ orderId }),
      }
    );
  };

  return {};
};
