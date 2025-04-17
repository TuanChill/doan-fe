"use client";

import {
  APP_ROUTES,
  PRIVATE_ROUTES,
  PUBLIC_ACCESS_WITH_NOTIFICATION,
} from "@/const/route";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSnackBarStore } from "@/stores/snackbar-store";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { isAuthenticated, reload, setRedirectTo } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const { warn } = useSnackBarStore();

  useEffect(() => {
    if (isAuthenticated()) {
      reload();
    }

    // Check if current path is in PRIVATE_ROUTES but not in PUBLIC_ACCESS_WITH_NOTIFICATION
    const isPrivateRoute = Object.values(PRIVATE_ROUTES).includes(pathname);
    const isPublicWithNotification = Object.values(
      PUBLIC_ACCESS_WITH_NOTIFICATION
    ).includes(pathname);

    if (isPrivateRoute && !isAuthenticated()) {
      if (isPublicWithNotification) {
        // Show notification but allow access
        warn("Thông báo", "Vui lòng đăng nhập để có trải nghiệm đầy đủ.", true);
      } else {
        // Redirect to login for fully private routes
        setRedirectTo(pathname);
        router.push(APP_ROUTES.LOGIN);
      }
    }
  }, [pathname, isAuthenticated]);

  return <>{children}</>;
};
