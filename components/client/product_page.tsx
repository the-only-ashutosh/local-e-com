"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ProductPage } from "@/lib/type";

const ProductPageComp = ({
  data,
  breadcrumb,
  productsTab,
  related,
}: {
  data: ProductPage;
  breadcrumb: JSX.Element;
  productsTab: JSX.Element;
  related: JSX.Element;
}) => {
  const { product, similar } = data;
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const discount =
    product.sale && product.originalPrice
      ? calculateDiscount(product.originalPrice, product.price)
      : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };
  const features = [
    { icon: Truck, text: "Free shipping on orders over $50" },
    { icon: Shield, text: "2-year warranty included" },
    { icon: RefreshCw, text: "30-day return policy" },
  ];
  const images =
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg";
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      {breadcrumb}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={images}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.sale && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{discount}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((img, index) => (
              <button
                key={index + "sgj,bs"}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={images}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category.name}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i + "kjsfx"}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.totalStar / product.reviewCount)
                        ? "fill-current text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {(product.totalStar / product.reviewCount).toPrecision(1)} (
                {product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="font-medium">Quantity:</Label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlist}
                className="px-4"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="outline" size="lg" className="px-4">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index + "ryfblj"} className="flex items-center gap-3">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      {productsTab}

      {/* Related Products */}
      {related}
    </div>
  );
};

export default ProductPageComp;
