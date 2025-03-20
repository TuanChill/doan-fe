"use client";

import { APP_ROUTES, PRIVATE_ROUTES } from "@/const/route";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { isAuthenticated, reload, setRedirectTo } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated()) {
      reload();
    }

    if (Object.values(PRIVATE_ROUTES).includes(pathname)) {
      if (!isAuthenticated()) {
        setRedirectTo(pathname);
        router.push(APP_ROUTES.LOGIN);
      }
    }
  }, [pathname]);

  return <>{children}</>;
};
