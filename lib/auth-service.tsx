// Lưu trữ token và thông tin người dùng
export const setAuth = (token: string, user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// Lấy token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Lấy thông tin người dùng
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Kiểm tra đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Đăng xuất
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

// Đăng ký
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://14.225.211.42/api/auth/local/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Đăng ký không thành công");
  }

  return data;
};

// Đăng nhập
export const login = async (identifier: string, password: string) => {
  const response = await fetch("http://14.225.211.42/api/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Đăng nhập không thành công");
  }

  return data;
};

// Lưu trữ tạm thời cho các token đặt lại mật khẩu
// Trong thực tế, bạn sẽ lưu trữ trong cơ sở dữ liệu
const resetTokens: Record<string, { userId: string; expires: Date }> = {};

// Tìm người dùng theo email
export const findUserByEmail = async (email: string) => {
  try {
    // Trong thực tế, bạn sẽ gọi API để tìm người dùng
    // Ví dụ:
    // const response = await fetch(`http://14.225.211.42/api/users?email=${email}`, {
    //   headers: {
    //     'Authorization': `Bearer ${getAdminToken()}`
    //   }
    // })
    // const data = await response.json()
    // return data[0] || null

    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Giả lập dữ liệu người dùng
    if (email === "test@example.com") {
      return { id: "1", email: "test@example.com", username: "testuser" };
    }

    return null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
};

// Tạo token đặt lại mật khẩu
export const generateResetToken = async (userId: string) => {
  // Tạo token ngẫu nhiên
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // Đặt thời gian hết hạn (1 giờ)
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);

  // Lưu token
  resetTokens[token] = { userId, expires };

  return token;
};

// Xác thực token đặt lại mật khẩu
export const verifyResetToken = async (token: string) => {
  const resetToken = resetTokens[token];

  // Kiểm tra token tồn tại
  if (!resetToken) {
    return null;
  }

  // Kiểm tra token hết hạn
  if (new Date() > resetToken.expires) {
    delete resetTokens[token];
    return null;
  }

  return resetToken.userId;
};

// Cập nhật mật khẩu người dùng
export const updateUserPassword = async (
  userId: string,
  newPassword: string
) => {
  try {
    // Trong thực tế, bạn sẽ gọi API để cập nhật mật khẩu
    // Ví dụ:
    // const response = await fetch(`http://14.225.211.42/api/users/${userId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAdminToken()}`
    //   },
    //   body: JSON.stringify({
    //     password: newPassword
    //   })
    // })
    // const data = await response.json()
    // return data

    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true };
  } catch (error) {
    console.error("Error updating user password:", error);
    throw new Error("Không thể cập nhật mật khẩu");
  }
};

// Gửi email đặt lại mật khẩu
export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  try {
    // Trong thực tế, bạn sẽ gọi API để gửi email
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
