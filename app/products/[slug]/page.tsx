import React from "react";
import ProductPageComp from "@/components/client/product_page";
import ProductBreadCrumb from "@/components/server/product-breadcrumb";
import ProductsTab from "@/components/server/product-tabs";
import RelatedProd from "@/components/server/related-prod";
import { Button } from "@/components/ui/button";
import { ProductPage } from "@/lib/type";
import Link from "next/link";
import { HOST } from "@/lib/consts";
import { TrustBadgesStrip } from "@/components/trust-badges-strip";
import { StickyAddToCart } from "@/components/sticky-add-to-cart";
import { QuickViewModal } from "@/components/quick-view-modal";
import { RecentlyViewedProducts } from "@/components/recently-viewed-products";

export default async function ProductDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const id = "rec_" + slug.split("-rec_")[1];
  const { product, similar }: ProductPage = await fetch(
    `${HOST}/products/${id}`,
    {
      method: "GET",
      headers: { Origin: "wejhreuyr84ouerhdkfjgduir7urhg8oe4ury" },
    }
  ).then((res) => res.json());

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ProductPageComp
        data={{ product, similar }}
        breadcrumb={
          <ProductBreadCrumb
            category={product.category.name}
            productName={product.name}
            slug={product.category.slug}
          />
        }
        productsTab={
          <ProductsTab
            category={product.category.name}
            description={product.description}
            rating={Number(
              (product.totalStar / product.reviewCount).toPrecision(1)
            )}
            reviewCount={product.reviewCount}
            stock={product.stock > 0}
          />
        }
        related={<RelatedProd related={similar} />}
      />
      
      {/* Trust Badges */}
      <TrustBadgesStrip className="mt-8" />
      
      {/* Sticky Add to Cart for Mobile */}
      <StickyAddToCart product={product} />
      
      {/* Recently Viewed Products */}
      <div className="container mx-auto px-4 py-8">
        <RecentlyViewedProducts currentProductId={product.xata_id} />
      </div>
    </>
  );
}