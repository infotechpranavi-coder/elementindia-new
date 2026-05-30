export type ProductCategoryItem = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  published: boolean;
};

export type ProductItem = {
  id: string;
  name: string;
  /** Product filter tab: CCTV, Access, Network, Safety */
  category: string;
  price?: number;
  description: string;
  imageUrl: string;
  oldPrice?: number;
  badge?: string;
  badgeColor?: string;
  rating?: number;
  reviews?: number;
};

export type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
};

export type CatalogData = {
  products: ProductItem[];
  services: ServiceItem[];
};
