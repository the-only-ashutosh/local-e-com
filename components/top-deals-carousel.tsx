"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Tag, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { City } from '@/data/cities';
import { getShopsByCity } from '@/data/shops';
import { getProductsByShop } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface TopDealsCarouselProps {
  city: City;
}

interface Deal {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  shopName: string;
  shopId: string;
  discount: number;
  endsIn: string;
  category: string;
}

export function TopDealsCarousel({ city }: TopDealsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  useEffect(() => {
    // Generate deals from local shops
    const shops = getShopsByCity(city.slug);
    const allDeals: Deal[] = [];

    shops.forEach(shop => {
      const products = getProductsByShop(shop.id);
      const dealProducts = products.filter(product => 
        product.originalPrice && product.originalPrice > product.price
      );

      dealProducts.forEach(product => {
        if (product.originalPrice) {
          allDeals.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            shopName: shop.name,
            shopId: shop.id,
            discount: calculateDiscount(product.originalPrice, product.price),
            endsIn: getRandomEndTime(),
            category: product.category,
          });
        }
      });
    });

    // Sort by discount and take top deals
    allDeals.sort((a, b) => b.discount - a.discount);
    setDeals(allDeals.slice(0, 8));
  }, [city.slug]);

  useEffect(() => {
    // Update countdown timers
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, string> = {};
      deals.forEach(deal => {
        newTimeLeft[deal.id] = deal.endsIn;
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [deals]);

  const getRandomEndTime = () => {
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, deals.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, deals.length - 2)) % Math.max(1, deals.length - 2));
  };

  if (deals.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Tag className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Top Deals in {city.name}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't miss out on these amazing deals from local shops in your city. 
          Limited time offers that won't last long!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {deals.map((deal) => (
              <div key={deal.id} className="w-1/3 flex-shrink-0 px-2">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Discount Badge */}
                      <Badge 
                        variant="destructive" 
                        className="absolute top-3 left-3 text-sm font-bold"
                      >
                        -{deal.discount}% OFF
                      </Badge>

                      {/* Countdown Timer */}
                      <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Ends in {timeLeft[deal.id] || deal.endsIn}</span>
                      </div>

                      {/* Quick Shop Button */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="w-full" asChild>
                          <Link href={`/product/${deal.id}`}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Shop Now
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {deal.category}
                        </p>
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {deal.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          from {deal.shopName}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-primary">
                            {formatPrice(deal.price)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(deal.originalPrice)}
                          </span>
                        </div>

                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/shop/${deal.shopId}`}>
                            Visit Shop
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {deals.length > 3 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {deals.length > 3 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.max(1, deals.length - 2) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* View All Deals Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8"
      >
        <Button asChild size="lg" variant="outline">
          <Link href="/shops">
            View All {city.name} Shops
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}