"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  Tag,
  Share2,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TextToSpeechPlayer from "@/components/text-to-speech";
import { getPostDetail } from "@/request/post";
import { get } from "lodash";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  const handleGetPost = async () => {
    try {
      setIsLoading(true);
      const res = await getPostDetail(params.slug);

      const post = get(res, "data", null);

      setArticle(post);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const firstViewRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToFirst = () => {
    if (!firstViewRef.current) return;
    firstViewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    handleGetPost();
    // Set the share URL when component mounts
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {"Không tìm thấy bài viết"}
          </h1>
          <Link href="/tin-tuc">
            <Button>Quay lại trang tin tức</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Prepare sections for text-to-speech
  const speechSections = [
    { title: get(article, "title", ""), content: get(article, "excerpt", "") },
    ...get(article, "content.content", []).map((section: any) => ({
      title: section.heading || "Nội dung",
      content: section.text,
    })),
  ];

  return (
    <div className="container mx-auto py-8 relative">
      <div ref={firstViewRef}></div>
      <div className="mb-6">
        <Link href="/tin-tuc">
          <Button variant="ghost" className="pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại trang tin tức
          </Button>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <Badge className="mb-4">{article.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {article.date}
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4" />
            {get(article, "tag.name", "--")}
          </div>
        </div>

        <div className="relative mb-8">
          {article.image && (
            <>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                  article,
                  "image.url",
                  ""
                )}`}
                alt={article.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              {article.imageCaption && (
                <p className="text-sm text-center text-muted-foreground mt-2">
                  {article.imageCaption}
                </p>
              )}
            </>
          )}
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl font-medium leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <Separator className="my-8" />

          {article.content.content.map((section: any, index: number) => (
            <div key={index} className="mb-8">
              {section.heading && (
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              )}
              <p className="mb-4">{section.text}</p>
              {section.image && (
                <div className="my-6">
                  <img
                    src={section.image || "/placeholder.svg"}
                    alt={section.imageAlt || "Hình ảnh bài viết"}
                    className="w-full rounded-lg"
                  />
                  {section.imageCaption && (
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      {section.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-b py-4 mb-8">
          <div>
            <span className="text-sm text-muted-foreground">Thẻ: </span>
            <Badge variant="outline" className="mr-2">
              {get(article, "tag.name", "--")}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Chia sẻ
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="p-2 flex flex-col gap-2"
            >
              <DropdownMenuItem className="cursor-pointer p-0 flex items-center">
                <FacebookShareButton
                  url={shareUrl}
                  quote={article.title}
                  className="w-full flex items-center p-2"
                >
                  <div className="flex items-center gap-1">
                    <FacebookIcon size={24} round className="mr-2" />
                    <span>Facebook</span>
                  </div>
                </FacebookShareButton>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-0 flex items-center">
                <FacebookMessengerShareButton
                  url={shareUrl}
                  appId=""
                  className="w-full flex items-center p-2"
                >
                  <div className="flex items-center gap-1">
                    <FacebookMessengerIcon size={24} round className="mr-2" />
                    <span>Messenger</span>
                  </div>
                </FacebookMessengerShareButton>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer p-0 flex items-center">
                <LinkedinShareButton
                  url={shareUrl}
                  title={article.title}
                  summary={article.excerpt}
                  className="w-full flex items-center p-2"
                >
                  <div className="flex items-center gap-1">
                    <LinkedinIcon size={24} round className="mr-2" />
                    <span>LinkedIn</span>
                  </div>
                </LinkedinShareButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Về tác giả</h3>
          <p className="text-muted-foreground">
            {get(
              article,
              "authorBio",
              "Thông tin về tác giả chưa được cập nhật."
            ) || "Thông tin về tác giả chưa được cập nhật."}
          </p>
        </div>
      </article>
      <div
        onClick={handleScrollToFirst}
        className="fixed bottom-[80px] size-12 flex justify-center items-center rounded-full right-4 bg-gray-100 cursor-pointer shadow-md"
      >
        <ChevronUp size={24} color="black" />
      </div>
      {/* Text-to-speech player */}
      <TextToSpeechPlayer sections={speechSections} />
    </div>
  );
}
