import { notFound } from 'next/navigation';
import { ShopContent } from '@/components/shop-content';
import { getShopById } from '@/data/shops';
import { getProductsByShop } from '@/data/products';

interface ShopPageProps {
  params: Promise<{ shopId: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { shopId } = await params;
  
  const shop = getShopById(shopId);
  const products = getProductsByShop(shopId);

  if (!shop) {
    notFound();
  }

  return <ShopContent shop={shop} products={products} />;
}