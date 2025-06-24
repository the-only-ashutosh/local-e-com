"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, products } from "@/lib/data";

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

export default function CategoriesPage() {
  const getCategoryImage = (category: string) => {
    const categoryImages: Record<string, string> = {
      Electronics:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      Clothing:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      "Home & Garden":
        "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg",
      Sports:
        "https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg",
      Books:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
      "Health & Beauty":
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
      Toys: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      Automotive:
        "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    };
    return (
      categoryImages[category] ||
      "https://images.pexels.com/photos/974964/pexels-photo-974964.jpeg"
    );
  };

  const getCategoryProductCount = (category: string) => {
    return products.filter((product) => product.category === category).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-4">Shop by Category</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {
            "Explore our diverse range of categories to find exactly what you're looking for. From electronics to fashion, we have everything you need."
          }
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {categories.map((category) => {
          const productCount = getCategoryProductCount(category);
          return (
            <motion.div key={category} variants={itemVariants}>
              <Link
                href={`/categories/${encodeURIComponent(
                  category.toLowerCase().replace(/\s+/g, "-")
                )}`}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={getCategoryImage(category)}
                      alt={category}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-2">{category}</h3>
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-black"
                        >
                          {productCount}{" "}
                          {productCount === 1 ? "Product" : "Products"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Featured Categories */}
      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
          <p className="text-muted-foreground">
            Our most popular categories with the best selection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.slice(0, 2).map((category) => {
            const categoryProducts = products.filter(
              (p) => p.category === category
            );
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <Image
                        src={getCategoryImage(category)}
                        alt={category}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2">{category}</h3>
                      <p className="text-muted-foreground mb-4">
                        Discover our premium {category.toLowerCase()} collection
                        with
                        {categoryProducts.length} carefully selected products.
                      </p>
                      <div className="space-y-2">
                        {categoryProducts.slice(0, 3).map((product) => (
                          <div key={product.id} className="text-sm">
                            • {product.name}
                          </div>
                        ))}
                        {categoryProducts.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{categoryProducts.length - 3} more products
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/categories/${encodeURIComponent(
                          category.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                        className="mt-4 text-primary hover:underline font-medium"
                      >
                        Shop {category} →
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
