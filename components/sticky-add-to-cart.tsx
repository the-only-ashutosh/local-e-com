"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/type';
import { toast } from 'sonner';

interface StickyAddToCartProps {
  product: Product;
  className?: string;
}

export function StickyAddToCart({ product, className = '' }: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky cart when user scrolls past the main product section (roughly 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`
            fixed bottom-0 left-0 right-0 z-50 md:hidden
            ${className}
          `}
        >
          <Card className="rounded-none border-t shadow-2xl bg-background/95 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center gap-3">
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-primary">
                      {formatPrice(product.price * quantity)}
                    </span>
                    {product.originalPrice && product.originalPrice > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice * quantity)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
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
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={handleAddToCart}
                  className="px-6"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>

              {/* Stock Status */}
              {product.stock <= 5 && product.stock > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <Badge variant="destructive" className="text-xs">
                    Only {product.stock} left in stock!
                  </Badge>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}