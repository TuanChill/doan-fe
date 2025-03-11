import { NextResponse } from "next/server"
import { findUserByEmail, generateResetToken, sendPasswordResetEmail } from "@/lib/auth-service"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Tìm người dùng theo email
    const user = await findUserByEmail(email)

    // Nếu không tìm thấy người dùng, vẫn trả về thành công
    // Đây là biện pháp bảo mật để tránh tiết lộ thông tin về email đã đăng ký
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // Tạo token đặt lại mật khẩu
    const token = await generateResetToken(user.id)

    // Tạo URL đặt lại mật khẩu
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`

    // Gửi email
    await sendPasswordResetEmail(user.email, resetUrl)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu quên mật khẩu:", error)
    return NextResponse.json({ error: "Không thể xử lý yêu cầu" }, { status: 500 })
  }
}

