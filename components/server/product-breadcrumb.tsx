import Link from "next/link";
import React from "react";

const ProductBreadCrumb = ({
  category,
  slug,
  productName,
}: {
  category: string;
  slug: string;
  productName: string;
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-foreground">
        Products
      </Link>
      <span>/</span>
      <Link
        href={`/products?category=${slug}`}
        className="hover:text-foreground"
      >
        {category}
      </Link>
      <span>/</span>
      <span className="text-foreground">{productName}</span>
    </nav>
  );
};

export default ProductBreadCrumb;
