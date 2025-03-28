"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  X,
  ArrowRight,
  Clock,
  Tag,
  Loader2,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { overallSearch } from "@/lib/melisearch";
import { getCountPost } from "@/request/post";
import { getCountExhibit } from "@/request/exhibit";
import { assign, flatMap, get, map } from "lodash";
import { SearchType } from "@/types/search";
import { Badge } from "@/components/ui/badge";
import {
  createHistorySearch,
  getHistorySearch,
} from "@/request/history-search";
import { useUserStore } from "@/stores/user-store";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [countPost, setCountPost] = useState(0);
  const [countExhibit, setCountExhibit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useUserStore();

  const handleGetCount = async () => {
    try {
      const resPost = await getCountPost();
      const resExhibit = await getCountExhibit();
      setCountPost(get(resPost, "meta.pagination.total", 0));
      setCountExhibit(get(resExhibit, "meta.pagination.total", 0));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRecentSearches = async () => {
    try {
      if (user?.id) {
        const res = await getHistorySearch(user?.id.toString(), 1, 4);
        setRecentSearches(get(res, "data", []));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchOverall = useDebouncedCallback(async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const res = await overallSearch(1, 10, searchQuery.trim());

      const results = get(res, "results", []);

      const allHits = flatMap(results, (result) => {
        return map(result.hits, (hit) => {
          return assign({}, hit, { indexUid: result.indexUid });
        });
      });

      setSearchResults(allHits);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    try {
      if (user?.id && searchQuery.trim().length > 0) {
        await createHistorySearch(user.id.toString(), searchQuery.trim());
      }
    } catch (error) {
      console.error("Error creating history search:", error);
    }

    try {
      await handleGetRecentSearches();
    } catch (error) {
      console.log(error);
    }
  }, 1000);

  useEffect(() => {
    handleGetCount();
    handleGetRecentSearches();
  }, []);

  // Handle search
  useEffect(() => {
    handleSearchOverall();
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      await handleSearchOverall();
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

  // Add a function to handle voice input
  const handleVoiceInput = (text: string) => {
    setSearchQuery(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Add a function to toggle voice listening
  const toggleVoiceListening = () => {
    setIsListening(!isListening);
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "vi-VN"; // Vietnamese language

        // recognitionInstance.onresult = (event: any) => {
        //   let finalTranscript = "";
        //   let currentInterimTranscript = "";

        //   for (let i = event.resultIndex; i < event.results.length; i++) {
        //     const transcript = event.results[i][0].transcript;
        //     if (event.results[i].isFinal) {
        //       finalTranscript += transcript;
        //     } else {
        //       currentInterimTranscript += transcript;
        //     }
        //   }

        //   if (finalTranscript) {
        //     setSearchQuery(finalTranscript);
        //     setInterimTranscript("");
        //   } else {
        //     setInterimTranscript(currentInterimTranscript);
        //   }
        // };
        recognitionInstance.onresult = (event: any) => {
          let transcript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }

          setSearchQuery(transcript); // Cập nhật trực tiếp vào ô tìm kiếm
        };

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          if (isListening) {
            recognitionInstance.start();
          }
        };

        setRecognition(recognitionInstance);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const startListening = () => {
    if (!recognition) return;

    recognition.start();
    setIsListening(true);
    setInterimTranscript("");

    // Make sure search is open when starting voice search
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const stopListening = () => {
    if (!recognition) return;

    recognition.stop();
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 bg-white/10"
          onClick={() => setIsOpen(true)}
          aria-label="Tìm kiếm"
        >
          <span className="text-xs text-white mr-1">Tìm kiếm</span>
          <SearchIcon className="h-5 w-5" />
        </Button>

        {/* <Button
          variant="ghost"
          size="icon"
          onClick={startListening}
          className={`relative text-white hover:bg-white/20 bg-white/10 ${
            isListening ? "text-red-500" : ""
          }`}
          title="Tìm kiếm bằng giọng nói"
        > */}
        {/* <Mic className="h-5 w-5" /> */}
        {/* {isListening && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </Button> */}
      </div>

      {/* Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-200 overflow-y-auto overflow-x-hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={searchRef}
          className={cn(
            "bg-white w-[95%] max-w-4xl mx-auto mt-20 rounded-lg shadow-xl transition-transform duration-200 overflow-hidden",
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
                type="button"
                onClick={toggleListening}
                variant="ghost"
                size="icon"
                className={`ml-1 ${
                  isListening
                    ? "text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {/* mic ở textbox */}
                <Mic className="h-5 w-5" />
                {isListening && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </Button>
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

          {/* Voice Recognition Popup */}
          {/* {isListening && (
            // <div className="absolute z-50 top-32 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-64 border"></div>
          )} */}

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
                      onClick={() =>
                        handleRecentSearchClick(
                          String(get(search, "search", ""))
                        )
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-black"
                    >
                      {String(get(search, "search", ""))}
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

                {isLoading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                  </div>
                )}

                {!isLoading && searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((result) => {
                      if (result.indexUid === SearchType.POST) {
                        return (
                          <Link
                            href={`/tin-tuc/${get(result, "documentId", "")}`}
                            key={result.id}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div className="flex gap-2 items-center mb-1">
                                  <Badge variant="outline">
                                    Tin tức & sự kiện
                                  </Badge>
                                  {get(result, "category.name", "") && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                                      <Tag className="h-3 w-3 mr-1" />
                                      {get(result, "category.name", "")}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-medium text-olive-900">
                                  {get(result, "title", "")}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {get(result, "excerpt", "")}
                                </p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400 mt-1 ml-2" />
                            </div>
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            href={`/hien-vat/${get(result, "documentId", "")}`}
                            key={result.id}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div className="flex gap-2 items-center mb-1">
                                  <Badge variant="outline">Hiện vật</Badge>
                                  {get(
                                    result,
                                    "category_artifact.name",
                                    ""
                                  ) && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
                                      <Tag className="h-3 w-3 mr-1" />{" "}
                                      {get(
                                        result,
                                        "category_artifact.name",
                                        ""
                                      )}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-medium text-olive-900">
                                  {get(result, "name", "")}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                                  {get(result, "history", "")}
                                </p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400 mt-1 ml-2" />
                            </div>
                          </Link>
                        );
                      }
                    })}
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
                <div className="grid grid-cols-2 gap-3">
                  <CategoryCard
                    title="Hiện vật"
                    count={countExhibit}
                    color="bg-green-700"
                    url="/hien-vat"
                    onClick={() => setIsOpen(false)}
                  />
                  <CategoryCard
                    title="Tin tức & sự kiện"
                    count={countPost}
                    color="bg-red-700"
                    url="/tin-tuc"
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
