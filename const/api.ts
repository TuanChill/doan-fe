export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const API_ROUTES = {
  LOGIN: `${API_BASE}/auth/local`,
  REGISTER: `${API_BASE}/auth/local/register`,
};

