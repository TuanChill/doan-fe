import { NextResponse } from "next/server"
// Giả định bạn có một service để xác thực token và cập nhật mật khẩu
import { verifyResetToken, updateUserPassword } from "@/lib/auth-service"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    // Xác thực token
    const userId = await verifyResetToken(token)
    if (!userId) {
      return NextResponse.json({ error: "Token không hợp lệ hoặc đã hết hạn" }, { status: 400 })
    }

    // Cập nhật mật khẩu
    await updateUserPassword(userId, password)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lỗi khi đặt lại mật khẩu:", error)
    return NextResponse.json({ error: "Không thể đặt lại mật khẩu" }, { status: 500 })
  }
}

