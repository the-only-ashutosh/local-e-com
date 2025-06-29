"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Plus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/type';
import { toast } from 'sonner';

interface SmartCartSuggestionsProps {
  className?: string;
}

// Mock smart suggestions based on cart items
const generateSmartSuggestions = (cartItems: Product[]): Product[] => {
  // In a real app, this would be powered by ML/AI recommendations
  const suggestions: Product[] = [
    {
      xata_id: 'suggestion-1',
      name: 'Wireless Charging Pad',
      price: 39.99,
      originalPrice: 49.99,
      images: ['https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'],
      category: { name: 'Electronics', xata_id: 'cat-1', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'Fast wireless charging for your devices',
      slug: 'wireless-charging-pad',
      featured: false,
      sale: true,
      city: 'Valsad',
      isActive: true,
      stock: 15,
      totalStar: 420,
      reviewCount: 95,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0
    },
    {
      xata_id: 'suggestion-2',
      name: 'Phone Case - Clear',
      price: 19.99,
      originalPrice: 0,
      images: ['https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'],
      category: { name: 'Accessories', xata_id: 'cat-2', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'Crystal clear protection for your phone',
      slug: 'phone-case-clear',
      featured: false,
      sale: false,
      city: 'Valsad',
      isActive: true,
      stock: 8,
      totalStar: 380,
      reviewCount: 76,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0
    },
    {
      xata_id: 'suggestion-3',
      name: 'USB-C Cable 6ft',
      price: 14.99,
      originalPrice: 24.99,
      images: ['https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg'],
      category: { name: 'Cables', xata_id: 'cat-3', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'High-speed charging and data transfer cable',
      slug: 'usb-c-cable-6ft',
      featured: false,
      sale: true,
      city: 'Valsad',
      isActive: true,
      stock: 25,
      totalStar: 450,
      reviewCount: 120,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0
    },
    {
      xata_id: 'suggestion-4',
      name: 'Bluetooth Speaker Mini',
      price: 29.99,
      originalPrice: 39.99,
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'],
      category: { name: 'Audio', xata_id: 'cat-4', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'Compact speaker with big sound',
      slug: 'bluetooth-speaker-mini',
      featured: false,
      sale: true,
      city: 'Valsad',
      isActive: true,
      stock: 12,
      totalStar: 400,
      reviewCount: 88,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0
    }
  ];

  return suggestions;
};

export function SmartCartSuggestions({ className = '' }: SmartCartSuggestionsProps) {
  const { items, addItem } = useCartStore();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (items.length > 0) {
      const smartSuggestions = generateSmartSuggestions(items);
      setSuggestions(smartSuggestions);
    }
  }, [items]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setAddedItems(prev => new Set([...prev, product.xata_id]));
    toast.success(`Added ${product.name} to cart`);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, suggestions.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, suggestions.length - 2)) % Math.max(1, suggestions.length - 2));
  };

  if (items.length === 0 || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              People Also Bought
              <Badge variant="secondary">Smart Picks</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on your cart items and what others frequently buy together
            </p>
          </CardHeader>
          
          <CardContent>
            {/* Desktop View */}
            <div className="hidden md:block relative">
              <div 
                className="flex transition-transform duration-300 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
              >
                {suggestions.map((product) => (
                  <div key={product.xata_id} className="w-1/3 flex-shrink-0">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.sale && (
                          <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
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
                        
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleAddToCart(product)}
                          disabled={addedItems.has(product.xata_id)}
                        >
                          {addedItems.has(product.xata_id) ? (
                            <>
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              {suggestions.length > 3 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10"
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10"
                    onClick={nextSlide}
                    disabled={currentIndex >= suggestions.length - 3}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Mobile View - Horizontal Scroll */}
            <div className="md:hidden">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {suggestions.map((product, index) => (
                  <motion.div
                    key={product.xata_id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-40 flex-shrink-0"
                  >
                    <div className="border rounded-lg p-3 hover:shadow-md transition-all duration-200">
                      <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.sale && (
                          <Badge variant="destructive" className="absolute top-1 left-1 text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-xs line-clamp-2">
                          {product.name}
                        </h4>
                        
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > 0 && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          className="w-full text-xs h-7"
                          onClick={() => handleAddToCart(product)}
                          disabled={addedItems.has(product.xata_id)}
                        >
                          {addedItems.has(product.xata_id) ? (
                            'Added'
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Add All Button */}
            <div className="mt-6 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  suggestions.forEach(product => {
                    if (!addedItems.has(product.xata_id)) {
                      handleAddToCart(product);
                    }
                  });
                }}
                disabled={suggestions.every(product => addedItems.has(product.xata_id))}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}