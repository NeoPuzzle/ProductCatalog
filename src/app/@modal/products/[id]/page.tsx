"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductById } from "@/services/apiService";
import Image from "next/image";
import { useGlobalState } from "@/context/GlobalContext";

export default function ProductModal({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useGlobalState();

  useEffect(() => {
    fetchProductById(params.id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error))
      .finally(() => setLoading(false));
  }, [params.id]);

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="relative bg-white rounded-lg max-w-5xl w-full p-6">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : product ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/5">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="lg:w-3/5">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-gray-700">{product.description}</p>
              <button
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, images: product.images, stock: product.stock })}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ) : (
          <div>No se pudo cargar el producto</div>
        )}
      </div>
    </div>
  );
}
