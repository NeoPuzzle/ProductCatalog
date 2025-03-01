export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    brand: string;
    rating: number;
    stock: number;
    images: string[];
    features: string[];
    specifications: Record<string, string>;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
  }