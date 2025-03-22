"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Award, BookOpen, History } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import Link from "next/link";
import TextToSpeechPlayer from "@/components/text-to-speech";

export default function Page() {
  // Define content sections for the text-to-speech player
  const contentSections = [
    {
      id: "intro",
      title: "Lịch Sử Hình Thành và Phát Triển",
      content: "",
      // "Bảo tàng Lịch sử Quân sự Việt Nam được thành lập ngày 17/7/1956, là một trong những bảo tàng đầu tiên của Việt Nam. Ban đầu, bảo tàng có tên là Bảo tàng Quân đội, sau đó đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam vào năm 2002.",
    },
    {
      id: "establishment",
      title: "Sự Thành Lập",
      content:
        "Bảo tàng Lịch sử Quân sự Việt Nam được thành lập ngày 17/7/1956, là một trong những bảo tàng đầu tiên của Việt Nam. Ban đầu, bảo tàng có tên là Bảo tàng Quân đội, sau đó đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam vào năm 2002. Bảo tàng được xây dựng với mục đích lưu giữ, trưng bày và giới thiệu các hiện vật, tài liệu quý giá về lịch sử quân sự của dân tộc Việt Nam, từ thời kỳ dựng nước đến các cuộc kháng chiến chống ngoại xâm và bảo vệ Tổ quốc.",
    },
    {
      id: "development",
      title: "Phát Triển Qua Các Thời Kỳ",
      content:
        "Trải qua hơn 65 năm xây dựng và phát triển, Bảo tàng Lịch sử Quân sự Việt Nam đã không ngừng được mở rộng và nâng cấp. Từ một bảo tàng nhỏ ban đầu, đến nay bảo tàng đã trở thành một trong những bảo tàng lớn nhất Việt Nam với diện tích trưng bày rộng lớn và hàng chục nghìn hiện vật quý giá. Năm 1998, bảo tàng được xây dựng lại với quy mô lớn hơn tại địa điểm 28A Điện Biên Phủ, Ba Đình, Hà Nội. Đến năm 2002, bảo tàng chính thức đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam.",
    },
    {
      id: "collection",
      title: "Bộ Sưu Tập Hiện Vật",
      content:
        "Bảo tàng hiện đang lưu giữ và trưng bày hơn 15.000 hiện vật, tài liệu quý giá về lịch sử quân sự của dân tộc Việt Nam. Trong đó có nhiều hiện vật độc đáo và có giá trị lịch sử cao như: Xe tăng T-54 số hiệu 843 đã húc đổ cổng Dinh Độc Lập vào trưa ngày 30/4/1975. Máy bay MiG-21 do Anh hùng Phạm Tuân điều khiển bắn rơi máy bay B-52 của Mỹ. Đại bác thần công được đúc dưới triều Nguyễn. Bộ sưu tập vũ khí từ thời kỳ đồ đồng đến hiện đại. Các hiện vật, tài liệu về chiến tranh chống Pháp và chống Mỹ",
    },
    {
      id: "significance",
      title: "Ý Nghĩa Lịch Sử và Giáo Dục",
      content:
        "Bảo tàng Lịch sử Quân sự Việt Nam không chỉ là nơi lưu giữ và trưng bày các hiện vật lịch sử, mà còn là một trung tâm giáo dục truyền thống yêu nước và chủ nghĩa anh hùng cách mạng cho các thế hệ người Việt Nam, đặc biệt là thế hệ trẻ. Hàng năm, bảo tàng đón tiếp hàng trăm nghìn lượt khách tham quan, trong đó có nhiều đoàn khách quốc tế. Bảo tàng cũng thường xuyên tổ chức các hoạt động giáo dục, triển lãm chuyên đề và sự kiện văn hóa nhằm giới thiệu rộng rãi hơn về lịch sử quân sự Việt Nam đến công chúng.",
    },
    {
      id: "history",
      title: "Các mốc lịch sử quan trọng",
      content:
        "Năm 1956: Thành lập Bảo tàng: Ngày 17/7/1956, Bảo tàng Quân đội (tiền thân của Bảo tàng Lịch sử Quân sự Việt Nam) được thành lập, là một trong những bảo tàng đầu tiên của Việt Nam. Năm 1998: Xây dựng lại với quy mô lớn hơn: Bảo tàng được xây dựng lại với quy mô lớn hơn tại địa điểm 28A Điện Biên Phủ, Ba Đình, Hà Nội. Năm 2002: Đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam: Bảo tàng chính thức đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam, đánh dấu sự phát triển mới trong lịch sử của bảo tàng.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1579912437766-7896df6d3cd3')",
            }}
          ></div>
        </motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lịch Sử Bảo Tàng
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Hành trình phát triển của Bảo tàng Lịch sử Quân sự Việt Nam
              </p>
              <div className="h-1 w-20 bg-red-700 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <AnimatedSection animation="fadeUp">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-olive-800 rounded-full flex items-center justify-center mr-4">
                      <History className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      Lịch Sử Hình Thành và Phát Triển
                    </h2>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeUp" delay={0.2}>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4 text-olive-800">
                      Sự Thành Lập
                    </h3>
                    <p className="mb-4">
                      Bảo tàng Lịch sử Quân sự Việt Nam được thành lập ngày
                      17/7/1956, là một trong những bảo tàng đầu tiên của Việt
                      Nam. Ban đầu, bảo tàng có tên là Bảo tàng Quân đội, sau đó
                      đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam vào năm
                      2002.
                    </p>
                    <p className="mb-4">
                      Bảo tàng được xây dựng với mục đích lưu giữ, trưng bày và
                      giới thiệu các hiện vật, tài liệu quý giá về lịch sử quân
                      sự của dân tộc Việt Nam, từ thời kỳ dựng nước đến các cuộc
                      kháng chiến chống ngoại xâm và bảo vệ Tổ quốc.
                    </p>

                    <div className="my-8 relative">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/10/4/btlsqsvn8-1728040417052-1728040418158624098849.jpg"
                          alt="Hiện vật tại Bảo tàng Lịch sử Quân sự Việt Nam"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-olive-800 text-white px-3 py-1 text-sm">
                        Hiện vật tại Bảo tàng
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-olive-800">
                      Phát Triển Qua Các Thời Kỳ
                    </h3>
                    <p className="mb-4">
                      Trải qua hơn 65 năm xây dựng và phát triển, Bảo tàng Lịch
                      sử Quân sự Việt Nam đã không ngừng được mở rộng và nâng
                      cấp. Từ một bảo tàng nhỏ ban đầu, đến nay bảo tàng đã trở
                      thành một trong những bảo tàng lớn nhất Việt Nam với diện
                      tích trưng bày rộng lớn và hàng chục nghìn hiện vật quý
                      giá.
                    </p>
                    <p className="mb-4">
                      Năm 1998, bảo tàng được xây dựng lại với quy mô lớn hơn
                      tại địa điểm 28A Điện Biên Phủ, Ba Đình, Hà Nội. Đến năm
                      2002, bảo tàng chính thức đổi tên thành Bảo tàng Lịch sử
                      Quân sự Việt Nam.
                    </p>

                    <h3 className="text-xl font-semibold mb-4 text-olive-800">
                      Địa Điểm Mới Từ Tháng 11/2023
                    </h3>
                    <p className="mb-4">
                      Từ ngày 1/11/2023, Bảo tàng Lịch sử Quân sự Việt Nam đã
                      chuyển đến địa điểm mới tại số 2 Lê Đức Thọ, phường Mỹ
                      Đình 2, quận Nam Từ Liêm, Hà Nội. Đây là một công trình
                      hiện đại, được xây dựng với quy mô lớn hơn, đáp ứng nhu
                      cầu trưng bày và bảo quản ngày càng nhiều hiện vật quý giá
                      của bảo tàng.
                    </p>
                    <p className="mb-4">
                      Tại địa điểm mới, bảo tàng mở cửa đón khách tham quan miễn
                      phí, tạo điều kiện thuận lợi cho người dân và du khách tìm
                      hiểu về lịch sử quân sự hào hùng của dân tộc Việt Nam.
                    </p>

                    <div className="my-8 relative">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/10/4/btlsqsvn2-1728040406462-17280404069991831436646.jpg"
                          alt="Khu vực trưng bày ngoài trời của Bảo tàng"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-olive-800 text-white px-3 py-1 text-sm">
                        Khu vực trưng bày ngoài trời
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-olive-800">
                      Bộ Sưu Tập Hiện Vật
                    </h3>
                    <p className="mb-4">
                      Bảo tàng hiện đang lưu giữ và trưng bày hơn 15.000 hiện
                      vật, tài liệu quý giá về lịch sử quân sự của dân tộc Việt
                      Nam. Trong đó có nhiều hiện vật độc đáo và có giá trị lịch
                      sử cao như:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>
                        Xe tăng T-54 số hiệu 843 đã húc đổ cổng Dinh Độc Lập vào
                        trưa ngày 30/4/1975
                      </li>
                      <li>
                        Máy bay MiG-21 do Anh hùng Phạm Tuân điều khiển bắn rơi
                        máy bay B-52 của Mỹ
                      </li>
                      <li>Đại bác thần công được đúc dưới triều Nguyễn</li>
                      <li>Bộ sưu tập vũ khí từ thời kỳ đồ đồng đến hiện đại</li>
                      <li>
                        Các hiện vật, tài liệu về chiến tranh chống Pháp và
                        chống Mỹ
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4 text-olive-800">
                      Ý Nghĩa Lịch Sử và Giáo Dục
                    </h3>
                    <p className="mb-4">
                      Bảo tàng Lịch sử Quân sự Việt Nam không chỉ là nơi lưu giữ
                      và trưng bày các hiện vật lịch sử, mà còn là một trung tâm
                      giáo dục truyền thống yêu nước và chủ nghĩa anh hùng cách
                      mạng cho các thế hệ người Việt Nam, đặc biệt là thế hệ
                      trẻ.
                    </p>
                    <p className="mb-4">
                      Hàng năm, bảo tàng đón tiếp hàng trăm nghìn lượt khách
                      tham quan, trong đó có nhiều đoàn khách quốc tế. Bảo tàng
                      cũng thường xuyên tổ chức các hoạt động giáo dục, triển
                      lãm chuyên đề và sự kiện văn hóa nhằm giới thiệu rộng rãi
                      hơn về lịch sử quân sự Việt Nam đến công chúng.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeUp" delay={0.4}>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/gioi-thieu/thong-tin-tham-quan">
                      <Button className="bg-olive-800 hover:bg-olive-900">
                        <Clock className="mr-2 h-4 w-4" /> Thông tin tham quan
                      </Button>
                    </Link>
                    <Link href="/vr360">
                      <Button
                        variant="outline"
                        className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
                      >
                        <BookOpen className="mr-2 h-4 w-4" /> Tham quan VR360°
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-12">
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-olive-800" />
                  Các mốc lịch sử quan trọng
                </h2>
              </AnimatedSection>

              <div className="relative border-l-2 border-olive-800 pl-8 ml-4 space-y-10">
                <TimelineItem year="1956" title="Thành lập Bảo tàng">
                  Ngày 17/7/1956, Bảo tàng Quân đội (tiền thân của Bảo tàng Lịch
                  sử Quân sự Việt Nam) được thành lập, là một trong những bảo
                  tàng đầu tiên của Việt Nam.
                </TimelineItem>

                <TimelineItem
                  year="1998"
                  title="Xây dựng lại với quy mô lớn hơn"
                >
                  Bảo tàng được xây dựng lại với quy mô lớn hơn tại địa điểm 28A
                  Điện Biên Phủ, Ba Đình, Hà Nội.
                </TimelineItem>

                <TimelineItem
                  year="2002"
                  title="Đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam"
                >
                  Bảo tàng chính thức đổi tên thành Bảo tàng Lịch sử Quân sự
                  Việt Nam, đánh dấu sự phát triển mới trong lịch sử của bảo
                  tàng.
                </TimelineItem>

                <TimelineItem year="2023" title="Chuyển đến địa điểm mới">
                  Từ ngày 1/11/2023, Bảo tàng chuyển đến địa điểm mới tại số 2
                  Lê Đức Thọ, phường Mỹ Đình 2, quận Nam Từ Liêm, Hà Nội và mở
                  cửa đón khách tham quan miễn phí.
                </TimelineItem>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-olive-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fadeUp">
              <h2 className="text-3xl font-bold mb-4">
                Khám Phá Bảo Tàng Ngay Hôm Nay
              </h2>
              <p className="text-lg mb-8">
                Hãy đến và trải nghiệm không gian trưng bày hiện đại với hàng
                nghìn hiện vật quý giá về lịch sử quân sự Việt Nam.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/vr360">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Tham quan VR360°
                  </Button>
                </Link>
                <Link href="/gioi-thieu/thong-tin-tham-quan">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Thông tin tham quan
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Text-to-Speech Player */}
      <TextToSpeechPlayer sections={contentSections} />
    </div>
  );
}

// Timeline Item Component
function TimelineItem({
  year,
  title,
  children,
}: {
  year: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection animation="fadeLeft" className="relative">
      <div className="absolute -left-12 w-8 h-8 bg-olive-800 rounded-full flex items-center justify-center text-white">
        <Award className="h-4 w-4" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="inline-block px-3 py-1 bg-olive-100 text-olive-800 rounded-full text-sm font-medium mb-2">
          {year}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
      </div>
    </AnimatedSection>
  );
}
