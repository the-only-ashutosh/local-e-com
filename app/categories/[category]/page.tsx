"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter, SortAsc, Grid, List, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { CategoryFiltersSidebar } from "@/components/category-filters-sidebar";
import { QuickViewModal } from "@/components/quick-view-modal";
import { TrustBadgesStrip } from "@/components/trust-badges-strip";
import { products, categories } from "@/lib/data";
import { Product } from "@/lib/type";

export default function CategoryPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] }> | undefined;
}>) {
  const params = useParams();
  const categorySlug = params.category;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Convert slug back to category name
  const categoryName = categories.find(
    (cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (!categoryName || product.category.name !== categoryName) {
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
  }, [categoryName, priceRange, rating, sortBy]);

  if (!categoryName) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button asChild>
          <Link href="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }

  const activeFiltersCount = [
    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0,
    rating > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setRating(0);
    setSortBy("featured");
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  // Mock data for filters
  const categoryOptions = [
    { id: "electronics", label: "Electronics", count: 45 },
    { id: "clothing", label: "Clothing", count: 32 },
    { id: "home", label: "Home & Garden", count: 28 },
  ];

  const brandOptions = [
    { id: "apple", label: "Apple", count: 12 },
    { id: "samsung", label: "Samsung", count: 8 },
    { id: "nike", label: "Nike", count: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <span>/</span>
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <CategoryFiltersSidebar
            categories={categoryOptions}
            brands={brandOptions}
            priceRange={priceRange}
            maxPrice={1000}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedRating={rating}
            onCategoryChange={setSelectedCategories}
            onBrandChange={setSelectedBrands}
            onPriceChange={setPriceRange}
            onRatingChange={setRating}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link href="/categories">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Categories
                    </Button>
                  </Link>
                </div>
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-2">
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
            {(priceRange[0] > 0 || priceRange[1] < 1000 || rating > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
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
                    No products found in this category.
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.xata_id + "dfkxjnvkfj"}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="relative group"
                  >
                    <ProductCard product={product} />
                    
                    {/* Quick View Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Quick View
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Trust Badges */}
      <TrustBadgesStrip />
    </div>
  );
}