import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="mt-[60px] mx-auto max-w-[1440px]">{children}</main>
    </div>
  );
};
