export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  shopId: string;
  rating: number;
  reviewCount: number;
}

export const products: Record<string, Product[]> = {
  'valsad-mart': [
    {
      id: 'milk-amul-500ml',
      name: 'Amul Fresh Milk',
      price: 28,
      originalPrice: 30,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
      description: 'Fresh cow milk, 500ml pack. Rich in calcium and protein.',
      category: 'Dairy',
      inStock: true,
      shopId: 'valsad-mart',
      rating: 4.5,
      reviewCount: 124
    },
    {
      id: 'bread-britannia',
      name: 'Britannia Bread',
      price: 25,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg',
      description: 'Soft and fresh white bread, perfect for breakfast.',
      category: 'Bakery',
      inStock: true,
      shopId: 'valsad-mart',
      rating: 4.2,
      reviewCount: 89
    },
    {
      id: 'rice-basmati-1kg',
      name: 'Basmati Rice 1kg',
      price: 120,
      originalPrice: 140,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      description: 'Premium quality basmati rice, aromatic and long grain.',
      category: 'Grains',
      inStock: true,
      shopId: 'valsad-mart',
      rating: 4.7,
      reviewCount: 203
    },
    {
      id: 'oil-sunflower-1l',
      name: 'Sunflower Oil 1L',
      price: 95,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
      description: 'Pure sunflower cooking oil, heart healthy and light.',
      category: 'Cooking Oil',
      inStock: false,
      shopId: 'valsad-mart',
      rating: 4.3,
      reviewCount: 156
    }
  ],
  
  'fresh-fruits-valsad': [
    {
      id: 'apple-kashmir-1kg',
      name: 'Kashmir Apples 1kg',
      price: 180,
      originalPrice: 200,
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
      description: 'Fresh and crispy Kashmir apples, rich in vitamins.',
      category: 'Fruits',
      inStock: true,
      shopId: 'fresh-fruits-valsad',
      rating: 4.8,
      reviewCount: 67
    },
    {
      id: 'banana-robusta',
      name: 'Robusta Bananas',
      price: 40,
      image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg',
      description: 'Fresh robusta bananas, perfect for breakfast and snacks.',
      category: 'Fruits',
      inStock: true,
      shopId: 'fresh-fruits-valsad',
      rating: 4.6,
      reviewCount: 45
    },
    {
      id: 'tomato-local-1kg',
      name: 'Local Tomatoes 1kg',
      price: 35,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      description: 'Fresh local tomatoes, perfect for cooking and salads.',
      category: 'Vegetables',
      inStock: true,
      shopId: 'fresh-fruits-valsad',
      rating: 4.4,
      reviewCount: 78
    }
  ],
  
  'electronics-hub-valsad': [
    {
      id: 'smartphone-samsung-a54',
      name: 'Samsung Galaxy A54',
      price: 35999,
      originalPrice: 38999,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      description: 'Latest Samsung smartphone with 128GB storage and 50MP camera.',
      category: 'Smartphones',
      inStock: true,
      shopId: 'electronics-hub-valsad',
      rating: 4.5,
      reviewCount: 234
    },
    {
      id: 'headphones-boat',
      name: 'boAt Rockerz 450',
      price: 1499,
      originalPrice: 2499,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      description: 'Wireless Bluetooth headphones with extra bass and 15-hour playback.',
      category: 'Audio',
      inStock: true,
      shopId: 'electronics-hub-valsad',
      rating: 4.3,
      reviewCount: 189
    }
  ],
  
  'mumbai-supermarket': [
    {
      id: 'detergent-surf-1kg',
      name: 'Surf Excel 1kg',
      price: 185,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      description: 'Powerful detergent powder for tough stain removal.',
      category: 'Household',
      inStock: true,
      shopId: 'mumbai-supermarket',
      rating: 4.4,
      reviewCount: 312
    },
    {
      id: 'shampoo-loreal',
      name: "L'Oreal Paris Shampoo",
      price: 299,
      originalPrice: 350,
      image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg',
      description: 'Nourishing shampoo for all hair types, 340ml bottle.',
      category: 'Personal Care',
      inStock: true,
      shopId: 'mumbai-supermarket',
      rating: 4.6,
      reviewCount: 156
    }
  ]
};

export function getProductsByShop(shopId: string): Product[] {
  return products[shopId] || [];
}

export function getProductById(productId: string): Product | undefined {
  for (const shopProducts of Object.values(products)) {
    const product = shopProducts.find(p => p.id === productId);
    if (product) return product;
  }
  return undefined;
}