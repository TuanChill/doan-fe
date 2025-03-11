export const sendResetPasswordEmail = async (
  email: string,
  resetUrl: string
) => {
  try {
    // In thực tế, bạn sẽ gọi API để gửi email
    // Ví dụ:
    // const response = await fetch('http://14.225.211.42/api/email/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAdminToken()}`
    //   },
    //   body: JSON.stringify({
    //     to: email,
    //     subject: 'Đặt lại mật khẩu',
    //     html: `<p>Nhấp vào liên kết sau để đặt lại mật khẩu: <a href="${resetUrl}">${resetUrl}</a></p>`
    //   })
    // })
    // const data = await response.json()
    // return data

    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(
      `Email đặt lại mật khẩu đã được gửi đến ${email} với URL: ${resetUrl}`
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Không thể gửi email đặt lại mật khẩu");
  }
};
