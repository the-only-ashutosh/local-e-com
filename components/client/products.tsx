"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, SortAsc, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ProductCard } from "@/components/product-card";
import { useFilterStore } from "@/lib/store";
import { Product } from "@/lib/type";
import { HOST } from "@/lib/consts";
import { generateRandom } from "@/lib/utils";

const ITEMS_PER_PAGE = 18;

const ProductsComp = ({
  prods,
  cats,
}: {
  prods: Product[];
  cats: { name: string; id: string }[];
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(prods);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    category,
    priceRange,
    rating,
    sortBy,
    searchQuery,
    setCategory,
    setPriceRange,
    setRating,
    setSortBy,
    clearFilters,
  } = useFilterStore();

  useEffect(() => {
    if (newLoading || filteredProducts.length === ITEMS_PER_PAGE) return;
    const queryString = [];
    if (category.name.length > 0) {
      queryString.push(`category=${category.id}`);
    }
    if (searchQuery.trim().length > 0) {
      queryString.push(`search=${searchQuery}`);
    }
    queryString.push(fixedQuery);
    setNewLoading(true);
    console.log(fixedQuery);
    fetch(`${HOST}/products/filter?${queryString.join("&")}`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setNewLoading(false);
        const toAdd = Array.from(res["records"]).filter(
          (e) => !filteredProducts.includes(e as Product)
        );
        console.log(toAdd.length, res["records"].length);
        setProducts([...filteredProducts, ...(toAdd as Product[])]);
      });
  }, [category, searchQuery]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        category.name.length > 0 &&
        product.category.xata_id !== category.id
      ) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (rating > 0 && product.totalStar / product.reviewCount < rating) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort(
          (a, b) => b.totalStar / b.reviewCount - a.totalStar / a.reviewCount
        );
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [category, priceRange, rating, sortBy, searchQuery, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, priceRange, rating, sortBy, searchQuery]);

  const activeFiltersCount = [
    category ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0,
    rating > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const [fixedQuery, setFixedQuery] = useState(
    `sort=${sortBy}&priceLow=${priceRange[0]}&priceHigh=${
      priceRange[1]
    }&limit=${ITEMS_PER_PAGE - filteredProducts.length}`
  );

  useEffect(() => {
    setFixedQuery(
      `sort=${sortBy}&priceLow=${priceRange[0]}&priceHigh=${
        priceRange[1]
      }&limit=${ITEMS_PER_PAGE - filteredProducts.length}`
    );
  }, [priceRange, sortBy, filteredProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount}</Badge>
                )}
              </CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Filter */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Category
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-categories"
                      checked={category.name === ""}
                      onCheckedChange={() => setCategory({ name: "", id: "" })}
                    />
                    <Label htmlFor="all-categories">All Categories</Label>
                  </div>
                  {cats.map((cat) => (
                    <div
                      key={cat.id + "dfkhvjk,"}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={cat.name}
                        checked={category.id === cat.id}
                        onCheckedChange={() =>
                          setCategory(
                            category.id === cat.id ? { name: "", id: "" } : cat
                          )
                        }
                      />
                      <Label htmlFor={cat.name}>{cat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={10}
                  className="w-full"
                />
              </div>

              <Separator />

              {/* Rating Filter */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Minimum Rating
                </Label>
                <Select
                  value={rating.toString()}
                  onValueChange={(value) => setRating(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="2">2+ stars</SelectItem>
                    <SelectItem value="1">1+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(category.name.length > 0 ||
            searchQuery ||
            priceRange[0] > 0 ||
            priceRange[1] < 1000 ||
            rating > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setCategory({ name: "", id: "" })}
                >
                  Category: {category.name} ×
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary">{`Search: ${searchQuery}`}</Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setPriceRange([0, 1000])}
                >
                  Price: ${priceRange[0]} - ${priceRange[1]} ×
                </Badge>
              )}
              {rating > 0 && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setRating(0)}
                >
                  Rating: {rating}+ stars ×
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    : "space-y-4 mb-8"
                }
              >
                {paginatedProducts.map((product, i) => (
                  <motion.div
                    key={product.xata_id + generateRandom(i * 1.0, 100.0)}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center"
                >
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {/* Show page numbers with ellipsis for large page counts */}
                      {(() => {
                        const pages = [];
                        const showEllipsis = totalPages > 7;
                        
                        if (!showEllipsis) {
                          // Show all pages if 7 or fewer
                          for (let i = 1; i <= totalPages; i++) {
                            pages.push(i);
                          }
                        } else {
                          // Show first page, current page area, and last page with ellipsis
                          if (currentPage <= 3) {
                            pages.push(1, 2, 3, 4, '...', totalPages);
                          } else if (currentPage >= totalPages - 2) {
                            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                          } else {
                            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                          }
                        }
                        
                        return pages.map((page, index) => (
                          <PaginationItem key={index}>
                            {page === '...' ? (
                              <span className="px-3 py-2 text-muted-foreground">...</span>
                            ) : (
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(page as number);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ));
                      })()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                              setCurrentPage(currentPage + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsComp;