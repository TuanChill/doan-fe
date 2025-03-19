"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";
import ArtifactSpotlight from "@/components/artifacts/artifact-spotlight";
import ArtifactCard from "@/components/artifacts/artifact-card";
import ArtifactListItem from "@/components/artifacts/artifact-list-item";
import { getCategoryArtifact, getExhibitList } from "@/request/exhibit";
import { get } from "lodash";

export default function ArtifactsPage() {
  // State cho dữ liệu từ API
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredArtifact, setFeaturedArtifact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredArtifacts, setFilteredArtifacts] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(true);
  const [compareItems, setCompareItems] = useState<number[]>([]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState([1000, 2000]);

  // Ref for scroll position
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategoryArtifact();
      const categoryData = get(response, "data", []);
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch artifacts
  const fetchArtifacts = async () => {
    setIsLoading(true);
    try {
      const response = await getExhibitList(currentPage, itemsPerPage);
      const artifactData = get(response, "data", []);
      setArtifacts(artifactData);
      setFilteredArtifacts(artifactData);

      // Set featured artifact (first item or a specific featured one if API provides that info)
      if (artifactData.length > 0) {
        setFeaturedArtifact(artifactData[0]);
      }
    } catch (error) {
      console.error("Error fetching artifacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchArtifacts();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArtifacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredArtifacts.length / itemsPerPage);

  // Handle search and filtering
  useEffect(() => {
    if (!artifacts.length) return;

    let results = [...artifacts];

    // Search query filter
    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter((item) =>
        selectedCategories.includes(item.category_id)
      );
    }

    // Year range filter - Adjust based on your actual data structure
    results = results.filter((item) => {
      if (item.year) {
        return item.year >= yearRange[0] && item.year <= yearRange[1];
      }
      return true; // If year is not available, don't filter it out
    });

    setFilteredArtifacts(results);
    setCurrentPage(1);
  }, [artifacts, searchQuery, selectedCategories, yearRange]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to results
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle artifact in compare list
  const toggleCompareItem = (id: number) => {
    if (compareItems.includes(id)) {
      setCompareItems(compareItems.filter((itemId) => itemId !== id));
    } else {
      if (compareItems.length < 3) {
        setCompareItems([...compareItems, id]);
      }
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setYearRange([1000, 2000]);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hiện Vật Bảo Tàng
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Khám phá bộ sưu tập hiện vật quý giá về lịch sử quân sự Việt Nam
              </p>
              <div className="h-1 w-20 bg-red-700 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 pb-1.5" />
              <Input
                type="text"
                placeholder="Tìm kiếm hiện vật..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-800 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Bộ lọc
              {selectedCategories.length > 0 &&
                `(${selectedCategories.length})`}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                className={cn(
                  "px-3 py-2 flex items-center",
                  viewMode === "grid"
                    ? "bg-olive-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                className={cn(
                  "px-3 py-2 flex items-center",
                  viewMode === "list"
                    ? "bg-olive-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Lọc hiện vật</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="text-gray-600"
                    >
                      <RotateCw className="h-4 w-4 mr-1" /> Đặt lại
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Categories */}
                    <div>
                      <h4 className="font-medium mb-2">Loại hiện vật</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([
                                    ...selectedCategories,
                                    category.id,
                                  ]);
                                } else {
                                  setSelectedCategories(
                                    selectedCategories.filter(
                                      (id) => id !== category.id
                                    )
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Year Range */}
                    <div>
                      <h4 className="font-medium mb-2">
                        Năm (từ {yearRange[0]} đến {yearRange[1]})
                      </h4>
                      <Slider
                        defaultValue={[1000, 2000]}
                        min={1000}
                        max={2000}
                        step={10}
                        value={yearRange}
                        onValueChange={setYearRange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>1000</span>
                        <span>2000</span>
                      </div>
                    </div>
                  </div>

                  {/* Applied Filters */}
                  {selectedCategories.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Bộ lọc đã chọn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((catId) => {
                          const category = categories.find(
                            (c) => c.id === catId
                          );
                          return (
                            <Badge
                              key={catId}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {category?.name}
                              <button
                                onClick={() =>
                                  setSelectedCategories(
                                    selectedCategories.filter(
                                      (id) => id !== catId
                                    )
                                  )
                                }
                                className="ml-1 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12" ref={resultsRef}>
        <div className="container mx-auto px-4">
          {/* Artifact of the Day Spotlight */}
          {showSpotlight && featuredArtifact && (
            <div className="relative mb-12">
              <ArtifactSpotlight artifact={featuredArtifact} />
              <button
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-20"
                onClick={() => setShowSpotlight(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-olive-800 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-olive-800">Đang tải hiện vật...</span>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                  {currentItems.map((artifact) => (
                    <ArtifactCard
                      key={artifact.id}
                      artifact={artifact}
                      onToggleCompare={toggleCompareItem}
                      isInCompare={compareItems.includes(artifact.id)}
                    />
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-4 mt-4">
                  {currentItems.map((artifact) => (
                    <ArtifactListItem
                      key={artifact.id}
                      artifact={artifact}
                      onToggleCompare={toggleCompareItem}
                      isInCompare={compareItems.includes(artifact.id)}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredArtifacts.length === 0 && (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Không tìm thấy hiện vật
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Không có hiện vật nào phù hợp với tiêu chí tìm kiếm của
                      bạn. Vui lòng thử lại với các bộ lọc khác.
                    </p>
                    <Button onClick={resetFilters}>
                      <RotateCw className="h-4 w-4 mr-2" /> Đặt lại bộ lọc
                    </Button>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {filteredArtifacts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={
                            currentPage === page
                              ? "bg-olive-800 hover:bg-olive-900"
                              : ""
                          }
                        >
                          {page}
                        </Button>
                      )
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
