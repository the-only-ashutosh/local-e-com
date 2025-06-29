"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Store, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LiveStatsProps {
  stats: {
    users: number;
    orders: number;
    shops: number;
  };
}

export function LiveStats({ stats }: LiveStatsProps) {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    orders: 0,
    shops: 0,
  });

  useEffect(() => {
    // Animate numbers counting up
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        users: Math.floor(stats.users * progress),
        orders: Math.floor(stats.orders * progress),
        shops: Math.floor(stats.shops * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(stats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [stats]);

  const statItems = [
    {
      icon: Users,
      label: 'Users Shopping Today',
      value: animatedStats.users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: ShoppingBag,
      label: 'Orders This Week',
      value: animatedStats.orders,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Store,
      label: 'Active Local Shops',
      value: animatedStats.shops,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">Live Community Stats</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          See the real-time activity in your local shopping community
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
      >
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.bgColor} mb-4`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  {item.value.toLocaleString()}
                </motion.div>
                
                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  {item.label}
                </p>
                
                {/* Pulse indicator for live data */}
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}