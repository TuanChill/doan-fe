import { NextRequest, NextResponse } from 'next/server';
import { createMomoPayment } from '@/lib/momo';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, orderInfo, orderId } = body;
    
    if (!amount || !orderInfo) {
      return NextResponse.json(
        { error: 'Thiếu thông tin thanh toán' },
        { status: 400 }
      );
    }

    const requestId = uuidv4();
    const payment = await createMomoPayment({
      orderId: orderId || `order_${Date.now()}`,
      amount: amount,
      orderInfo: orderInfo,
      requestId: requestId,
      requestType: 'captureWallet',
      extraData: ''
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Không thể tạo yêu cầu thanh toán' },
      { status: 500 }
    );
  }
} 