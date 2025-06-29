"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Store, Filter, SortAsc, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ShopCard } from '@/components/shop-card';
import { ShopCardSkeleton } from '@/components/loading/shop-card-skeleton';
import { City } from '@/data/cities';
import { Shop } from '@/data/shops';

interface ShopsContentProps {
  city: City;
  shops: Shop[];
}

const ITEMS_PER_PAGE = 6;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ShopsContent({ city, shops }: ShopsContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(shops.map(shop => shop.category))];
    return ['all', ...uniqueCategories];
  }, [shops]);

  // Filter and sort shops
  const filteredAndSortedShops = useMemo(() => {
    let filtered = shops.filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           shop.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || shop.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort shops
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.totalProducts - a.totalProducts;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [shops, searchQuery, sortBy, filterCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedShops.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShops = filteredAndSortedShops.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  const handleFilterChange = (newFilter: string) => {
    setFilterCategory(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    filterCategory !== 'all' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setSortBy('rating');
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Shops in {city.name}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover local businesses and shops in {city.name}, {city.state}. 
          Support your community by shopping locally.
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shops..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full lg:w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                </Button>
              )}
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {paginatedShops.length} of {filteredAndSortedShops.length} shops
              </span>
              {totalPages > 1 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shops Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <ShopCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredAndSortedShops.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No shops found</h2>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterCategory !== 'all' 
              ? 'Try adjusting your search or filters.'
              : `We're working on adding more shops in ${city.name}. Check back soon!`
            }
          </p>
          {activeFiltersCount > 0 && (
            <Button onClick={clearFilters}>Clear Filters</Button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {paginatedShops.map((shop) => (
              <motion.div key={shop.id} variants={itemVariants}>
                <ShopCard shop={shop} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
  );
}