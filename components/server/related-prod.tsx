import { RelatedProduct } from "@/lib/type";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const RelatedProd = ({ related }: { related: RelatedProduct[] }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((relatedProduct) => (
          <Card key={relatedProduct.xata_id} className="group overflow-hidden">
            <Link href={`/products/${relatedProduct.slug}`}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={
                    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
                  }
                  alt={relatedProduct.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">
                  {relatedProduct.name}
                </h3>
                <p className="font-bold">{formatPrice(relatedProduct.price)}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProd;
