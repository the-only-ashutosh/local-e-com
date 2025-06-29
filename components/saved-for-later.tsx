"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/lib/type';
import { toast } from 'sonner';

interface SavedItem extends Product {
  savedAt: string;
}

interface SavedForLaterProps {
  className?: string;
}

export function SavedForLater({ className = '' }: SavedForLaterProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem } = useCartStore();

  // Mock saved items - in real app, this would come from state/API
  const mockSavedItems: SavedItem[] = [
    {
      xata_id: 'saved-1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 99.99,
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
      category: { name: 'Electronics', xata_id: 'cat-1', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'High-quality wireless headphones with noise cancellation',
      slug: 'wireless-bluetooth-headphones',
      featured: false,
      sale: true,
      city: 'Valsad',
      isActive: true,
      stock: 10,
      totalStar: 450,
      reviewCount: 100,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0,
      savedAt: '2024-01-15T10:30:00Z'
    },
    {
      xata_id: 'saved-2',
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      originalPrice: 0,
      images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
      category: { name: 'Clothing', xata_id: 'cat-2', xata_createdat: '', xata_updatedat: '', xata_version: 0 },
      description: 'Comfortable organic cotton t-shirt in multiple colors',
      slug: 'organic-cotton-t-shirt',
      featured: false,
      sale: false,
      city: 'Valsad',
      isActive: true,
      stock: 5,
      totalStar: 400,
      reviewCount: 80,
      xata_createdat: '',
      xata_updatedat: '',
      xata_version: 0,
      savedAt: '2024-01-14T15:45:00Z'
    }
  ];

  // Use mock data if no saved items
  const displayItems = savedItems.length > 0 ? savedItems : mockSavedItems;

  const handleMoveToCart = (item: SavedItem) => {
    addItem(item);
    setSavedItems(prev => prev.filter(saved => saved.xata_id !== item.xata_id));
    toast.success(`Moved ${item.name} to cart`);
  };

  const handleRemoveFromSaved = (itemId: string) => {
    setSavedItems(prev => prev.filter(saved => saved.xata_id !== itemId));
    toast.success('Removed from saved items');
  };

  const formatSavedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Saved for Later</span>
                  <Badge variant="secondary">{displayItems.length}</Badge>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0">
              <AnimatePresence>
                <div className="space-y-4">
                  {displayItems.map((item, index) => (
                    <motion.div
                      key={item.xata_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {item.sale && (
                          <Badge variant="destructive" className="absolute top-1 left-1 text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium line-clamp-2 text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.category.name}
                            </p>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-8 w-8"
                            onClick={() => handleRemoveFromSaved(item.xata_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && item.originalPrice > 0 && (
                              <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Saved {formatSavedDate(item.savedAt)}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => handleMoveToCart(item)}
                              disabled={item.stock <= 0}
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.stock <= 5 && item.stock > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2"
                          >
                            <Badge variant="destructive" className="text-xs">
                              Only {item.stock} left in stock!
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-2 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    displayItems.forEach(item => handleMoveToCart(item));
                  }}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move All to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSavedItems([]);
                    toast.success('Cleared all saved items');
                  }}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}

// Hook to manage saved items
export function useSavedForLater() {
  const saveForLater = (product: Product) => {
    // In real app, this would save to state/API
    toast.success(`Saved ${product.name} for later`);
  };

  const removeFromSaved = (productId: string) => {
    // In real app, this would remove from state/API
    toast.success('Removed from saved items');
  };

  return { saveForLater, removeFromSaved };
}