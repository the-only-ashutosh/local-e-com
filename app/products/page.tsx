import React from "react";
import ProductsComp from "@/components/client/products";
import { Product, ProductCategories } from "@/lib/type";
import { HOST } from "@/lib/consts";

export default async function ProductsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] }> | undefined;
}>) {
  const search = await searchParams;
  const querys = Object.entries(search!).map(([key, value]) => {
    return `${key}=${value}`;
  });
  const url = querys.length
    ? `${HOST}/products?${querys.join("&")}`
    : `${HOST}/products`;
  const prods: Promise<Product[]> = fetch(url, {
    method: "GET",
    headers: { Origin: "wejhreuyr84ouerhdkfjgduir7urhg8oe4ury" },
  })
    .then((res) => res.json())
    .then((res) => res["records"]);
  const cats = fetch(
    `${HOST}/categories?fields=${JSON.stringify(["name", "xata_id"])}`,
    {
      method: "GET",
      headers: { Origin: "wejhreuyr84ouerhdkfjgduir7urhg8oe4ury" },
    }
  )
    .then((res) => res.json())
    .then((res: ProductCategories[]) =>
      res.map((r) => {
        return { name: r.name, id: r.xata_id };
      })
    );
  const [products, categories] = await Promise.all([prods, cats]);
  return <ProductsComp prods={products} cats={categories} />;
}
