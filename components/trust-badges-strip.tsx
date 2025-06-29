"use client";

import { motion } from 'framer-motion';
import { Shield, Truck, RefreshCw, CreditCard, Phone, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "SSL encrypted checkout"
  },
  {
    icon: RefreshCw,
    title: "7-Day Returns",
    description: "Easy return policy"
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay when you receive"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50"
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Always here to help"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Premium products only"
  }
];

interface TrustBadgesStripProps {
  variant?: 'horizontal' | 'sticky';
  className?: string;
}

export function TrustBadgesStrip({ variant = 'horizontal', className = '' }: TrustBadgesStripProps) {
  const isSticky = variant === 'sticky';

  return (
    <motion.div
      initial={{ opacity: 0, y: isSticky ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        ${isSticky 
          ? 'fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t shadow-lg md:hidden' 
          : 'bg-muted/30'
        } 
        ${className}
      `}
    >
      <div className={`
        ${isSticky ? 'container mx-auto px-4 py-3' : 'container mx-auto px-4 py-6'}
      `}>
        <div className={`
          grid gap-3
          ${isSticky 
            ? 'grid-cols-3 text-center' 
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
          }
        `}>
          {trustBadges.slice(0, isSticky ? 3 : 6).map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isSticky 
                  ? 'flex-col gap-1 hover:bg-muted/50' 
                  : 'bg-white/50 hover:bg-white/80 hover:shadow-sm'
                }
              `}
            >
              <div className={`
                flex items-center justify-center rounded-full bg-primary/10
                ${isSticky ? 'w-8 h-8' : 'w-10 h-10'}
              `}>
                <badge.icon className={`text-primary ${isSticky ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </div>
              <div className={isSticky ? 'text-center' : ''}>
                <h4 className={`font-semibold ${isSticky ? 'text-xs' : 'text-sm'}`}>
                  {badge.title}
                </h4>
                <p className={`text-muted-foreground ${isSticky ? 'text-xs' : 'text-xs'}`}>
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}