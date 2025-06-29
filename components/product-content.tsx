"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus, Store, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';
import { Shop } from '@/data/shops';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductContentProps {
  product: Product;
  shop?: Shop;
}

export function ProductContent({ product, shop }: ProductContentProps) {
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={shop ? `/shop/${shop.id}` : '/shops'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {shop ? `Back to ${shop.name}` : 'Back to Shops'}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="absolute top-4 right-4">
                Out of Stock
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Shop Info */}
          {shop && (
            <div>
              <h3 className="font-semibold mb-3">Sold by</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Store className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{shop.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{shop.address}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/shop/${shop.id}`}>
                        View Shop
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart} 
              className="w-full" 
              size="lg"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock 
                ? `Add to Cart - ${formatPrice(product.price * quantity)}`
                : 'Out of Stock'
              }
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}