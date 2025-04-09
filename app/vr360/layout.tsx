import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VR 360 | Bảo tàng LSQS Việt Nam",
  description:
    "Trang VR 360 và thông tin về VR 360 của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function Vr360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
