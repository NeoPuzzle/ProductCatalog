"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductById } from "@/services/apiService";
import { useGlobalState } from "@/context/GlobalStateProvider";

export default function ProductModal({
  productId,
  isOpen,
  onClose
}: {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useGlobalState();

  useEffect(() => {
    if (isOpen && productId) {
      setLoading(true);
      fetchProductById(productId)
        .then((data) => {
          setProduct(data);
          setSelectedImage(0);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: 1,
        stock: product.stock
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
          </div>
        ) : product ? (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5">
                <div className="aspect-square mb-4 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-white rounded-lg overflow-hidden border-2 cursor-pointer ${
                        selectedImage === idx ? "border-blue-500" : "border-transparent hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - vista ${idx + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-3/5">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-1">⭐️</span>
                  <span className="text-gray-700">
                    {product.rating} ({product.stock} disponibles)
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900 mr-2">
                    $
                    {product.discountPrice
                      ? product.discountPrice.toLocaleString()
                      : product.price.toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-gray-500 line-through">
                      S/{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                  >
                    Añadir al Carrito
                  </button>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                    Favorito
                  </button>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Características</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Especificaciones</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {Object.entries(product.specifications).map(
                      ([key, value], idx) => (
                        <li key={idx}>
                          <strong>{key}:</strong> {value as string}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-red-500">
            No se pudo cargar el producto
          </div>
        )}
      </div>
    </div>
  );
}
