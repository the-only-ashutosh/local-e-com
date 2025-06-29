import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShopsContent } from '@/components/shops-content';
import { getShopsByCity } from '@/data/shops';
import { getCityBySlug } from '@/data/cities';

export default async function ShopsPage() {
  const cookieStore = await cookies();
  const citySlug = cookieStore.get('city')?.value;

  if (!citySlug) {
    redirect('/');
  }

  const city = getCityBySlug(citySlug);
  const shops = getShopsByCity(citySlug);

  if (!city) {
    redirect('/');
  }

  return <ShopsContent city={city} shops={shops} />;
}