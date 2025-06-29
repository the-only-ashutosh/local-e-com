"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/components/cart-item";
import { DynamicCartSummary } from "@/components/dynamic-cart-summary";
import { SavedForLater } from "@/components/saved-for-later";
import { SmartCartSuggestions } from "@/components/smart-cart-suggestions";
import { RecentlyViewedProducts } from "@/components/recently-viewed-products";
import { TrustBadgesStrip } from "@/components/trust-badges-strip";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const { items, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    // Simulate API call
    setTimeout(() => {
      clearCart();
      toast.success("Cart cleared");
      setIsClearing(false);
    }, 500);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              {"Looks like you haven't added anything to your cart yet."}
            </p>
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Recently Viewed for Empty Cart */}
        <div className="container mx-auto px-4 pb-8">
          <RecentlyViewedProducts />
        </div>
        
        <TrustBadgesStrip />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClearCart}
              disabled={isClearing}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isClearing ? "Clearing..." : "Clear Cart"}
            </Button>
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.xata_id} item={item} />
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Saved for Later */}
            <SavedForLater />

            {/* Smart Suggestions */}
            <SmartCartSuggestions />

            {/* Recently Viewed */}
            <RecentlyViewedProducts />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <DynamicCartSummary 
              isFloating={true}
              showCoupon={true}
              showShipping={true}
            />
            
            {/* Checkout Button */}
            <div className="mt-6">
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>🔒 Secure checkout powered by SSL encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadgesStrip />
    </div>
  );
}