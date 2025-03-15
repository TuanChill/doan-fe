export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const API_ROUTES = {
  LOGIN: `${API_BASE}/auth/local`,
  REGISTER: `${API_BASE}/auth/local/register`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
};

