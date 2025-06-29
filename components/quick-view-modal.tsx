"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Star, ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Product } from '@/lib/type';
import { toast } from 'sonner';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();

  if (!product) return null;

  const discount = product.sale && product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
    onClose();
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <Card className="shadow-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Product Images */}
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.images[selectedImageIndex] || product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.sale && (
                          <Badge variant="destructive">
                            -{discount}% OFF
                          </Badge>
                        )}
                        {product.featured && (
                          <Badge className="bg-primary">
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Close Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                        onClick={onClose}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Thumbnail Gallery */}
                    {product.images.length > 1 && (
                      <div className="flex gap-2 p-4 overflow-x-auto">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                              selectedImageIndex === index
                                ? 'border-primary'
                                : 'border-transparent'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${product.name} ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                        {product.category.name}
                      </p>
                      
                      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.totalStar / product.reviewCount)
                                  ? "fill-current text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {(product.totalStar / product.reviewCount).toFixed(1)} ({product.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > 0 && (
                          <span className="text-xl text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Stock Status */}
                      <div className="mb-6">
                        {product.stock > 0 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            In Stock ({product.stock} available)
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <span className="font-medium">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={decrementQuantity}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 font-medium">{quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={incrementQuantity}
                            disabled={product.stock <= 0}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleAddToCart}
                          className="flex-1"
                          disabled={product.stock <= 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart - {formatPrice(product.price * quantity)}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleWishlist}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isWishlisted ? "fill-current text-red-500" : ""
                            }`}
                          />
                        </Button>
                      </div>

                      {/* View Full Details */}
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`/products/${product.slug}`} target="_blank" rel="noopener noreferrer">
                          View Full Details
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}