"use client";

import { APP_ROUTES, PRIVATE_ROUTES } from "@/const/route";
import { useRouter } from "@/hooks/use-router";
import { useUserStore } from "@/stores/user-store";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { isAuthenticated, user, reload } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated()) {
      reload();
    }

    if (Object.values(PRIVATE_ROUTES).includes(pathname)) {
      if (!isAuthenticated()) {
        router.push(APP_ROUTES.LOGIN);
      }
    }
  }, [pathname]);

  return <>{children}</>;
};
