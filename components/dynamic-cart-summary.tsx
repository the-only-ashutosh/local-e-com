"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Tag, Truck, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface DynamicCartSummaryProps {
  className?: string;
  showCoupon?: boolean;
  showShipping?: boolean;
  isFloating?: boolean;
}

export function DynamicCartSummary({ 
  className = '', 
  showCoupon = true, 
  showShipping = true,
  isFloating = false 
}: DynamicCartSummaryProps) {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<'standard' | 'express' | 'overnight'>('standard');

  const subtotal = getTotalPrice();
  const totalItems = getTotalItems();
  
  // Shipping costs
  const shippingCosts = {
    standard: subtotal > 50 ? 0 : 9.99,
    express: 19.99,
    overnight: 39.99
  };
  
  const shippingCost = shippingCosts[selectedShipping];
  const tax = subtotal * 0.08;
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + shippingCost + tax - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      const validCoupons = {
        'SAVE10': 10,
        'WELCOME15': 15,
        'SAVE20': 20,
        'FIRSTORDER': 25
      };
      
      const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
      
      if (discount) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
        toast.success(`Coupon applied! ${discount}% off`);
        setCouponCode('');
      } else {
        toast.error('Invalid coupon code');
      }
      
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        ${isFloating ? 'sticky top-4' : ''}
        ${className}
      `}
    >
      <Card className={`
        shadow-lg transition-all duration-300
        ${isFloating ? 'hover:shadow-xl' : ''}
      `}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
            <Badge variant="secondary">{totalItems} items</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Subtotal */}
          <motion.div
            layout
            className="flex justify-between items-center"
          >
            <span>Subtotal ({totalItems} items)</span>
            <motion.span
              key={subtotal}
              initial={{ scale: 1.1, color: '#10b981' }}
              animate={{ scale: 1, color: 'inherit' }}
              transition={{ duration: 0.3 }}
              className="font-medium"
            >
              {formatPrice(subtotal)}
            </motion.span>
          </motion.div>

          {/* Coupon Section */}
          {showCoupon && (
            <motion.div layout className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Promo Code</span>
              </div>
              
              <AnimatePresence mode="wait">
                {appliedCoupon ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {appliedCoupon.code}
                      </Badge>
                      <span className="text-sm text-green-700">
                        {appliedCoupon.discount}% off
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-800"
                    >
                      Remove
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      size="sm"
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Shipping Options */}
          {showShipping && (
            <motion.div layout className="space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Shipping</span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(shippingCosts).map(([method, cost]) => (
                  <label
                    key={method}
                    className={`
                      flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors
                      ${selectedShipping === method 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-muted-foreground/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method}
                        checked={selectedShipping === method}
                        onChange={(e) => setSelectedShipping(e.target.value as any)}
                        className="text-primary"
                      />
                      <div>
                        <div className="text-sm font-medium capitalize">
                          {method} Shipping
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {method === 'standard' && '5-7 business days'}
                          {method === 'express' && '2-3 business days'}
                          {method === 'overnight' && 'Next business day'}
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">
                      {cost === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        formatPrice(cost)
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          <Separator />

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            {showShipping && (
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            {appliedCoupon && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between text-green-600"
              >
                <span>Discount ({appliedCoupon.code})</span>
                <span>-{formatPrice(couponDiscount)}</span>
              </motion.div>
            )}
          </div>

          <Separator />

          {/* Total */}
          <motion.div
            layout
            className="flex justify-between items-center text-lg font-bold"
          >
            <span>Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1, color: '#10b981' }}
              animate={{ scale: 1, color: 'inherit' }}
              transition={{ duration: 0.3 }}
            >
              {formatPrice(total)}
            </motion.span>
          </motion.div>

          {/* Savings Indicator */}
          {subtotal > 0 && shippingCost === 0 && selectedShipping === 'standard' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🎉 You saved {formatPrice(9.99)} on shipping!
              </Badge>
            </motion.div>
          )}

          {/* Free Shipping Progress */}
          {selectedShipping === 'standard' && subtotal < 50 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Add {formatPrice(50 - subtotal)} more for free shipping</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                />
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}