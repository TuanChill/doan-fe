export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const API_ROUTES = {
  LOGIN: `${API_BASE}/auth/local`,
  REGISTER: `${API_BASE}/auth/local/register`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  SEND_CONTACT: `${API_BASE}/contact`,
  ME: `${API_BASE}/users/me`,
  USERS: `${API_BASE}/users`,
  EXHIBIT: `${API_BASE}/exhibits`,
  CATEGORY_ARTIFACT: `${API_BASE}/category-artifacts`,
  POST: `${API_BASE}/posts`,
};

