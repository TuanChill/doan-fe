"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/const/route";
import { logoApp } from "@/components/image";
import ImageNext from "next/image";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-olive-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <ImageNext src={logoApp} alt="logo" width={100} height={100} />
              </div>
              <span className="font-bold text-xl">Bảo tàng LSQS</span>
            </div>
            <p className="text-gray-300 mb-4">
              Bảo tàng Lịch sử Quân sự Việt Nam là nơi lưu giữ và trưng bày các
              hiện vật, tài liệu quý giá về lịch sử quân sự của dân tộc Việt
              Nam.
            </p>
            <div className="flex space-x-3">
              <SocialButton
                icon={<Facebook className="h-5 w-5" />}
                href="https://facebook.com"
              />
              <SocialButton
                icon={<Twitter className="h-5 w-5" />}
                href="https://twitter.com"
              />
              <SocialButton
                icon={<Instagram className="h-5 w-5" />}
                href="https://instagram.com"
              />
              <SocialButton
                icon={<Youtube className="h-5 w-5" />}
                href="https://youtube.com"
              />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <FooterLink href="/gioi-thieu/lich-su" label="Giới thiệu" />
              <FooterLink href="/tin-tuc" label="Tin tức & Sự kiện" />
              <FooterLink href="/vr360" label="Tham quan VR360°" />
              <FooterLink href="/hien-vat" label="Hiện vật trưng bày" />
              <FooterLink href="/ai-agent" label="AI Hỏi đáp" />
              <FooterLink href="/mua-ve" label="Mua vé tham quan" />
            </ul>
          </div>

          {/* Column 3 - Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Giờ mở cửa</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Thứ Hai - Thứ Sáu:</span>
                <span>8:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thứ Bảy - Chủ Nhật:</span>
                <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Ngày Lễ:</span>
                <span>9:00 - 16:00</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-olive-800">
              <Button
                onClick={() => router.push(APP_ROUTES.MUA_VE)}
                className="w-full bg-red-700 hover:bg-red-800"
              >
                Mua vé tham quan
              </Button>
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-red-500 mt-0.5" />
                <span>28A Điện Biên Phủ, Ba Đình, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-500" />
                <span>(024) 3733 4464</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-red-500" />
                <span>info@btlsqsvn.vn</span>
              </li>
            </ul>
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5596609032596!2d105.75152857601942!3d21.01028118841144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba2b73d5d13%3A0xa6a0ef366328a0b1!2zQuG6o28gdMOgbmcgTOG7i2NoIHPhu60gUXXDom4gc-G7sSBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1741533624214!5m2!1svi!2s"
                width="600"
                height="450"
                className="w-full h-32 rounded-lg border-2 border-olive-800"
                loading="lazy"
                title="Bản đồ Bảo tàng Lịch sử Quân sự Việt Nam"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-olive-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2 justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Bảo tàng Lịch sử Quân sự Việt Nam.
              Tất cả các quyền được bảo lưu.
            </p>
            {/* <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                href="/chinh-sach-bao-mat"
                className="text-gray-400 text-sm hover:text-white"
              >
                Chính sách bảo mật
              </Link>
              <span>|</span>
              <Link
                href="/dieu-khoan-su-dung"
                className="text-gray-400 text-sm hover:text-white"
              >
                Điều khoản sử dụng
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Button Component
function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-olive-800 flex items-center justify-center hover:bg-red-700 transition-colors"
    >
      {icon}
    </a>
  );
}

// Footer Link Component
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-300 hover:text-white transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}
