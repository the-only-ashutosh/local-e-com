"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsLoading("quantity");
    // Simulate API call
    setTimeout(() => {
      updateQuantity(item.id, newQuantity);
      setIsLoading(null);
    }, 300);
  };

  const handleRemoveItem = async () => {
    setIsLoading("remove");
    // Simulate API call
    setTimeout(() => {
      removeItem(item.id);
      toast.success("Item removed from cart");
      setIsLoading(null);
    }, 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row gap-4 p-6 border rounded-lg"
    >
      {/* Product Image */}
      <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveItem}
            disabled={isLoading === "remove"}
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1 || isLoading === "quantity"}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 py-1 text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isLoading === "quantity"}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold">
              {formatPrice(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}