"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Store, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shop } from '@/data/shops';

interface FeaturedShopsProps {
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

export function FeaturedShops({ shops }: FeaturedShopsProps) {
  if (shops.length === 0) return null;

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Store className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Featured Local Shops</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          Discover handpicked local businesses that serve your community with quality products and exceptional service
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {shops.map((shop) => (
          <motion.div key={shop.id} variants={itemVariants}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant={shop.isOpen ? "default" : "secondary"} className="text-xs">
                    {shop.isOpen ? "Open" : "Closed"}
                  </Badge>
                  <Badge variant="outline" className="bg-white/90 text-xs">
                    {shop.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors mb-2">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {shop.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="font-medium">{shop.rating}</span>
                    </div>
                    <span>{shop.totalProducts} products</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">{shop.address}</span>
                  </div>
                </div>

                <Button asChild className="w-full mt-auto">
                  <Link href={`/shop/${shop.id}`}>
                    Shop Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8 md:mt-12"
      >
        <Button asChild size="lg" variant="outline">
          <Link href="/shops">
            View All Local Shops
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}