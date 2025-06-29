import { notFound } from 'next/navigation';
import { ProductContent } from '@/components/product-content';
import { getProductById } from '@/data/products';
import { getShopById } from '@/data/shops';

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  
  const product = getProductById(productId);
  
  if (!product) {
    notFound();
  }

  const shop = getShopById(product.shopId);

  return <ProductContent product={product} shop={shop} />;
}