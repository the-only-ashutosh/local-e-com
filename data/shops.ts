export interface Shop {
  id: string;
  name: string;
  description: string;
  citySlug: string;
  rating: number;
  totalProducts: number;
  image: string;
  address: string;
  phone: string;
  category: string;
  isOpen: boolean;
  openingHours: string;
}

export const shops: Shop[] = [
  // Valsad shops
  {
    id: 'valsad-mart',
    name: 'Valsad Mart',
    description: 'Your neighborhood grocery store with fresh produce and daily essentials.',
    citySlug: 'valsad',
    rating: 4.5,
    totalProducts: 156,
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
    address: 'Station Road, Valsad',
    phone: '+91 98765 43210',
    category: 'Grocery',
    isOpen: true,
    openingHours: '7:00 AM - 10:00 PM'
  },
  {
    id: 'fresh-fruits-valsad',
    name: 'Fresh Fruits Corner',
    description: 'Premium quality fruits and vegetables sourced directly from farms.',
    citySlug: 'valsad',
    rating: 4.8,
    totalProducts: 89,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    address: 'Market Yard, Valsad',
    phone: '+91 98765 43211',
    category: 'Fruits & Vegetables',
    isOpen: true,
    openingHours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'electronics-hub-valsad',
    name: 'Electronics Hub',
    description: 'Latest gadgets, mobile phones, and electronic accessories.',
    citySlug: 'valsad',
    rating: 4.2,
    totalProducts: 234,
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    address: 'Tithal Road, Valsad',
    phone: '+91 98765 43212',
    category: 'Electronics',
    isOpen: false,
    openingHours: '10:00 AM - 9:00 PM'
  },
  
  // Mumbai shops
  {
    id: 'mumbai-supermarket',
    name: 'Mumbai Supermarket',
    description: 'One-stop shop for all your daily needs in the heart of Mumbai.',
    citySlug: 'mumbai',
    rating: 4.3,
    totalProducts: 567,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    address: 'Linking Road, Bandra West',
    phone: '+91 98765 43213',
    category: 'Supermarket',
    isOpen: true,
    openingHours: '8:00 AM - 11:00 PM'
  },
  {
    id: 'fashion-boutique-mumbai',
    name: 'Fashion Boutique',
    description: 'Trendy clothing and accessories for men and women.',
    citySlug: 'mumbai',
    rating: 4.6,
    totalProducts: 345,
    image: 'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg',
    address: 'Hill Road, Bandra West',
    phone: '+91 98765 43214',
    category: 'Fashion',
    isOpen: true,
    openingHours: '11:00 AM - 10:00 PM'
  },
  
  // Surat shops
  {
    id: 'surat-textiles',
    name: 'Surat Textiles',
    description: 'Premium quality fabrics and textiles at wholesale prices.',
    citySlug: 'surat',
    rating: 4.7,
    totalProducts: 423,
    image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg',
    address: 'Ring Road, Surat',
    phone: '+91 98765 43215',
    category: 'Textiles',
    isOpen: true,
    openingHours: '9:00 AM - 8:00 PM'
  },
];

export function getShopsByCity(citySlug: string): Shop[] {
  return shops.filter(shop => shop.citySlug === citySlug);
}

export function getShopById(shopId: string): Shop | undefined {
  return shops.find(shop => shop.id === shopId);
}