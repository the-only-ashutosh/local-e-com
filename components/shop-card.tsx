"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Package, Clock, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shop } from '@/data/shops';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={shop.image}
            alt={shop.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant={shop.isOpen ? "default" : "secondary"}>
              {shop.isOpen ? "Open" : "Closed"}
            </Badge>
            <Badge variant="outline" className="bg-white/90">
              {shop.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {shop.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {shop.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="font-medium">{shop.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>{shop.totalProducts} products</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{shop.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{shop.openingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{shop.phone}</span>
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href={`/shop/${shop.id}`}>
              View Shop
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}