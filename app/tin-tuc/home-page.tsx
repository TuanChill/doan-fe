import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1608540048067-f7446db16215?q=80&w=1200&auto=format&fit=crop"
            alt="Bảo tàng Lịch sử Quân sự Việt Nam"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6 z-20 max-w-2xl">
            <Badge className="mb-2 bg-red-600 hover:bg-red-700">
              Sự kiện nổi bật
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Triển lãm đặc biệt: "75 năm Quân đội Nhân dân Việt Nam"
            </h1>
            <p className="text-gray-200 mb-4">
              Triển lãm trưng bày hơn 500 hiện vật, tài liệu quý giá về lịch sử
              hình thành và phát triển của Quân đội Nhân dân Việt Nam
            </p>
            <Link href="/tin-tuc/bai-viet/75-nam-quan-doi-nhan-dan">
              <Button>
                Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={
                      article.category === "Triển lãm"
                        ? "default"
                        : article.category === "Di tích"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/tin-tuc/bai-viet/${article.slug}`}>
                  <Button variant="link" className="p-0">
                    Đọc tiếp
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tin tức mới nhất</h2>
          <Link href="/tin-tuc">
            <Button variant="outline">Xem tất cả</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article) => (
            <Card key={article.id}>
              <div className="relative h-40">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                <CardTitle className="text-base">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/tin-tuc/bai-viet/${article.slug}`}>
                  <Button variant="link" className="p-0">
                    Đọc tiếp
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sự kiện sắp diễn ra</h2>
          <Link href="/su-kien">
            <Button variant="outline">Xem tất cả</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <div className="relative h-40">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{event.type}</Badge>
                  <span className="text-xs font-medium text-red-600">
                    {event.date}
                  </span>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-2">
                  {event.location}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/su-kien/${event.slug}`}>
                  <Button variant="link" className="p-0">
                    Chi tiết
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const featuredArticles = [
  {
    id: 1,
    title: "Khám phá khu trưng bày vũ khí thời kỳ kháng chiến chống Pháp",
    excerpt:
      "Tìm hiểu về các loại vũ khí tự chế và chiến lợi phẩm trong cuộc kháng chiến chống thực dân Pháp (1945-1954)",
    category: "Triển lãm",
    date: "15/03/2025",
    image:
      "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?q=80&w=400&auto=format&fit=crop",
    slug: "vu-khi-khang-chien-chong-phap",
  },
  {
    id: 2,
    title: "Hành trình bảo tồn Bảo tàng Lịch sử Quân sự Việt Nam",
    excerpt:
      "Công tác bảo tồn và phát huy giá trị của Bảo tàng Lịch sử Quân sự Việt Nam - Nơi lưu giữ ký ức hào hùng của dân tộc.",
    date: "14/03/2025",
    image:
      "https://images.unsplash.com/photo-1605722243979-fe0be8158232?q=80&w=400&auto=format&fit=crop",
    slug: "bao-tang-quan-su-vn",
  },
  {
    id: 3,
    title: "Những hiện vật quý hiếm mới được trao tặng cho bảo tàng",
    excerpt:
      "Bảo tàng Lịch sử Quân sự Việt Nam vừa tiếp nhận nhiều hiện vật quý từ các cựu chiến binh và gia đình liệt sĩ",
    category: "Hiện vật",
    date: "13/03/2025",
    image:
      "https://images.unsplash.com/photo-1569511166584-1fa429371873?q=80&w=400&auto=format&fit=crop",
    slug: "hien-vat-quy-hiem-moi",
  },
];

const latestArticles = [
  {
    id: 4,
    title: "Bảo tàng Lịch sử Quân sự Việt Nam đón tiếp đoàn khách quốc tế",
    excerpt:
      "Đoàn đại biểu quân sự từ các nước ASEAN đã đến thăm và tìm hiểu về lịch sử quân sự Việt Nam",
    category: "Hoạt động",
    date: "17/03/2025",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=400&auto=format&fit=crop",
    slug: "doan-khach-quoc-te",
  },
  {
    id: 5,
    title: "Chương trình giáo dục lịch sử cho học sinh THPT",
    excerpt:
      "Bảo tàng triển khai chương trình giáo dục trải nghiệm dành cho học sinh các trường THPT trên địa bàn Hà Nội",
    category: "Giáo dục",
    date: "17/03/2025",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop",
    slug: "chuong-trinh-giao-duc-lich-su",
  },
  {
    id: 6,
    title: "Ứng dụng công nghệ thực tế ảo trong trưng bày bảo tàng",
    excerpt:
      "Bảo tàng áp dụng công nghệ VR/AR để tái hiện các trận đánh lịch sử, mang đến trải nghiệm sống động cho khách tham quan",
    category: "Công nghệ",
    date: "16/03/2025",
    image:
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=400&auto=format&fit=crop",
    slug: "ung-dung-thuc-te-ao",
  },
  {
    id: 7,
    title: "Phát động cuộc thi vẽ tranh 'Người chiến sĩ trong mắt em'",
    excerpt:
      "Cuộc thi nhằm khơi dậy tình yêu và sự tự hào về truyền thống quân đội trong thế hệ trẻ",
    category: "Cuộc thi",
    date: "16/03/2025",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400&auto=format&fit=crop",
    slug: "cuoc-thi-ve-tranh",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title:
      "Hội thảo khoa học: 'Chiến dịch Hồ Chí Minh - Giá trị lịch sử và hiện đại'",
    description:
      "Hội thảo với sự tham gia của các nhà sử học, cựu chiến binh và chuyên gia quân sự",
    type: "Hội thảo",
    date: "25-27/04/2025",
    location: "Hội trường Bảo tàng Lịch sử Quân sự Việt Nam, Hà Nội",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400&auto=format&fit=crop",
    slug: "hoi-thao-chien-dich-ho-chi-minh",
  },
  {
    id: 2,
    title: "Triển lãm ảnh: 'Những người lính cụ Hồ'",
    description:
      "Trưng bày hơn 200 bức ảnh quý về Chủ tịch Hồ Chí Minh với Quân đội Nhân dân Việt Nam",
    type: "Triển lãm",
    date: "10-30/04/2025",
    location: "Khu trưng bày ngoài trời, Bảo tàng Lịch sử Quân sự Việt Nam",
    image:
      "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?q=80&w=400&auto=format&fit=crop",
    slug: "trien-lam-anh-nhung-nguoi-linh-cu-ho",
  },
  {
    id: 3,
    title: "Giao lưu với nhân chứng lịch sử: 'Ký ức Điện Biên'",
    description:
      "Chương trình giao lưu với các cựu chiến binh từng tham gia chiến dịch Điện Biên Phủ năm 1954",
    type: "Giao lưu",
    date: "07/05/2025",
    location: "Hội trường A, Bảo tàng Lịch sử Quân sự Việt Nam",
    image:
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=400&auto=format&fit=crop",
    slug: "giao-luu-ky-uc-dien-bien",
  },
];
