export interface Deal {
  id: string;
  productId: string;
  shopId: string;
  citySlug: string;
  discount: number;
  originalPrice: number;
  salePrice: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  featured: boolean;
}

export const deals: Deal[] = [
  {
    id: 'deal-1',
    productId: 'milk-amul-500ml',
    shopId: 'valsad-mart',
    citySlug: 'valsad',
    discount: 15,
    originalPrice: 30,
    salePrice: 25.50,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
  {
    id: 'deal-2',
    productId: 'rice-basmati-1kg',
    shopId: 'valsad-mart',
    citySlug: 'valsad',
    discount: 20,
    originalPrice: 140,
    salePrice: 112,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
  {
    id: 'deal-3',
    productId: 'apple-kashmir-1kg',
    shopId: 'fresh-fruits-valsad',
    citySlug: 'valsad',
    discount: 25,
    originalPrice: 200,
    salePrice: 150,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
  {
    id: 'deal-4',
    productId: 'smartphone-samsung-a54',
    shopId: 'electronics-hub-valsad',
    citySlug: 'valsad',
    discount: 10,
    originalPrice: 38999,
    salePrice: 35099,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
  {
    id: 'deal-5',
    productId: 'headphones-boat',
    shopId: 'electronics-hub-valsad',
    citySlug: 'valsad',
    discount: 40,
    originalPrice: 2499,
    salePrice: 1499,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
  {
    id: 'deal-6',
    productId: 'shampoo-loreal',
    shopId: 'mumbai-supermarket',
    citySlug: 'mumbai',
    discount: 17,
    originalPrice: 350,
    salePrice: 290,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    isActive: true,
    featured: true,
  },
];

export function getDealsByCity(citySlug: string): Deal[] {
  return deals.filter(deal => deal.citySlug === citySlug && deal.isActive);
}

export function getFeaturedDeals(citySlug: string): Deal[] {
  return deals.filter(deal => 
    deal.citySlug === citySlug && 
    deal.isActive && 
    deal.featured
  );
}