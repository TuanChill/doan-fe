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
} from "lucide-react";
import { cn } from "@/lib/utils";
import Search from "@/components/home/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user-store";
import { usePathname } from "next/navigation";
import { get } from "lodash";
import { logoApp } from "@/components/image";
import ImageNext from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  const { isAuthenticated, clear, user } = useUserStore();

  if (!mounted) return null;

  return (
    <header className="bg-olive-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
              <span className="font-bold text-lg">VM</span>
            </div> */}
            <ImageNext src={logoApp} alt="logo" width={50} height={60} />
            <span className="font-bold text-xl hidden md:inline-block">
              Bảo tàng LSQS Việt Nam
            </span>
          </Link>

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
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Search />
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-4 py-3 text-base font-medium text-white">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="hover:bg-gray-200">
                    <Link href="/profile" className="w-full text-sm">
                      Hồ sơ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200">
                    <button
                      onClick={() => clear()}
                      className="w-full text-left text-sm"
                    >
                      Đăng xuất
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="w-full bg-red-700 hover:bg-red-800">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button and Search */}
          <div className="lg:hidden flex items-center space-x-2">
            <Search />
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
          <nav className="flex flex-col space-y-2">
            <MobileNavItem href="/" label="Trang chủ" />
            <MobileNavItem
              href="/gioi-thieu"
              label="Giới thiệu"
              subItems={[
                {
                  href: "/gioi-thieu/lich-su",
                  label: "Lịch sử bảo tàng",
                  icon: <Info className="h-5 w-5" />,
                },
                {
                  href: "/gioi-thieu/thong-tin-tham-quan",
                  label: "Thông tin tham quan",
                  icon: <Clock className="h-5 w-5" />,
                },
              ]}
            />
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
          </nav>

          <div className="pt-4 border-t border-olive-800">
            {isAuthenticated() ? (
              <div className="flex items-center px-4 py-3 text-base font-medium text-white">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{get(user, "fullName", "Tài khoản của bạn")}</span>
                  <div className="flex mt-2 space-x-2">
                    <Link
                      href="/profile"
                      className="text-sm text-amber-300 hover:text-amber-200"
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={() => clear()}
                      className="text-sm text-amber-300 hover:text-amber-200"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button className="w-full bg-red-700 hover:bg-red-800">
                  Đăng nhập
                </Button>
              </Link>
            )}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 mt-3">
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

// Replace the existing MobileNavItem component with this updated version that supports submenus
function MobileNavItem({
  href,
  label,
  icon,
  highlight = false,
  subItems,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  subItems?: { href: string; label: string; icon?: React.ReactNode }[];
}) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // If there are no subitems, render a simple link
  if (!subItems || subItems.length === 0) {
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

  // If there are subitems, render a dropdown
  return (
    <div>
      <button
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
        className={cn(
          "w-full px-4 py-3 rounded-md text-base font-medium flex items-center justify-between transition-colors",
          highlight
            ? "bg-amber-600 hover:bg-amber-700 text-white"
            : "text-white hover:bg-white/10"
        )}
      >
        <div className="flex items-center space-x-3">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isSubMenuOpen && "transform rotate-180"
          )}
        />
      </button>

      {/* Submenu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 pl-4",
          isSubMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        {subItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-base text-white/90 hover:text-white hover:bg-white/10 rounded-md mt-1"
          >
            {item.icon && <span className="mr-3">{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
