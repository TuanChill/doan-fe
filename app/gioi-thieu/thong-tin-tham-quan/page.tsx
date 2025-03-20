"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Calendar,
  Ticket,
  Info,
  Phone,
  Mail,
  Bus,
  Car,
  Train,
  Camera,
  Ban,
  Coffee,
  Accessibility,
  HelpCircle,
  AlertTriangle,
  History,
} from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VisitorInformationPage() {
  return (
    <div className="min-h-screen bg-amber-50/80">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-950/80 to-stone-900/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1580130165583-3f8a8bc144c1')",
            }}
          ></div>
        </motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <div className="inline-block mb-4">
                <span className="bg-red-700/90 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Thông tin tham quan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                Thông Tin Tham Quan
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4 text-amber-50">
                Hướng dẫn chi tiết cho chuyến tham quan Bảo tàng Lịch sử Quân sự
                Việt Nam
              </p>
              <div className="h-1 w-20 bg-red-600 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5 bg-repeat"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <AnimatedSection animation="fadeUp">
                <TabsList className="grid grid-cols-4 mb-8 bg-amber-100/80 p-1 rounded-xl border border-amber-200">
                  <TabsTrigger
                    value="general"
                    className="text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    <Info className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Thông tin chung</span>
                    <span className="inline md:hidden">Chung</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    <MapPin className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Địa điểm</span>
                    <span className="inline md:hidden">Địa điểm</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="rules"
                    className="text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Quy định</span>
                    <span className="inline md:hidden">Quy định</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="faq"
                    className="text-sm data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                  >
                    <HelpCircle className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Câu hỏi thường gặp</span>
                    <span className="inline md:hidden">FAQ</span>
                  </TabsTrigger>
                </TabsList>
              </AnimatedSection>

              <TabsContent value="general">
                <div className="bg-gradient-to-b from-white to-amber-50 rounded-lg shadow-lg overflow-hidden border border-amber-100">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mr-4 shadow-md">
                          <Info className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-900">
                          Thông Tin Chung
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-800">
                            <Clock className="h-5 w-5 mr-2 text-amber-600" />{" "}
                            Giờ mở cửa
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex justify-between">
                              <span>Thứ Hai - Thứ Sáu:</span>
                              <span className="font-medium">8:00 - 17:00</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Thứ Bảy - Chủ Nhật:</span>
                              <span className="font-medium">8:00 - 18:00</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Ngày Lễ:</span>
                              <span className="font-medium">9:00 - 16:00</span>
                            </li>
                          </ul>
                          <div className="mt-4 text-sm text-amber-700">
                            <p>
                              * Bảo tàng đóng cửa vào một số ngày lễ đặc biệt.
                              Vui lòng kiểm tra trước khi đến.
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-800">
                            <Ticket className="h-5 w-5 mr-2 text-amber-600" />{" "}
                            Giá vé
                          </h3>
                          <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg border border-green-200 flex items-start">
                            <div className="mr-2 mt-1">
                              <Ticket className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Miễn phí tham quan</p>
                              <p className="text-sm">
                                Từ ngày 1/11/2023, Bảo tàng Lịch sử Quân sự Việt
                                Nam tại địa điểm mới mở cửa đón khách tham quan
                                miễn phí.
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-amber-700">
                            Các dịch vụ bổ sung như hướng dẫn viên riêng, tham
                            quan chuyên đề có thể có mức phí riêng. Vui lòng
                            liên hệ trước để biết thêm chi tiết.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-800">
                          <Phone className="h-5 w-5 mr-2 text-amber-600" />{" "}
                          Thông tin liên hệ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start bg-amber-50 p-4 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors duration-300">
                            <Phone className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Điện thoại</p>
                              <p>(024) 3733 4464</p>
                            </div>
                          </div>
                          <div className="flex items-start bg-amber-50 p-4 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors duration-300">
                            <Mail className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p>info@btlsqsvn.vn</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.4}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-800">
                          <Calendar className="h-5 w-5 mr-2 text-amber-600" />{" "}
                          Các khu vực trưng bày
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm">
                            <h4 className="font-medium mb-2 text-amber-800">
                              Khu trưng bày trong nhà
                            </h4>
                            <ul className="space-y-2 text-amber-900">
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  1
                                </span>
                                <span>
                                  Khu trưng bày về chiến tranh chống Pháp
                                  (1945-1954)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  2
                                </span>
                                <span>
                                  Khu trưng bày về chiến tranh chống Mỹ
                                  (1954-1975)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  3
                                </span>
                                <span>Khu trưng bày vũ khí các thời kỳ</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  4
                                </span>
                                <span>Khu trưng bày hiện vật lịch sử</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm">
                            <h4 className="font-medium mb-2 text-amber-800">
                              Khu trưng bày ngoài trời
                            </h4>
                            <ul className="space-y-2 text-amber-900">
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  1
                                </span>
                                <span>
                                  Khu trưng bày máy bay, trực thăng quân sự
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  2
                                </span>
                                <span>Khu trưng bày xe tăng, pháo binh</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  3
                                </span>
                                <span>Khu trưng bày vũ khí hạng nặng</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.5}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-amber-800">
                          <Accessibility className="h-5 w-5 mr-2 text-amber-600" />{" "}
                          Tiện ích
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg text-center border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                            <Coffee className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                            <p className="text-sm text-amber-800">
                              Quán cà phê
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg text-center border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                            <Camera className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                            <p className="text-sm text-amber-800">
                              Chụp ảnh lưu niệm
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg text-center border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                            <Accessibility className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                            <p className="text-sm text-amber-800">
                              Lối đi cho người khuyết tật
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg text-center border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                            <Info className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                            <p className="text-sm text-amber-800">
                              Quầy thông tin
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="bg-gradient-to-b from-white to-amber-50 rounded-lg shadow-lg overflow-hidden border border-amber-100">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mr-4 shadow-md">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-900">
                          Địa Điểm & Hướng Dẫn Đi Lại
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Địa chỉ mới
                        </h3>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-4 shadow-sm">
                          <p className="font-medium text-green-800">
                            Từ ngày 1/11/2023, Bảo tàng Lịch sử Quân sự Việt Nam
                            đã chuyển đến địa điểm mới:
                          </p>
                          <p className="mt-2 flex items-center text-green-800">
                            <MapPin className="h-5 w-5 mr-2 text-green-700" />
                            <strong>
                              Số 2 Lê Đức Thọ, phường Mỹ Đình 2, quận Nam Từ
                              Liêm, Hà Nội
                            </strong>
                          </p>
                        </div>
                        <p className="mb-4 text-amber-900">
                          Địa điểm mới của Bảo tàng Lịch sử Quân sự Việt Nam nằm
                          trong khu vực phát triển mới của Hà Nội, dễ dàng tiếp
                          cận bằng nhiều phương tiện giao thông.
                        </p>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Bản đồ
                        </h3>
                        <div className="rounded-lg overflow-hidden border-2 border-amber-200 shadow-md">
                          <iframe
                            className="w-full h-[250px]"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5596609032596!2d105.75152857601942!3d21.01028118841144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba2b73d5d13%3A0xa6a0ef366328a0b1!2zQuG6o28gdMOgbmcgTOG7i2NoIHPhu60gUXXDom4gc-G7sSBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1741533624214!5m2!1svi!2s"
                            allowFullScreen
                            loading="lazy"
                            title="Bản đồ bảo tàng Lịch sử Quân sự Việt Nam"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                          <p className="text-sm text-gray-600 text-center mt-2">
                            Vị trí:{" "}
                            <strong>Bảo tàng Lịch sử Quân sự Việt Nam</strong> -
                            28A Điện Biên Phủ, Ba Đình, Hà Nội
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.4}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Hướng dẫn đi lại
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-3">
                              <Bus className="h-5 w-5 mr-2 text-amber-600" />
                              <h4 className="font-medium text-amber-800">
                                Bằng xe buýt
                              </h4>
                            </div>
                            <p className="text-sm text-amber-800 mb-2">
                              Các tuyến xe buýt đi qua khu vực:
                            </p>
                            <ul className="text-sm space-y-1 text-amber-800">
                              <li>Tuyến 32: Bến xe Mỹ Đình - Nhổn</li>
                              <li>
                                Tuyến 60: Bến xe Mỹ Đình - Đại học Quốc gia
                              </li>
                              <li>Tuyến 74: Bến xe Mỹ Đình - Cầu Diễn</li>
                            </ul>
                          </div>

                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-3">
                              <Car className="h-5 w-5 mr-2 text-amber-600" />
                              <h4 className="font-medium text-amber-800">
                                Bằng ô tô/ taxi
                              </h4>
                            </div>
                            <p className="text-sm text-amber-800">
                              Từ trung tâm Hà Nội, bạn có thể đi theo đường Phạm
                              Hùng hoặc đường Lê Đức Thọ để đến bảo tàng. Có bãi
                              đỗ xe rộng rãi tại bảo tàng.
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-3">
                              <Train className="h-5 w-5 mr-2 text-amber-600" />
                              <h4 className="font-medium text-amber-800">
                                Bằng tàu điện
                              </h4>
                            </div>
                            <p className="text-sm text-amber-800">
                              Khi tuyến Metro số 1 hoàn thành, bạn có thể đi đến
                              ga Mỹ Đình và đi bộ hoặc bắt xe buýt đến bảo tàng.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.5}>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Khu vực lân cận
                        </h3>
                        <p className="mb-4 text-amber-900">
                          Bảo tàng nằm gần các địa điểm nổi tiếng khác như:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <li className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors duration-300">
                            <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="text-amber-900">
                              Sân vận động Quốc gia Mỹ Đình
                            </span>
                          </li>
                          <li className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors duration-300">
                            <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="text-amber-900">
                              Trung tâm Hội nghị Quốc gia
                            </span>
                          </li>
                          <li className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors duration-300">
                            <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="text-amber-900">
                              Khu đô thị Mỹ Đình
                            </span>
                          </li>
                          <li className="flex items-center bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-100 transition-colors duration-300">
                            <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="text-amber-900">
                              Bến xe Mỹ Đình
                            </span>
                          </li>
                        </ul>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rules">
                <div className="bg-gradient-to-b from-white to-amber-50 rounded-lg shadow-lg overflow-hidden border border-amber-100">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mr-4 shadow-md">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-900">
                          Quy Định Tham Quan
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Quy định chung
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="mr-3 mt-1 text-amber-600">
                              <Camera className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1 text-amber-800">
                                Chụp ảnh và quay phim
                              </h4>
                              <p className="text-sm text-amber-800">
                                Được phép chụp ảnh và quay phim cho mục đích cá
                                nhân. Không sử dụng đèn flash trong các khu vực
                                trưng bày hiện vật nhạy cảm với ánh sáng. Việc
                                chụp ảnh và quay phim cho mục đích thương mại
                                cần được sự cho phép trước của ban quản lý bảo
                                tàng.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="mr-3 mt-1 text-red-600">
                              <Ban className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1 text-red-800">
                                Các hành vi không được phép
                              </h4>
                              <ul className="text-sm text-red-800 space-y-1">
                                <li>
                                  Mang vũ khí, chất cháy nổ, chất độc hại vào
                                  bảo tàng
                                </li>
                                <li>Hút thuốc trong khuôn viên bảo tàng</li>
                                <li>
                                  Mang đồ ăn, thức uống vào khu vực trưng bày
                                </li>
                                <li>
                                  Chạm vào hiện vật trưng bày (trừ khi có biển
                                  chỉ dẫn cho phép)
                                </li>
                                <li>
                                  Gây ồn ào, mất trật tự trong khu vực bảo tàng
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-start bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="mr-3 mt-1 text-amber-600">
                              <Info className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1 text-amber-800">
                                Trang phục
                              </h4>
                              <p className="text-sm text-amber-800">
                                Khách tham quan nên mặc trang phục lịch sự, phù
                                hợp khi đến bảo tàng. Không mặc quần áo quá hở
                                hang hoặc có hình ảnh, chữ viết không phù hợp.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Quy định đối với đoàn tham quan
                        </h3>
                        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm">
                          <ul className="space-y-3 text-amber-800">
                            <li className="flex items-start">
                              <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                1
                              </span>
                              <span>
                                Đoàn tham quan từ 20 người trở lên nên đăng ký
                                trước với ban quản lý bảo tàng để được sắp xếp
                                lịch tham quan và hướng dẫn viên phù hợp.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                2
                              </span>
                              <span>
                                Trưởng đoàn chịu trách nhiệm quản lý và đảm bảo
                                các thành viên trong đoàn tuân thủ nội quy của
                                bảo tàng.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                3
                              </span>
                              <span>
                                Đoàn tham quan nên giữ trật tự, không gây ồn ào,
                                và di chuyển theo hướng dẫn của nhân viên bảo
                                tàng.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.4}>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-amber-800">
                          Lưu ý đặc biệt
                        </h3>
                        <div className="bg-gradient-to-r from-amber-50 to-amber-200 p-4 rounded-lg border border-amber-300 shadow-md">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-800 mb-2">
                                Bảo vệ hiện vật
                              </p>
                              <p className="text-sm text-amber-800">
                                Nhiều hiện vật trong bảo tàng có giá trị lịch sử
                                và văn hóa cao. Vui lòng không chạm vào hiện
                                vật, không tựa vào tủ kính, và tuân thủ các biển
                                chỉ dẫn tại mỗi khu vực trưng bày để góp phần
                                bảo vệ di sản văn hóa quý giá của dân tộc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq">
                <div className="bg-gradient-to-b from-white to-amber-50 rounded-lg shadow-lg overflow-hidden border border-amber-100">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center mr-4 shadow-md">
                          <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-amber-900">
                          Câu Hỏi Thường Gặp
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="space-y-6">
                        <FaqItem
                          question="Bảo tàng có mở cửa vào ngày lễ không?"
                          answer="Bảo tàng mở cửa vào hầu hết các ngày lễ từ 9:00 đến 16:00. Tuy nhiên, bảo tàng có thể đóng cửa vào một số ngày lễ đặc biệt. Vui lòng kiểm tra trước khi đến tham quan vào các ngày lễ."
                        />

                        <FaqItem
                          question="Có cần đặt vé trước khi đến tham quan không?"
                          answer="Từ ngày 1/11/2023, Bảo tàng Lịch sử Quân sự Việt Nam tại địa điểm mới mở cửa đón khách tham quan miễn phí. Bạn không cần đặt vé trước, tuy nhiên nếu đi theo đoàn đông (từ 20 người trở lên), bạn nên liên hệ trước với ban quản lý bảo tàng để được sắp xếp lịch tham quan phù hợp."
                        />

                        <FaqItem
                          question="Bảo tàng có dịch vụ hướng dẫn viên không?"
                          answer="Có, bảo tàng có dịch vụ hướng dẫn viên bằng tiếng Việt và tiếng Anh. Nếu bạn cần hướng dẫn viên, vui lòng đăng ký trước tại quầy thông tin hoặc liên hệ qua số điện thoại của bảo tàng."
                        />

                        <FaqItem
                          question="Mất bao lâu để tham quan hết bảo tàng?"
                          answer="Thời gian tham quan trung bình là khoảng 2-3 giờ để xem qua các khu vực trưng bày chính. Tuy nhiên, nếu bạn muốn tìm hiểu chi tiết về các hiện vật và đọc tất cả các thông tin, bạn có thể cần 4-5 giờ hoặc nhiều hơn."
                        />

                        <FaqItem
                          question="Bảo tàng có phù hợp cho trẻ em không?"
                          answer="Bảo tàng phù hợp cho trẻ em từ 6 tuổi trở lên. Một số khu vực trưng bày có thể có nội dung nhạy cảm về chiến tranh, vì vậy phụ huynh nên đi cùng và hướng dẫn trẻ em khi tham quan."
                        />

                        <FaqItem
                          question="Có chỗ để xe máy và ô tô không?"
                          answer="Có, bảo tàng có bãi đỗ xe rộng rãi cho cả xe máy và ô tô. Bãi đỗ xe nằm trong khuôn viên bảo tàng và được bảo vệ 24/7."
                        />

                        <FaqItem
                          question="Có thể mang thức ăn và đồ uống vào bảo tàng không?"
                          answer="Không được phép mang thức ăn và đồ uống vào khu vực trưng bày của bảo tàng. Tuy nhiên, bảo tàng có khu vực nghỉ ngơi và quán cà phê nơi bạn có thể dùng đồ ăn nhẹ và đồ uống."
                        />
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <AnimatedSection animation="fadeUp" delay={0.6} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gioi-thieu/lich-su">
                  <Button className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 shadow-md">
                    <History className="mr-2 h-4 w-4" /> Lịch sử bảo tàng
                  </Button>
                </Link>
                <Link href="/vr360">
                  <Button
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white shadow-md"
                  >
                    <Camera className="mr-2 h-4 w-4" /> Tham quan VR360°
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-amber-800 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10 bg-repeat"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fadeUp">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-md">
                Khám Phá Bảo Tàng Ngay Hôm Nay
              </h2>
              <p className="text-lg mb-8 text-amber-100">
                Hãy đến và trải nghiệm không gian trưng bày hiện đại với hàng
                nghìn hiện vật quý giá về lịch sử quân sự Việt Nam.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/vr360">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Tham quan VR360°
                  </Button>
                </Link>
                <Link href="/ai-agent">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-amber-300 text-amber-100 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Hỏi đáp với AI
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border border-amber-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4">
        <h3 className="font-medium flex items-center text-amber-800">
          <HelpCircle className="h-5 w-5 mr-2 text-amber-600" />
          {question}
        </h3>
      </div>
      <div className="p-4 bg-white">
        <p className="text-amber-900">{answer}</p>
      </div>
    </div>
  );
}
