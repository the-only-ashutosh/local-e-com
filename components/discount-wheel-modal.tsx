"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DiscountWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const discounts = [
  { value: 10, color: 'bg-red-500', text: '10% OFF' },
  { value: 5, color: 'bg-blue-500', text: '5% OFF' },
  { value: 15, color: 'bg-green-500', text: '15% OFF' },
  { value: 20, color: 'bg-purple-500', text: '20% OFF' },
  { value: 0, color: 'bg-gray-500', text: 'Try Again' },
  { value: 25, color: 'bg-yellow-500', text: '25% OFF' },
];

export function DiscountWheelModal({ isOpen, onClose }: DiscountWheelModalProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    
    // Random result with weighted chances
    const random = Math.random();
    let selectedDiscount;
    
    if (random < 0.4) selectedDiscount = discounts[1]; // 5% - 40% chance
    else if (random < 0.7) selectedDiscount = discounts[0]; // 10% - 30% chance
    else if (random < 0.85) selectedDiscount = discounts[2]; // 15% - 15% chance
    else if (random < 0.95) selectedDiscount = discounts[3]; // 20% - 10% chance
    else selectedDiscount = discounts[5]; // 25% - 5% chance

    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedDiscount.value);
      setHasSpun(true);
      
      if (selectedDiscount.value > 0) {
        // Set discount cookie
        document.cookie = `discount_claimed=true; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        document.cookie = `discount_code=WELCOME${selectedDiscount.value}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        toast.success(`Congratulations! You won ${selectedDiscount.value}% off!`);
      } else {
        toast.info("Better luck next time! Check back for more deals.");
      }
    }, 3000);
  };

  const handleClose = () => {
    document.cookie = `discount_claimed=true; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md"
        >
          <Card className="shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="text-center relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-8 w-8 text-primary" />
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Bonus!
              </CardTitle>
              <p className="text-muted-foreground">
                Spin the wheel for your first-time discount
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Wheel */}
              <div className="relative mx-auto w-64 h-64">
                <motion.div
                  className="w-full h-full rounded-full border-8 border-primary/20 relative overflow-hidden"
                  animate={isSpinning ? { rotate: 1800 } : {}}
                  transition={{ duration: 3, ease: "easeOut" }}
                >
                  {discounts.map((discount, index) => (
                    <div
                      key={index}
                      className={`absolute w-1/2 h-1/2 ${discount.color} flex items-center justify-center text-white font-bold text-sm`}
                      style={{
                        transformOrigin: 'right bottom',
                        transform: `rotate(${index * 60}deg)`,
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                      }}
                    >
                      <span className="transform -rotate-30 text-xs">
                        {discount.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
                </div>
              </div>

              {/* Result */}
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {result > 0 ? (
                    <div className="space-y-3">
                      <Badge className="text-lg px-4 py-2 bg-green-500">
                        🎉 You won {result}% OFF!
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Use code: <span className="font-mono font-bold">WELCOME{result}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Valid for 7 days on your first purchase
                      </p>
                    </div>
                  ) : (
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Better luck next time!
                    </Badge>
                  )}
                </motion.div>
              )}

              {/* Action Button */}
              <div className="text-center">
                {!hasSpun ? (
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    {isSpinning ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Spinning...
                      </div>
                    ) : (
                      <>
                        <Gift className="mr-2 h-5 w-5" />
                        Spin the Wheel!
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button onClick={handleClose} size="lg" className="w-full">
                      Start Shopping
                    </Button>
                    <Button variant="outline" onClick={handleClose} className="w-full">
                      Maybe Later
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-xs text-center text-muted-foreground">
                * One spin per customer. Discount applies to first purchase only.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}