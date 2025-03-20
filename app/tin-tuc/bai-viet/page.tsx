import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NewsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" className="p-0 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Trang chủ
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Tin tức & Sự kiện</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src="/placeholder.svg?text=Triển+lãm+75+năm+Quân+đội+Nhân+dân+Việt+Nam&height=500&width=800"
              alt="Tin tức nổi bật"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <Badge className="mb-2 bg-red-600 w-fit">Tin nổi bật</Badge>
              <h2 className="text-2xl font-bold text-white mb-2">
                Triển lãm đặc biệt: &quot;75 năm Quân đội Nhân dân Việt
                Nam&quot;
              </h2>
              <p className="text-gray-200 mb-4">
                Triển lãm trưng bày hơn 500 hiện vật, tài liệu quý giá về lịch
                sử hình thành và phát triển của Quân đội Nhân dân Việt Nam
              </p>
              <Link href="/tin-tuc/bai-viet/75-nam-quan-doi-nhan-dan">
                <Button className="w-fit">Xem chi tiết</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Tin mới nhất</h2>
          {latestNews.map((news) => (
            <Link href={`/tin-tuc/bai-viet/${news.slug}`} key={news.id}>
              <div className="flex gap-4 group">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div>
                  <Badge variant="outline" className="mb-1">
                    {news.category}
                  </Badge>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{news.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Tất cả tin tức</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{news.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {news.date}
                  </span>
                </div>
                <CardTitle className="text-lg">{news.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {news.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/tin-tuc/bai-viet/${news.slug}`}>
                  <Button variant="link" className="p-0">
                    Đọc tiếp
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const latestNews = [
  {
    id: 1,
    title: "Bảo tàng Lịch sử Quân sự Việt Nam đón tiếp đoàn khách quốc tế",
    category: "Hoạt động",
    date: "17/03/2025",
    image: "/placeholder.svg?text=Đoàn+khách+quốc+tế&height=100&width=100",
    slug: "doan-khach-quoc-te",
  },
  {
    id: 2,
    title: "Chương trình giáo dục lịch sử cho học sinh THPT",
    category: "Giáo dục",
    date: "17/03/2025",
    image: "/placeholder.svg?text=Giáo+dục+lịch+sử&height=100&width=100",
    slug: "chuong-trinh-giao-duc-lich-su",
  },
  {
    id: 3,
    title: "Ứng dụng công nghệ thực tế ảo trong trưng bày bảo tàng",
    category: "Công nghệ",
    date: "16/03/2025",
    image: "/placeholder.svg?text=Công+nghệ+VR/AR&height=100&width=100",
    slug: "ung-dung-thuc-te-ao",
  },
];

const allNews = [
  {
    id: 1,
    title: "Bảo tàng Lịch sử Quân sự Việt Nam đón tiếp đoàn khách quốc tế",
    excerpt:
      "Đoàn đại biểu quân sự từ các nước ASEAN đã đến thăm và tìm hiểu về lịch sử quân sự Việt Nam",
    category: "Hoạt động",
    date: "17/03/2025",
    image: "/placeholder.svg?text=Đoàn+khách+quốc+tế&height=200&width=400",
    slug: "doan-khach-quoc-te",
  },
  {
    id: 2,
    title: "Chương trình giáo dục lịch sử cho học sinh THPT",
    excerpt:
      "Bảo tàng triển khai chương trình giáo dục trải nghiệm dành cho học sinh các trường THPT trên địa bàn Hà Nội",
    category: "Giáo dục",
    date: "17/03/2025",
    image: "/placeholder.svg?text=Giáo+dục+lịch+sử&height=200&width=400",
    slug: "chuong-trinh-giao-duc-lich-su",
  },
  {
    id: 3,
    title: "Ứng dụng công nghệ thực tế ảo trong trưng bày bảo tàng",
    excerpt:
      "B��o tàng áp dụng công nghệ VR/AR để tái hiện các trận đánh lịch sử, mang đến trải nghiệm sống động cho khách tham quan",
    category: "Công nghệ",
    date: "16/03/2025",
    image: "/placeholder.svg?text=Công+nghệ+VR/AR&height=200&width=400",
    slug: "ung-dung-thuc-te-ao",
  },
  {
    id: 4,
    title: "Phát động cuộc thi vẽ tranh 'Người chiến sĩ trong mắt em'",
    excerpt:
      "Cuộc thi nhằm khơi dậy tình yêu và sự tự hào về truyền thống quân đội trong thế hệ trẻ",
    category: "Cuộc thi",
    date: "16/03/2025",
    image: "/placeholder.svg?text=Cuộc+thi+vẽ+tranh&height=200&width=400",
    slug: "cuoc-thi-ve-tranh",
  },
  {
    id: 5,
    title: "Khám phá khu trưng bày vũ khí thời kỳ kháng chiến chống Pháp",
    excerpt:
      "Tìm hiểu về các loại vũ khí tự chế và chiến lợi phẩm trong cuộc kháng chiến chống thực dân Pháp (1945-1954)",
    category: "Triển lãm",
    date: "15/03/2025",
    image:
      "/placeholder.svg?text=Vũ+khí+kháng+chiến+chống+Pháp&height=200&width=400",
    slug: "vu-khi-khang-chien-chong-phap",
  },
  {
    id: 6,
    title: "Hành trình bảo tồn di tích chiến trường Điện Biên Phủ",
    excerpt:
      "Công tác bảo tồn và phát huy giá trị di tích lịch sử chiến trường Điện Biên Phủ - Chiến thắng lừng lẫy năm châu",
    category: "Di tích",
    date: "14/03/2025",
    image: "/placeholder.svg?text=Di+tích+Điện+Biên+Phủ&height=200&width=400",
    slug: "bao-ton-dien-bien-phu",
  },
];
