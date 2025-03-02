'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useGlobalState } from '@/context/GlobalStateProvider';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useGlobalState();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        stock: product.stock,
        quantity: 1,
      });
      alert(`${product.name} añadido al carrito`);
    } else {
      alert("Este producto no está disponible");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/`}>
        <div className="cursor-pointer">
          <div className="relative pt-[100%]">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.discountPrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <p>{product.brand}</p>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1">{product.rating}</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 h-12">{product.name}</h3>
            <div className="mt-2 flex items-center">
              {product.discountPrice ? (
                <>
                  <span className="text-lg font-bold text-gray-900">S/{product.discountPrice.toLocaleString()}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">S/{product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">S/{product.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 flex items-center justify-between">
        <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? 'En stock' : 'Agotado'}
        </span>
        <button 
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}