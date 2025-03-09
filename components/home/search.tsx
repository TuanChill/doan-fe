"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, X, ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Sample search data - in a real app, this would come from a database or API
const SEARCH_DATA = [
  {
    id: 1,
    title: "Khu trưng bày chiến tranh chống Pháp",
    description:
      "Khám phá các hiện vật, hình ảnh và tài liệu về cuộc kháng chiến chống thực dân Pháp (1945-1954).",
    category: "Khu vực",
    url: "/vr360",
  },
  {
    id: 2,
    title: "Khu trưng bày chiến tranh chống Mỹ",
    description:
      "Tìm hiểu về cuộc kháng chiến chống Mỹ cứu nước (1954-1975) qua các hiện vật và tài liệu lịch sử.",
    category: "Khu vực",
    url: "/vr360",
  },
  {
    id: 3,
    title: "Xe tăng T-54 đầu tiên tiến vào Dinh Độc Lập",
    description:
      "Xe tăng T-54 số hiệu 843 đã húc đổ cổng Dinh Độc Lập vào trưa ngày 30/4/1975.",
    category: "Hiện vật",
    url: "/hien-vat/1",
  },
  {
    id: 4,
    title: "Máy bay MiG-21 của Anh hùng Phạm Tuân",
    description:
      "Máy bay MiG-21 do Anh hùng Phạm Tuân điều khiển bắn rơi máy bay B-52 của Mỹ.",
    category: "Hiện vật",
    url: "/hien-vat/2",
  },
  {
    id: 5,
    title: "Triển lãm 'Chiến thắng Điện Biên Phủ'",
    description:
      "Triển lãm kỷ niệm 70 năm Chiến thắng Điện Biên Phủ (7/5/1954 - 7/5/2024).",
    category: "Sự kiện",
    url: "/tin-tuc/1",
  },
  {
    id: 6,
    title: "Hướng dẫn tham quan VR360°",
    description:
      "Hướng dẫn chi tiết cách sử dụng tính năng tham quan VR360° của bảo tàng.",
    category: "Hướng dẫn",
    url: "/vr360",
  },
  {
    id: 7,
    title: "Giờ mở cửa và giá vé",
    description: "Thông tin về giờ mở cửa và giá vé tham quan bảo tàng.",
    category: "Thông tin",
    url: "/mua-ve",
  },
  {
    id: 8,
    title: "Đại bác thần công thời Nguyễn",
    description:
      "Bộ sưu tập đại bác thần công được đúc dưới triều Nguyễn, thế kỷ 19.",
    category: "Hiện vật",
    url: "/hien-vat/3",
  },
];

// Recent searches - would be stored in localStorage in a real app
const RECENT_SEARCHES = ["chiến tranh", "vũ khí", "triển lãm", "vé tham quan"];

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SEARCH_DATA>([]);
  const [recentSearches, setRecentSearches] =
    useState<string[]>(RECENT_SEARCHES);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close search on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        const newRecentSearches = [searchQuery, ...recentSearches.slice(0, 3)];
        setRecentSearches(newRecentSearches);
        // In a real app, save to localStorage here
      }
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10"
        onClick={() => setIsOpen(true)}
        aria-label="Tìm kiếm"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {/* Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={searchRef}
          className={cn(
            "bg-white w-full max-w-4xl mx-auto mt-20 rounded-lg shadow-xl transition-transform duration-200 overflow-hidden",
            isOpen ? "translate-y-0" : "-translate-y-10"
          )}
        >
          {/* Search Header */}
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm trong bảo tàng..."
                className="flex-1 outline-none text text-black"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <Button
                type="submit"
                size="sm"
                className="ml-2 bg-olive-800 hover:bg-olive-900"
              >
                Tìm kiếm
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </Button>
            </form>
          </div>

          {/* Search Content */}
          <div className="max-h-[70vh] overflow-y-auto">
            {/* Recent Searches */}
            {searchQuery === "" && recentSearches.length > 0 && (
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Tìm kiếm gần đây
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-black"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchQuery !== "" && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  {searchResults.length > 0
                    ? `Tìm thấy ${searchResults.length} kết quả cho "${searchQuery}"`
                    : `Không tìm thấy kết quả nào cho "${searchQuery}"`}
                </h3>

                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <Link
                        href={result.url}
                        key={result.id}
                        onClick={() => setIsOpen(false)}
                        className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                                <Tag className="h-3 w-3 mr-1" />{" "}
                                {result.category}
                              </span>
                            </div>
                            <h4 className="font-medium text-olive-900">
                              {result.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {result.description}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 mt-1 ml-2" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <SearchIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">
                      Không tìm thấy kết quả
                    </h4>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Không tìm thấy kết quả nào cho &quot;{searchQuery}&quot;.
                      Vui lòng thử lại với từ khóa khác.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Categories - shown when no search query */}
            {searchQuery === "" && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Danh mục
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <CategoryCard
                    title="Khu vực trưng bày"
                    count={5}
                    color="bg-olive-800"
                    url="/vr360"
                    onClick={() => setIsOpen(false)}
                  />
                  <CategoryCard
                    title="Hiện vật"
                    count={120}
                    color="bg-green-700"
                    url="/hien-vat"
                    onClick={() => setIsOpen(false)}
                  />
                  <CategoryCard
                    title="Sự kiện"
                    count={8}
                    color="bg-red-700"
                    url="/tin-tuc"
                    onClick={() => setIsOpen(false)}
                  />
                  <CategoryCard
                    title="Hướng dẫn"
                    count={4}
                    color="bg-amber-600"
                    url="/gioi-thieu"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Category Card Component
function CategoryCard({
  title,
  count,
  color,
  url,
  onClick,
}: {
  title: string;
  count: number;
  color: string;
  url: string;
  onClick: () => void;
}) {
  return (
    <Link href={url} onClick={onClick}>
      <div className="bg-white border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
        <div className={`${color} h-2`}></div>
        <div className="p-3">
          <h4 className="font-medium text-black">{title}</h4>
          <p className="text-sm text-gray-500">{count} mục</p>
        </div>
      </div>
    </Link>
  );
}
