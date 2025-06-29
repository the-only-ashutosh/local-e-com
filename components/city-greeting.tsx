"use client";

import { motion } from 'framer-motion';
import { MapPin, Users, Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { City } from '@/data/cities';
import { getShopsByCity } from '@/data/shops';
import Link from 'next/link';

interface CityGreetingProps {
  city: City;
}

export function CityGreeting({ city }: CityGreetingProps) {
  const shops = getShopsByCity(city.slug);
  const totalProducts = shops.reduce((sum, shop) => sum + shop.totalProducts, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 pt-8"
    >
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="p-3 bg-primary/20 rounded-full">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold">
                  👋 Welcome back, shopper from {city.name}!
                </h1>
                <p className="text-muted-foreground text-lg">
                  {city.state}, {city.country}
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto"
            >
              Discover amazing local businesses and products in your city. 
              Support your community while finding exactly what you need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Store className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{shops.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Local Shops</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{totalProducts}</span>
                </div>
                <p className="text-sm text-muted-foreground">Products Available</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">Local</span>
                </div>
                <p className="text-sm text-muted-foreground">Community Focus</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link href="/shops">
                  Explore {city.name} Shops
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}