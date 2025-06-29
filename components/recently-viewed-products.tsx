"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/type';
import { toast } from 'sonner';

interface RecentlyViewedProductsProps {
  currentProductId?: string;
  className?: string;
}

export function RecentlyViewedProducts({ currentProductId, className = '' }: RecentlyViewedProductsProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCartStore();

  useEffect(() => {
    // Get recently viewed products from localStorage
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const products = JSON.parse(stored) as Product[];
        // Filter out current product and limit to 8 items
        const filtered = products
          .filter(p => p.xata_id !== currentProductId)
          .slice(0, 8);
        setRecentlyViewed(filtered);
      } catch (error) {
        console.error('Error parsing recently viewed products:', error);
      }
    }
  }, [currentProductId]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`Added ${product.name} to cart`);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, recentlyViewed.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, recentlyViewed.length - 3)) % Math.max(1, recentlyViewed.length - 3));
  };

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Recently Viewed</h3>
            <Badge variant="secondary">{recentlyViewed.length}</Badge>
          </div>
          
          {/* Navigation - Desktop */}
          {recentlyViewed.length > 4 && (
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= recentlyViewed.length - 4}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
              {recentlyViewed.map((product) => (
                <div key={product.xata_id} className="w-1/4 flex-shrink-0">
                  <Link href={`/products/${product.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        {/* Quick Add Button */}
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {product.category.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > 0 && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recentlyViewed.map((product) => (
                <div key={product.xata_id} className="w-32 flex-shrink-0">
                  <Link href={`/products/${product.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-2">
                        <h4 className="font-medium text-xs line-clamp-2 mb-1">
                          {product.name}
                        </h4>
                        <span className="font-bold text-xs">
                          {formatPrice(product.price)}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator - Mobile */}
        {recentlyViewed.length > 4 && (
          <div className="md:hidden flex justify-center gap-1 mt-4">
            {Array.from({ length: Math.ceil(recentlyViewed.length / 2) }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === Math.floor(currentIndex / 2) ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Hook to track viewed products
export function useRecentlyViewed() {
  const addToRecentlyViewed = (product: Product) => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      let recentlyViewed: Product[] = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists
      recentlyViewed = recentlyViewed.filter(p => p.xata_id !== product.xata_id);
      
      // Add to beginning
      recentlyViewed.unshift(product);
      
      // Keep only last 10 items
      recentlyViewed = recentlyViewed.slice(0, 10);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving to recently viewed:', error);
    }
  };

  return { addToRecentlyViewed };
}