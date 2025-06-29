import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const ProductsTab = ({
  description,
  category,
  rating,
  reviewCount,
  stock,
}: {
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: boolean;
}) => {
  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Description</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{description}</p>
                <p className="mb-4">
                  {`This premium product is crafted with attention to detail and built to last. 
                    Whether you're looking for functionality, style, or both, this item delivers 
                    exceptional value and performance.`}
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>High-quality materials and construction</li>
                  <li>Designed for durability and longevity</li>
                  <li>Backed by our satisfaction guarantee</li>
                  <li>Perfect for both personal and professional use</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium">Category</dt>
                  <dd className="text-muted-foreground">{category}</dd>
                </div>
                <div>
                  <dt className="font-medium">Rating</dt>
                  <dd className="text-muted-foreground">{rating}/5 stars</dd>
                </div>
                <div>
                  <dt className="font-medium">Reviews</dt>
                  <dd className="text-muted-foreground">
                    {reviewCount} customer reviews
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Availability</dt>
                  <dd className={stock ? "text-green-600" : "text-red-600"}>
                    {stock ? "In Stock" : "Out of Stock"}
                  </dd>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {/* Mock reviews */}
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i + "jlcnv."}
                            className="h-4 w-4 fill-current text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                      <span className="text-sm text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      Great product! Exactly as described and arrived quickly.
                      Would definitely recommend to others.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsTab;
