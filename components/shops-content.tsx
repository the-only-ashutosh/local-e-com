"use client";

import { motion } from 'framer-motion';
import { MapPin, Store } from 'lucide-react';
import { ShopCard } from '@/components/shop-card';
import { City } from '@/data/cities';
import { Shop } from '@/data/shops';

interface ShopsContentProps {
  city: City;
  shops: Shop[];
}

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
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
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

      {shops.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No shops found</h2>
          <p className="text-muted-foreground">
            We're working on adding more shops in {city.name}. Check back soon!
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {shops.map((shop) => (
            <motion.div key={shop.id} variants={itemVariants}>
              <ShopCard shop={shop} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}