"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Clock, ShoppingBag, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecentOrder {
  id: string;
  productName: string;
  productImage: string;
  buyerName: string;
  shopName: string;
  timeAgo: string;
  city: string;
}

interface RecentOrdersFeedProps {
  orders: RecentOrder[];
}

export function RecentOrdersFeed({ orders }: RecentOrdersFeedProps) {
  const [visibleOrders, setVisibleOrders] = useState(orders);
  const [newOrderIndex, setNewOrderIndex] = useState(0);

  useEffect(() => {
    if (orders.length === 0) return;

    // Simulate new orders coming in
    const interval = setInterval(() => {
      const newOrder = {
        ...orders[newOrderIndex % orders.length],
        id: `${orders[newOrderIndex % orders.length].id}-${Date.now()}`,
        timeAgo: 'Just now',
      };

      setVisibleOrders(prev => [newOrder, ...prev.slice(0, 4)]);
      setNewOrderIndex(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, [orders, newOrderIndex]);

  if (orders.length === 0) {
    return (
      <section className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Recent Orders in Your City
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent orders to display.</p>
              <p className="text-sm mt-1">Be the first to order from local shops!</p>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Recently Ordered in Your City</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          See what your neighbors are buying from local shops
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Live Order Feed
              <Badge variant="secondary" className="ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {visibleOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 border-b last:border-b-0 ${
                      index === 0 ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">
                              {order.productName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              by <span className="font-medium">{order.buyerName}</span> from{' '}
                              <span className="font-medium">{order.shopName}</span>
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {order.city}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {order.timeAgo}
                              </span>
                            </div>
                            {index === 0 && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {visibleOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent orders to display.</p>
                <p className="text-sm mt-1">Check back soon for live updates!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}