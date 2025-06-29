import React from "react";
import CategoriesGrid from "@/components/client/categories";
import { HOST } from "@/lib/consts";

export default async function CategoriesPage() {
  const categories = await fetch(
    `${HOST}/categories?fields=${JSON.stringify(["*"])}`,
    {
      method: "GET",
      headers: { Origin: "wejhreuyr84ouerhdkfjgduir7urhg8oe4ury" },
    }
  )
    .then((res) => res.json())
    .then((res) => res);

  return <CategoriesGrid categories={categories} />;

  /* Featured Categories
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
              (p) => p.category === category.name
            );
            return (
              <motion.div
                key={category.name + category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Discover our premium {category.name.toLowerCase()}{" "}
                        collection with
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
                          category.name.toLowerCase().replace(/\s+/g, "-")
                        )}`}
                        className="mt-4 text-primary hover:underline font-medium"
                      >
                        Shop {category.name} →
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div> */
}
