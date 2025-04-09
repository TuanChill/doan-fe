import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiện vật | Bảo tàng LSQS Việt Nam",
  description:
    "Trang hiện vật và thông tin về các hiện vật lịch sử của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function ArtifactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
