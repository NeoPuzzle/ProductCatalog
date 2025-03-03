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

  export type CategoryPageProps = {
    params: { slug: string };
  };

  export interface ProductCardProps {
    product: Product;
  }

  export interface CartItem {
    id: string;
    name: string;
    price: number;
    images: string | string[];
    quantity: number;
    stock: number;
  }
  
  export interface GlobalState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
  }