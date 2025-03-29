"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getPostHighlight,
  getPostList,
  getPostUpcomingEvents,
} from "@/request/post";
import { get } from "lodash";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [highlightArticle, setHighlightArticle] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  const handleGetHighlightArticle = async () => {
    try {
      const res = await getPostHighlight(1, 4);
      const posts = get(res, "data", []);
      setHighlightArticle(posts[0]);
      setFeaturedArticles(posts.slice(1));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUpcomingEvents = async () => {
    try {
      const res = await getPostUpcomingEvents(1, 4);
      const posts = get(res, "data", []);
      setUpcomingEvents(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetLatestArticles = async () => {
    try {
      const res = await getPostList({ page: 1, limit: 4 });
      const posts = get(res, "data", []);

      // If we got posts from the API, use them
      if (posts && posts.length > 0) {
        setLatestArticles(posts);
      } else {
        // Otherwise, use the static data as fallback
        console.log("Using fallback data for latest articles");
        setLatestArticles(latestArticles);
      }
    } catch (error) {
      console.log("Error in handleGetLatestArticles:", error);
      // Use static data as fallback
      setLatestArticles(latestArticles);
    }
  };

  const router = useRouter();

  useEffect(() => {
    handleGetHighlightArticle();
    handleGetLatestArticles();
    handleGetUpcomingEvents();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-xl mb-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${get(
              highlightArticle,
              "image.url",
              ""
            )}`}
            alt={get(highlightArticle, "title", "")}
            className="w-full h-[500px] object-cover"
            loading="eager"
            width={1000}
            height={500}
          />
          <div className="absolute bottom-0 left-0 p-6 z-20 max-w-2xl">
            <Badge className="mb-2 bg-red-600 hover:bg-red-700">
              Sự kiện nổi bật
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {get(highlightArticle, "title", "")}
            </h1>
            <p className="text-gray-200 mb-4">
              {get(highlightArticle, "excerpt", "")}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() =>
                  router.push(
                    `/tin-tuc/bai-viet/${get(
                      highlightArticle,
                      "documentId",
                      ""
                    )}`
                  )
                }
                className="shadow-lg border border-white"
              >
                Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {featuredArticles.map((article) => (
            <motion.div
              key={get(article, "documentId", "")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                      article,
                      "image.url",
                      ""
                    )}`}
                    alt={get(article, "title", "")}
                    className="w-full h-full object-cover cursor-pointer"
                    whileHover={{
                      filter: "brightness(1.1) contrast(1.1)",
                      transition: { duration: 0.3 },
                    }}
                    onClick={() =>
                      router.push(
                        `/tin-tuc/bai-viet/${get(article, "documentId", "")}`
                      )
                    }
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary/0"
                    whileHover={{
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.3 },
                    }}
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={"secondary"}>
                      {get(article, "category.name", "")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {get(article, "date", "")}
                    </span>
                  </div>
                  <CardTitle className="text-lg">
                    {get(article, "title", "")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {get(article, "excerpt", "")}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link
                    href={`/tin-tuc/bai-viet/${get(article, "documentId", "")}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="link" className="p-0">
                        Đọc tiếp
                      </Button>
                    </motion.div>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tin tức mới nhất</h2>
          <Link href="/tin-tuc/bai-viet">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">Xem tất cả</Button>
            </motion.div>
          </Link>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {latestArticles.map((article) => (
            <motion.div
              key={get(article, "id", "")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                      article,
                      "image.url",
                      ""
                    )}`}
                    alt={get(article, "title", "")}
                    className="w-full h-full object-cover cursor-pointer"
                    whileHover={{
                      filter: "brightness(1.1) contrast(1.1)",
                      transition: { duration: 0.3 },
                    }}
                    onClick={() =>
                      router.push(
                        `/tin-tuc/bai-viet/${get(article, "documentId", "")}`
                      )
                    }
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary/0"
                    whileHover={{
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.3 },
                    }}
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">
                      {get(article, "tag.name", "")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {get(article, "date", "")}
                    </span>
                  </div>
                  <CardTitle className="text-base">
                    {get(article, "title", "")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {get(article, "excerpt", "")}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link
                    href={`/tin-tuc/bai-viet/${get(article, "documentId", "")}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="link" className="p-0">
                        Đọc tiếp
                      </Button>
                    </motion.div>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {upcomingEvents.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sự kiện sắp diễn ra</h2>
            <Link href="/tin-tuc/bai-viet">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline">Xem tất cả</Button>
              </motion.div>
            </Link>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={get(event, "documentId", "")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                        event,
                        "image.url",
                        ""
                      )}`}
                      alt={get(event, "title", "")}
                      className="w-full h-full object-cover"
                      whileHover={{
                        filter: "brightness(1.1) contrast(1.1)",
                        transition: { duration: 0.3 },
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-primary/0"
                      whileHover={{
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.3 },
                      }}
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">
                        {get(event, "tag.name", "")}
                      </Badge>
                      <span className="text-xs font-medium text-red-600">
                        {get(event, "date", "")}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {get(event, "title", "")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">
                      {get(event, "location", "")}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {get(event, "description", "")}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link
                      href={`/tin-tuc/bai-viet/${get(event, "documentId", "")}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="link" className="p-0">
                          Chi tiết
                        </Button>
                      </motion.div>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}
