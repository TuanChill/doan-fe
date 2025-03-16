import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextTopLoader } from "@/components/common/next-top-loading";
import { SnackBar } from "@/components/common/snack-bar";
import { Loading } from "@/components/common/loading";
import { UserProvider } from "@/hoc/user-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bảo tàng LSQS Việt Nam",
  description:
    "Bảo tàng Lịch sử Quân sự Việt Nam [1][2] là một trong các bảo tàng quốc gia và đứng đầu trong hệ thống Bảo tàng Quân đội, hiện đang lưu giữ, trưng bày hơn 15 vạn tài liệu, hiện vật, trong đó có nhiều sưu tập độc đáo và 4 Bảo vật Quốc gia, gồm máy bay MiG-21 số hiệu 4324, máy bay MiG-21 số hiệu 5121, Bản đồ Quyết tâm chiến dịch Hồ Chí Minh và xe tăng T-54B số hiệu 843. Bảo tàng mới được mở cửa từ tháng 11 năm 2024, có địa chỉ tại Km 6+500 Đại Lộ Thăng Long, phường Tây Mỗ, Đại Mỗ, quận Nam Từ Liêm, thành phố Hà Nội. Trước đó, bảo tàng cũ tọa lạc tại số 28A đường Điện Biên Phủ, phường Điện Biên, quận Ba Đình, đối diện Công viên Lê-nin, nằm trong khuôn viên Hoàng thành Thăng Long.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <SnackBar />
            <Loading />
          </UserProvider>
        </ThemeProvider>
        <NextTopLoader />
      </body>
    </html>
  );
}
