"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Calendar } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getPostCategory,
  getPostByCategory,
  getPostHighlight,
} from "@/request/post";
import { get } from "lodash";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInterval } from "@/hooks/use-interval";
import Autoplay from "embla-carousel-autoplay";
import { useDebouncedCallback } from "use-debounce";
import { searchPost } from "@/lib/melisearch";
import { createHistorySearch } from "@/request/history-search";
import { useUserStore } from "@/stores/user-store";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [highlightNews, setHighlightNews] = useState([]);
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const { user } = useUserStore();

  const handleGetHighlightNews = useCallback(async () => {
    try {
      const res = await getPostHighlight(1, 6);
      setHighlightNews(get(res, "data", []));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleGetCategories = async () => {
    try {
      const res = await getPostCategory();
      setCategories(get(res, "data", []));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetLatestNews = useCallback(async () => {
    try {
      if (selectedCategory !== "all") {
        const res = await getPostByCategory(1, 6, selectedCategory);
        setLatestNews(get(res, "data", []));
      } else {
        const res = await getPostByCategory(1, 6);
        setLatestNews(get(res, "data", []));
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    handleGetLatestNews();
    handleGetHighlightNews();
  }, [handleGetLatestNews, handleGetHighlightNews, selectedCategory]);

  const handleSearchPost = useDebouncedCallback(async () => {
    try {
      if (selectedCategory === "all") {
        const res = await searchPost(page, pageSize, searchTerm.trim());
        setPosts(get(res, "hits", []));
        setTotal(get(res, "total", 0));
      } else {
        const res = await searchPost(page, pageSize, searchTerm.trim(), [
          selectedCategory,
        ]);
        setPosts(get(res, "hits", []));
        setTotal(get(res, "total", 0));
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (user?.id && searchTerm.trim().length > 0) {
        await createHistorySearch(user.id.toString(), searchTerm.trim());
      }
    } catch (error) {
      console.error("Error creating history search:", error);
    }
  }, 500);

  useEffect(() => {
    handleSearchPost();
  }, [searchTerm, selectedCategory, page, pageSize]);

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" className="p-0 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Trang chủ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Tin tức & Sự kiện</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tin tức..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={get(category, "id", "")}
                  value={get(category, "id", "")}
                >
                  {get(category, "name", "")}
                </SelectItem>
              ))}
              <SelectItem value="all">Tất cả danh mục</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {highlightNews.map((news) => (
                <CarouselItem key={get(news, "documentId", "")}>
                  <div className="relative rounded-xl overflow-hidden mb-6 group">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                        news,
                        "image.url",
                        ""
                      )}`}
                      alt={get(news, "title", "")}
                      width={1000}
                      height={400}
                      className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                      <Badge className="mb-2 bg-red-600 hover:bg-red-700 w-fit">
                        Tin nổi bật
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {get(news, "title", "")}
                      </h2>
                      <p className="text-gray-200 mb-4 max-w-3xl">
                        {get(news, "summary", "")}
                      </p>
                      <Link
                        href={`/tin-tuc/bai-viet/${get(
                          news,
                          "documentId",
                          ""
                        )}`}
                      >
                        <Button className="w-fit">Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    current === index + 1 ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Tin mới nhất</h2>
          </div>
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
            {latestNews.map((news) => (
              <Link
                href={`/tin-tuc/bai-viet/${get(news, "documentId", "")}`}
                key={get(news, "documentId", "")}
              >
                <div className="flex gap-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                      news,
                      "image.url",
                      ""
                    )}`}
                    alt={get(news, "title", "")}
                    width={96}
                    height={96}
                    className="object-cover rounded-md flex-shrink-0 group-hover:shadow-md transition-all"
                  />
                  <div>
                    {get(news, "category", "") && (
                      <Badge variant="outline" className="mb-1">
                        {get(news, "category", "")}
                      </Badge>
                    )}
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {get(news, "title", "")}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {get(news, "date", "")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold">Tất cả tin tức</h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
            <p className="text-muted-foreground">
              Vui lòng thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((news) => (
                <Card
                  key={get(news, "documentId", "")}
                  className="overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                        news,
                        "image.url",
                        ""
                      )}`}
                      alt={get(news, "title", "")}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      {get(news, "category.name", "") && (
                        <Badge
                          variant="outline"
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          {get(news, "category.name", "")}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center mb-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{get(news, "date", "")}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {get(news, "title", "")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {get(news, "excerpt", "")}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link
                      href={`/tin-tuc/bai-viet/${get(news, "documentId", "")}`}
                    >
                      <Button
                        variant="link"
                        className="p-0 group-hover:underline"
                      >
                        Đọc tiếp
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({
                    length: Math.min(5, Math.ceil(total / pageSize)),
                  }).map((_, i) => {
                    const pageToShow =
                      page > 3
                        ? i === 0
                          ? 1
                          : i === 4
                          ? Math.ceil(total / pageSize)
                          : page - 2 + i
                        : i + 1;

                    if (page > 3 && i === 1) {
                      return (
                        <PaginationItem key="ellipsis-start">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    if (
                      Math.ceil(total / pageSize) > 5 &&
                      page < Math.ceil(total / pageSize) - 2 &&
                      i === 3
                    ) {
                      return (
                        <PaginationItem key="ellipsis-end">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    if (pageToShow > Math.ceil(total / pageSize)) {
                      return null;
                    }

                    return (
                      <PaginationItem key={pageToShow}>
                        <PaginationLink
                          isActive={pageToShow === page}
                          onClick={() => setPage(pageToShow)}
                        >
                          {pageToShow}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((prev) =>
                          Math.min(prev + 1, Math.ceil(total / pageSize))
                        )
                      }
                      className={
                        page >= Math.ceil(total / pageSize)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
