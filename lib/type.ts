export type Categories = {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  products: number;
  xata_createdat: string;
  xata_id: string;
  xata_updatedat: string;
  xata_version: number;
};

type ProductCommon = {
  city: string;
  description: string;
  featured: boolean;
  images: string[];
  isActive: boolean;
  name: string;
  originalPrice: number;
  price: number;
  reviewCount: number;
  sale: boolean;
  slug: string;
  stock: number;
  totalStar: number;
  xata_createdat: string;
  xata_updatedat: string;
  xata_id: string;
  xata_version: number;
};

export interface Product extends ProductCommon {
  category: {
    name: string;
    xata_createdat: string;
    xata_updatedat: string;
    xata_id: string;
    xata_version: number;
  };
}

export type RelatedProduct = {
  featured: boolean;
  images: string[];
  name: string;
  originalPrice: number;
  price: number;
  reviewCount: number;
  sale: boolean;
  slug: string;
  totalStar: number;
  xata_createdat: string;
  xata_updatedat: string;
  xata_id: string;
  xata_version: number;
};

interface SingleProduct extends ProductCommon {
  category: {
    name: string;
    slug: string;
    xata_createdat: string;
    xata_updatedat: string;
    xata_id: string;
    xata_version: number;
  };
}

export type ProductPage = {
  product: SingleProduct;
  similar: RelatedProduct[];
};

export type ProductCategories = {
  name: string;
  xata_createdat: string;
  xata_updatedat: string;
  xata_id: string;
  xata_version: number;
};
