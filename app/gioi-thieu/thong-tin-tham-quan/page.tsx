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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Thông Tin Tham Quan
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Hướng dẫn chi tiết cho chuyến tham quan Bảo tàng Lịch sử Quân sự
                Việt Nam
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
            <Tabs defaultValue="general" className="w-full">
              <AnimatedSection animation="fadeUp">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="general" className="text-sm">
                    <Info className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Thông tin chung</span>
                    <span className="inline md:hidden">Chung</span>
                  </TabsTrigger>
                  <TabsTrigger value="location" className="text-sm">
                    <MapPin className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Địa điểm</span>
                    <span className="inline md:hidden">Địa điểm</span>
                  </TabsTrigger>
                  <TabsTrigger value="rules" className="text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Quy định</span>
                    <span className="inline md:hidden">Quy định</span>
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="text-sm">
                    <HelpCircle className="h-4 w-4 mr-2 md:mr-2" />
                    <span className="hidden md:inline">Câu hỏi thường gặp</span>
                    <span className="inline md:hidden">FAQ</span>
                  </TabsTrigger>
                </TabsList>
              </AnimatedSection>

              <TabsContent value="general">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-olive-800 rounded-full flex items-center justify-center mr-4">
                          <Info className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">Thông Tin Chung</h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-stone-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-olive-800">
                            <Clock className="h-5 w-5 mr-2" /> Giờ mở cửa
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
                          <div className="mt-4 text-sm text-gray-600">
                            <p>
                              * Bảo tàng đóng cửa vào một số ngày lễ đặc biệt.
                              Vui lòng kiểm tra trước khi đến.
                            </p>
                          </div>
                        </div>

                        <div className="bg-stone-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 flex items-center text-olive-800">
                            <Ticket className="h-5 w-5 mr-2" /> Giá vé
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
                          <p className="text-sm text-gray-600">
                            Các dịch vụ bổ sung như hướng dẫn viên riêng, tham
                            quan chuyên đề có thể có mức phí riêng. Vui lòng
                            liên hệ trước để biết thêm chi tiết.
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-olive-800">
                          <Phone className="h-5 w-5 mr-2" /> Thông tin liên hệ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 text-olive-800 mt-0.5" />
                            <div>
                              <p className="font-medium">Điện thoại</p>
                              <p>(024) 3733 4464</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-olive-800 mt-0.5" />
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
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-olive-800">
                          <Calendar className="h-5 w-5 mr-2" /> Các khu vực
                          trưng bày
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-stone-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Khu trưng bày trong nhà
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  1
                                </span>
                                <span>
                                  Khu trưng bày về chiến tranh chống Pháp
                                  (1945-1954)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  2
                                </span>
                                <span>
                                  Khu trưng bày về chiến tranh chống Mỹ
                                  (1954-1975)
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  3
                                </span>
                                <span>Khu trưng bày vũ khí các thời kỳ</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  4
                                </span>
                                <span>Khu trưng bày hiện vật lịch sử</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-stone-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Khu trưng bày ngoài trời
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  1
                                </span>
                                <span>
                                  Khu trưng bày máy bay, trực thăng quân sự
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  2
                                </span>
                                <span>Khu trưng bày xe tăng, pháo binh</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
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
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-olive-800">
                          <Accessibility className="h-5 w-5 mr-2" /> Tiện ích
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-stone-50 p-4 rounded-lg text-center">
                            <Coffee className="h-6 w-6 mx-auto mb-2 text-olive-800" />
                            <p className="text-sm">Quán cà phê</p>
                          </div>
                          <div className="bg-stone-50 p-4 rounded-lg text-center">
                            <Camera className="h-6 w-6 mx-auto mb-2 text-olive-800" />
                            <p className="text-sm">Chụp ảnh lưu niệm</p>
                          </div>
                          <div className="bg-stone-50 p-4 rounded-lg text-center">
                            <Accessibility className="h-6 w-6 mx-auto mb-2 text-olive-800" />
                            <p className="text-sm">
                              Lối đi cho người khuyết tật
                            </p>
                          </div>
                          <div className="bg-stone-50 p-4 rounded-lg text-center">
                            <Info className="h-6 w-6 mx-auto mb-2 text-olive-800" />
                            <p className="text-sm">Quầy thông tin</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-olive-800 rounded-full flex items-center justify-center mr-4">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">
                          Địa Điểm & Hướng Dẫn Đi Lại
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Địa chỉ mới
                        </h3>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
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
                        <p className="mb-4">
                          Địa điểm mới của Bảo tàng Lịch sử Quân sự Việt Nam nằm
                          trong khu vực phát triển mới của Hà Nội, dễ dàng tiếp
                          cận bằng nhiều phương tiện giao thông.
                        </p>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.3}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Bản đồ
                        </h3>
                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">
                              Bản đồ Bảo tàng Lịch sử Quân sự Việt Nam
                            </p>
                            {/* In a real implementation, you would embed a Google Map or similar here */}
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.4}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Hướng dẫn đi lại
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-stone-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                              <Bus className="h-5 w-5 mr-2 text-olive-800" />
                              <h4 className="font-medium">Bằng xe buýt</h4>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              Các tuyến xe buýt đi qua khu vực:
                            </p>
                            <ul className="text-sm space-y-1 text-gray-700">
                              <li>Tuyến 32: Bến xe Mỹ Đình - Nhổn</li>
                              <li>
                                Tuyến 60: Bến xe Mỹ Đình - Đại học Quốc gia
                              </li>
                              <li>Tuyến 74: Bến xe Mỹ Đình - Cầu Diễn</li>
                            </ul>
                          </div>

                          <div className="bg-stone-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                              <Car className="h-5 w-5 mr-2 text-olive-800" />
                              <h4 className="font-medium">Bằng ô tô/taxi</h4>
                            </div>
                            <p className="text-sm text-gray-700">
                              Từ trung tâm Hà Nội, bạn có thể đi theo đường Phạm
                              Hùng hoặc đường Lê Đức Thọ để đến bảo tàng. Có bãi
                              đỗ xe rộng rãi tại bảo tàng.
                            </p>
                          </div>

                          <div className="bg-stone-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                              <Train className="h-5 w-5 mr-2 text-olive-800" />
                              <h4 className="font-medium">Bằng tàu điện</h4>
                            </div>
                            <p className="text-sm text-gray-700">
                              Khi tuyến Metro số 1 hoàn thành, bạn có thể đi đến
                              ga Mỹ Đình và đi bộ hoặc bắt xe buýt đến bảo tàng.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.5}>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Khu vực lân cận
                        </h3>
                        <p className="mb-4">
                          Bảo tàng nằm gần các địa điểm nổi tiếng khác như:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <li className="flex items-center bg-stone-50 p-3 rounded-lg">
                            <MapPin className="h-4 w-4 mr-2 text-olive-800" />
                            <span>Sân vận động Quốc gia Mỹ Đình</span>
                          </li>
                          <li className="flex items-center bg-stone-50 p-3 rounded-lg">
                            <MapPin className="h-4 w-4 mr-2 text-olive-800" />
                            <span>Trung tâm Hội nghị Quốc gia</span>
                          </li>
                          <li className="flex items-center bg-stone-50 p-3 rounded-lg">
                            <MapPin className="h-4 w-4 mr-2 text-olive-800" />
                            <span>Khu đô thị Mỹ Đình</span>
                          </li>
                          <li className="flex items-center bg-stone-50 p-3 rounded-lg">
                            <MapPin className="h-4 w-4 mr-2 text-olive-800" />
                            <span>Bến xe Mỹ Đình</span>
                          </li>
                        </ul>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rules">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-olive-800 rounded-full flex items-center justify-center mr-4">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">
                          Quy Định Tham Quan
                        </h2>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fadeUp" delay={0.2}>
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Quy định chung
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start bg-stone-50 p-4 rounded-lg">
                            <div className="mr-3 mt-1 text-olive-800">
                              <Camera className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">
                                Chụp ảnh và quay phim
                              </h4>
                              <p className="text-sm text-gray-700">
                                Được phép chụp ảnh và quay phim cho mục đích cá
                                nhân. Không sử dụng đèn flash trong các khu vực
                                trưng bày hiện vật nhạy cảm với ánh sáng. Việc
                                chụp ảnh và quay phim cho mục đích thương mại
                                cần được sự cho phép trước của ban quản lý bảo
                                tàng.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start bg-stone-50 p-4 rounded-lg">
                            <div className="mr-3 mt-1 text-red-600">
                              <Ban className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">
                                Các hành vi không được phép
                              </h4>
                              <ul className="text-sm text-gray-700 space-y-1">
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

                          <div className="flex items-start bg-stone-50 p-4 rounded-lg">
                            <div className="mr-3 mt-1 text-olive-800">
                              <Info className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">Trang phục</h4>
                              <p className="text-sm text-gray-700">
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
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Quy định đối với đoàn tham quan
                        </h3>
                        <div className="bg-stone-50 p-4 rounded-lg">
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                1
                              </span>
                              <span>
                                Đoàn tham quan từ 20 người trở lên nên đăng ký
                                trước với ban quản lý bảo tàng để được sắp xếp
                                lịch tham quan và hướng dẫn viên phù hợp.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                2
                              </span>
                              <span>
                                Trưởng đoàn chịu trách nhiệm quản lý và đảm bảo
                                các thành viên trong đoàn tuân thủ nội quy của
                                bảo tàng.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-olive-800 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
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
                        <h3 className="text-lg font-semibold mb-4 text-olive-800">
                          Lưu ý đặc biệt
                        </h3>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
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
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-8">
                    <AnimatedSection animation="fadeUp">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-olive-800 rounded-full flex items-center justify-center mr-4">
                          <HelpCircle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">
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
                  <Button className="bg-olive-800 hover:bg-olive-900">
                    <History className="mr-2 h-4 w-4" /> Lịch sử bảo tàng
                  </Button>
                </Link>
                <Link href="/vr360">
                  <Button
                    variant="outline"
                    className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
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
                <Link href="/ai-agent">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-stone-50 p-4">
        <h3 className="font-medium flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-olive-800" />
          {question}
        </h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
}
