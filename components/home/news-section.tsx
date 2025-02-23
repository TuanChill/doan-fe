import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { news1, news2 } from "@/components/image";

const news = [
  {
    title: "Triển lãm Bảo vật và Không gian Nhà học Việt Nam (1075-1919)",
    description: "Khám phá lịch sử giáo dục Việt Nam qua các hiện vật quý giá",
    image: news1,
    date: "15/02/2024",
    href: "/exhibitions/vietnamese-education",
  },
  {
    title: "Triển lãm lịch sử phát triển và phát triển Văn Miếu - Quốc Tử Giám",
    description: "Hành trình phát triển của di tích lịch sử văn hóa đặc biệt",
    image: news2,
    date: "10/02/2024",
    href: "/exhibitions/temple-development",
  },
];

export const NewsSection = () => {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tin tức & Triển lãm
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Khám phá các sự kiện và triển lãm mới nhất tại Văn Miếu - Quốc Tử
            Giám
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {news.map((item) => (
            <Card key={item.title} className="group">
              <Link href={item.href}>
                <CardHeader className="p-0">
                  <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-sm text-[#5c1414]">
                    {item.date}
                  </CardDescription>
                  <CardTitle className="mt-2 text-xl font-semibold">
                    {item.title}
                  </CardTitle>
                  <p className="mt-4 text-gray-600">{item.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/news">Xem tất cả tin tức</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
