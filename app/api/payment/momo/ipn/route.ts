import { NextRequest, NextResponse } from 'next/server';
import { verifyMomoSignature } from '@/lib/momo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Xác thực chữ ký từ MoMo
    const isValidSignature = verifyMomoSignature(body);
    
    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Kiểm tra kết quả thanh toán
    if (body.resultCode === 0) {
      // Thanh toán thành công, cập nhật trạng thái đơn hàng trong DB
      // Ví dụ: updateOrderStatus(body.orderId, 'paid');
      console.log('Payment successful for order:', body.orderId);
    } else {
      // Thanh toán thất bại
      console.log('Payment failed for order:', body.orderId, 'with result code:', body.resultCode);
    }

    // Phản hồi thành công cho MoMo
    return NextResponse.json({ message: 'Successfully received' });
  } catch (error) {
    console.error('IPN processing error:', error);
    return NextResponse.json(
      { error: 'IPN processing failed' },
      { status: 500 }
    );
  }
} 