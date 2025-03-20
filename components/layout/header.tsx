"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Map,
  MessageSquareText,
  Ticket,
  Newspaper,
  Image,
  Info,
  Clock,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Search from "@/components/home/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user-store";
import { APP_ROUTES } from "@/const/route";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isAuthenticated, clear } = useUserStore();

  if (!mounted) return null;

  return (
    <header className="bg-olive-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
              <span className="font-bold text-lg">VM</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">
              Bảo tàng LSQS Việt Nam
            </span>
          </Link>

          {/* <Link href="/" className="flex items-center space-x-2">
            <img
              src=""
              alt="Logo Bảo tàng LSQS Việt Nam"
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-xl hidden md:inline-block">
              Bảo tàng LSQS Việt Nam
            </span>
          </Link> */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavItem href="/" label="Trang chủ" />
            <NavDropdown
              label="Giới thiệu"
              items={[
                {
                  href: "/gioi-thieu/lich-su",
                  label: "Lịch sử bảo tàng",
                  icon: <Info className="h-4 w-4" />,
                },
                {
                  href: "/gioi-thieu/thong-tin-tham-quan",
                  label: "Thông tin tham quan",
                  icon: <Clock className="h-4 w-4" />,
                },
              ]}
            />
            <NavItem
              href="/tin-tuc"
              label="Tin tức & Sự kiện"
              icon={<Newspaper className="h-4 w-4" />}
            />
            <NavItem
              href="/vr360"
              label="Tham quan VR360°"
              icon={<Map className="h-4 w-4" />}
              highlight
            />
            <NavItem
              href="/hien-vat"
              label="Hiện vật"
              icon={<Image className="h-4 w-4" />}
            />
            <NavItem
              href="/ai-agent"
              label="AI Hỏi đáp"
              icon={<MessageSquareText className="h-4 w-4" />}
            />
            <NavItem
              href="/contact"
              label="Liên hệ"
              icon={<Mail className="h-4 w-4" />}
            />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Search />
            </div>
            {isAuthenticated() ? (
              <div className="relative">
                <Avatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    <Link
                      href={APP_ROUTES.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tài khoản
                    </Link>
                    <button
                      onClick={() => {
                        clear();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href={APP_ROUTES.LOGIN}>
                <Button className="bg-red-700 hover:bg-red-800">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button and Search */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden bg-olive-900 overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="mb-4">
            <Search />
          </div>
          <nav className="flex flex-col space-y-2">
            <MobileNavItem href="/" label="Trang chủ" />
            <MobileNavItem href="/gioi-thieu" label="Giới thiệu" />
            <MobileNavItem
              href="/tin-tuc"
              label="Tin tức & Sự kiện"
              icon={<Newspaper className="h-5 w-5" />}
            />
            <MobileNavItem
              href="/vr360"
              label="Tham quan VR360°"
              icon={<Map className="h-5 w-5" />}
              highlight
            />
            <MobileNavItem
              href="/hien-vat"
              label="Hiện vật"
              icon={<Image className="h-5 w-5" />}
            />
            <MobileNavItem
              href="/ai-agent"
              label="AI Hỏi đáp"
              icon={<MessageSquareText className="h-5 w-5" />}
            />
            <MobileNavItem
              href="/contact"
              label="Liên hệ "
              icon={<Mail className="h-5 w-5" />}
            />
          </nav>

          <div className="pt-4 border-t border-olive-800">
            <Button className="w-full bg-red-700 hover:bg-red-800">
              <Ticket className="h-5 w-5 mr-2" /> Mua vé tham quan
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Navigation Item Component
function NavItem({
  href,
  label,
  icon,
  highlight = false,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors",
        highlight
          ? "bg-amber-600 hover:bg-amber-700 text-white"
          : "text-white hover:bg-white/10"
      )}
    >
      {icon && icon}
      <span>{label}</span>
    </Link>
  );
}

// Navigation Dropdown Component
function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string; icon?: React.ReactNode }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before closing
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 text-white hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.icon && (
                  <span className="mr-2 text-gray-500">{item.icon}</span>
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Navigation Item Component
function MobileNavItem({
  href,
  label,
  icon,
  highlight = false,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-colors",
        highlight
          ? "bg-amber-600 hover:bg-amber-700 text-white"
          : "text-white hover:bg-white/10"
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}
