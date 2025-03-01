import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/product/${product.id}`}>
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
      </Link>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <p>{product.brand}</p>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 h-12">{product.name}</h3>
        </Link>
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
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'En stock' : 'Agotado'}
          </span>
          <button 
            disabled={product.stock === 0}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}