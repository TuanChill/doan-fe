export const APP_ROUTES = {
  HOME: "/",
  MUA_VE: "/mua-ve",
  VR360: "/vr360",
  AI_AGENT: "/ai-agent",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  TIN_TUC: "/tin-tuc",
  HIEN_VAT: "/hien-vat",
  GIOI_THIEU: {
    LICH_SU: "gioi-thieu/lich-su",
    THONG_TIN_THAM_QUAN: "gioi-thieu/thong-tin-tham-quan",
  },
};

export const PRIVATE_ROUTES = {
  PROFILE: "/profile",
  MUA_VE: "/mua-ve",
  AI_AGENT: "/ai-agent",
  DOI_VE: "/doi-diem/ve",
};

// Routes that are accessible to everyone but should show a notification for non-logged in users
export const PUBLIC_ACCESS_WITH_NOTIFICATION = {
  AI_AGENT: "/ai-agent",
};

