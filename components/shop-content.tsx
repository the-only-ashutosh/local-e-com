"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Package, Clock, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCardLocal } from '@/components/product-card-local';
import { Shop } from '@/data/shops';
import { Product } from '@/data/products';

interface ShopContentProps {
  shop: Shop;
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ShopContent({ shop, products }: ShopContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/shops">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shops
          </Link>
        </Button>
      </div>

      {/* Shop Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shop Image */}
              <div className="relative aspect-video lg:aspect-square rounded-lg overflow-hidden">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Shop Details */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                    <p className="text-muted-foreground text-lg">
                      {shop.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={shop.isOpen ? "default" : "secondary"}>
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                    <Badge variant="outline">{shop.category}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="font-medium">{shop.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span>{shop.totalProducts} products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{shop.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{shop.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{shop.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No products available</h3>
                <p className="text-muted-foreground">
                  This shop hasn't listed any products yet.
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCardLocal product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}