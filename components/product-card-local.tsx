"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface ProductCardLocalProps {
  product: Product;
}

export function ProductCardLocal({ product }: ProductCardLocalProps) {
  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              className="w-full"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href={`/product/${product.id}`}>
              View Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}