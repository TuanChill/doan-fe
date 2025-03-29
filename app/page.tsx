"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Map,
  MessageSquareText,
  Newspaper,
  ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/animated-section";
import StaggeredChildren from "@/components/ui/staggered-children";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/const/route";
import { getFeaturedArtifact } from "@/request/exhibit";
import { useEffect, useState } from "react";
import { get } from "lodash";
import Image from "next/image";

export default function Home() {
  const [featuredArtifact, setFeaturedArtifact] = useState<any[]>([]);

  const router = useRouter();

  const handleTinTuc = () => {
    router.push(APP_ROUTES.TIN_TUC);
  };

  const handleHienVat = () => {
    router.push(APP_ROUTES.HIEN_VAT);
  };

  const handleMuaVe = () => {
    router.push(APP_ROUTES.MUA_VE);
  };

  const handleThamQuanVR360 = () => {
    router.push(APP_ROUTES.VR360);
  };

  const handleAIHoiDap = () => {
    router.push(APP_ROUTES.AI_AGENT);
  };

  const handleGetFeaturedArtifact = async () => {
    try {
      const response = await getFeaturedArtifact();
      setFeaturedArtifact(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFeaturedArtifact();
  }, []);
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Animation */}
      <section className="relative h-[70vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0 bg-[url('https://doan-hvnh.s3.ap-southeast-1.amazonaws.com/hv.jpg')]"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3} duration={0.8}>
              <h1 className="text-4xl md:text-4xl font-bold mb-4">
                Khám phá Bảo tàng Lịch sử Quân sự Việt Nam
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5} duration={0.8}>
              <p className="text-xl mb-8">
                Khám phá di sản lịch sử quân sự hào hùng của dân tộc Việt Nam
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.7} duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={() =>
                    router.push(APP_ROUTES.GIOI_THIEU.THONG_TIN_THAM_QUAN)
                  }
                >
                  Tìm hiểu thêm <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 60C672 60 768 60 864 65C960 70 1056 80 1152 80C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="#F9FAF5"
            />
          </svg>
        </div>
      </section>

      {/* VR360 Tour Highlight with Animation */}
      <section className="py-16 bg-olive-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-600/20 -mr-20 -mt-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-red-700/20 -ml-10 -mb-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <AnimatedSection animation="fadeLeft" className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tham Quan VR360°
              </h2>
              <p className="text-lg mb-6">
                Trải nghiệm tham quan ảo với công nghệ VR360° - khám phá bảo
                tàng từ mọi góc nhìn, mọi lúc, mọi nơi.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-fit"
              >
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleThamQuanVR360}
                >
                  Bắt đầu tham quan VR360° <Map className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection
              animation="fadeRight"
              className="lg:w-1/2 relative hidden lg:block"
            >
              <div className="aspect-video rounded-lg overflow-hidden border-4 border-amber-600 shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=720&width=1280')",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  VR360°
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Features with Staggered Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold">Khám Phá Bảo Tàng</h2>
          </AnimatedSection>

          <StaggeredChildren
            containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            animation="fadeUp"
            staggerDelay={0.15}
          >
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                onClick={handleTinTuc}
                className="h-48 bg-olive-800 relative cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://doan-hvnh.s3.ap-southeast-1.amazonaws.com/anh-boi-toi.jpg')",
                  }}
                ></div>
                <motion.div
                  className="absolute top-4 left-4 bg-red-700 text-white p-2 rounded-full"
                  whileHover={{ rotate: 15 }}
                >
                  <Newspaper className="h-6 w-6" />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tin Tức & Sự Kiện</h3>
                <p className="text-gray-600 mb-4">
                  Cập nhật những tin tức và sự kiện mới nhất tại bảo tàng.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Link
                    href="/tin-tuc"
                    className="text-red-700 font-medium flex items-center"
                  >
                    Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                onClick={handleThamQuanVR360}
                className="h-48 bg-olive-800 relative cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785e1b319bced8b2064350f15811336cc4af157f8ff81572e4e5dd2a44f7a6d0aea527e5a3af85f2df55b4bf78ab4a21a2015c84708a094c1f5316c563199de65fe/bao-tang-quan-su-viet-nam-7-4992.jpg.webp')",
                  }}
                ></div>
                <motion.div
                  className="absolute top-4 left-4 bg-amber-600 text-white p-2 rounded-full"
                  whileHover={{ rotate: 15 }}
                >
                  <Map className="h-6 w-6" />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tham Quan VR360°</h3>
                <p className="text-gray-600 mb-4">
                  Trải nghiệm tham quan ảo với công nghệ thực tế ảo 360 độ.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Link
                    href="/vr360"
                    className="text-amber-600 font-medium flex items-center"
                  >
                    Khám phá ngay <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                onClick={handleAIHoiDap}
                className="h-48 bg-olive-800 relative cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://bizweb.dktcdn.net/100/380/059/files/prompt-hoi-dap.png?v=1701331008334')",
                  }}
                ></div>
                <motion.div
                  className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full"
                  whileHover={{ rotate: 15 }}
                >
                  <MessageSquareText className="h-6 w-6" />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">AI Hỏi Đáp</h3>
                <p className="text-gray-600 mb-4">
                  Đặt câu hỏi và nhận câu trả lời từ trợ lý ảo thông minh.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Link
                    href="/ai-agent"
                    className="text-blue-600 font-medium flex items-center"
                  >
                    Hỏi ngay <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                onClick={handleHienVat}
                className="h-48 bg-olive-800 relative cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://doan-hvnh.s3.ap-southeast-1.amazonaws.com/bao-tang-lich-su-quan-su-viet-nam39.webp')",
                  }}
                ></div>
                <motion.div
                  className="absolute top-4 left-4 bg-green-700 text-white p-2 rounded-full"
                  whileHover={{ rotate: 15 }}
                >
                  <ImageIcon className="h-6 w-6" />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Hiện Vật Trưng Bày</h3>
                <p className="text-gray-600 mb-4">
                  Khám phá bộ sưu tập hiện vật quý giá của bảo tàng.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Link
                    href="/hien-vat"
                    className="text-green-700 font-medium flex items-center"
                  >
                    Xem bộ sưu tập <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </StaggeredChildren>
        </div>
      </section>

      {/* Exhibition Highlights with Staggered Animation */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold">Hiện Vật Nổi Bật</h2>
          </AnimatedSection>

          <StaggeredChildren
            containerClassName="grid grid-cols-1 md:grid-cols-3 gap-8"
            animation="fadeUp"
            staggerDelay={0.2}
          >
            {featuredArtifact.map((item) => (
              <motion.div
                key={item.id + get(item, "name")}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  className="h-72 bg-cover bg-center"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                    item,
                    "image.url",
                    ""
                  )}`}
                  alt={get(item, "name", "")}
                  width={500}
                  height={500}
                />
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {get(item, "name")}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {get(item, "history", "")}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring" }}
                  >
                    <Link
                      href={`/hien-vat/${get(item, "documentId", "")}`}
                      className="text-olive-800 font-medium flex items-center"
                    >
                      Xem chi tiết <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </StaggeredChildren>

          <AnimatedSection
            animation="fadeUp"
            delay={0.6}
            className="text-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
              >
                Xem tất cả hiện vật
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI Agent Section with Animation */}
      <section className="py-16 bg-blue-50 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <AnimatedSection animation="fadeLeft" className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trợ Lý Ảo Thông Minh
              </h2>
              <p className="text-lg mb-6">
                Đặt câu hỏi và nhận câu trả lời ngay lập tức về lịch sử, hiện
                vật và thông tin bảo tàng từ trợ lý ảo AI.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-fit"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleAIHoiDap}
                >
                  Trò chuyện với AI
                  <MessageSquareText className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection
              animation="fadeRight"
              className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col space-y-4">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">
                      Xin chào! Tôi là trợ lý ảo của Bảo tàng Lịch sử Quân sự
                      Việt Nam. Tôi có thể giúp gì cho bạn?
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                    <p>Bảo tàng có những khu vực trưng bày nào?</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">
                      Bảo tàng có nhiều khu vực trưng bày khác nhau, bao gồm:
                      Khu trưng bày về chiến tranh chống Pháp, Khu trưng bày về
                      chiến tranh chống Mỹ, Khu trưng bày vũ khí, và Khu trưng
                      bày hiện vật lịch sử...
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  disabled
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAIHoiDap}
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Ticket Purchase with Staggered Animation */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold">Mua Vé Tham Quan</h2>
          </AnimatedSection>

          <StaggeredChildren
            containerClassName="grid grid-cols-1 md:grid-cols-3 gap-8"
            animation="fadeUp"
            staggerDelay={0.15}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-red-700"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                Phổ biến nhất
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé Người Lớn</h3>
                <div className="text-3xl font-bold text-red-700 mb-4">
                  40.000 VNĐ
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hướng dẫn viên
                  </li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleMuaVe}
                    className="w-full bg-red-700 hover:bg-red-800 text-white"
                  >
                    Mua vé
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-amber-600 transform scale-105"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé Trẻ Em</h3>
                <div className="text-3xl font-bold text-amber-600 mb-4">
                  20.000 VNĐ
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Phải có người lớn cùng
                  </li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleMuaVe}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Mua vé
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-blue-600"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé Đoàn</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  40.000 VNĐ/người
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Đoàn từ 20 người trở lên
                  </li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleMuaVe}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Mua vé
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </StaggeredChildren>
        </div>
      </section>
    </div>
  );
}
