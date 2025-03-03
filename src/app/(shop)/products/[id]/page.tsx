"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchProductById } from "@/services/apiService";
import { useGlobalState } from "@/context/GlobalContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ArrowLeft, Facebook, Heart, Instagram, Share, ShoppingCart, Star, Twitch, X } from "lucide-react";
import Link from "next/link";
import HeaderWrapper from "@/components/HeaderWrapper";
import { Footer } from "@/components/Footer";
import { Product } from "@/types/product";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity] = useState(1);
  const { addToCart } = useGlobalState();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setSelectedImage(0);
        })
        .catch((error) => console.error("Error fetching product:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: quantity,
        images: product.images,
        stock: product.stock,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/5">
            <Skeleton height={400} className="mb-4 rounded-xl" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, idx) => (
                <Skeleton key={idx} height={80} className="rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:w-3/5">
            <Skeleton height={32} width="66%" className="mb-4" />
            <Skeleton count={3} className="mb-2" />
            <Skeleton height={40} width="33%" className="mb-4" />
            <Skeleton height={48} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="py-16 px-4 rounded-lg bg-red-50 border border-red-200">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que estás buscando no existe o ha sido eliminado.</p>
          <Link href="/productos" className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
            <ArrowLeft size={16} />
            Ver otros productos
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <>
    <HeaderWrapper />
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Inicio</Link> &gt; 
        <Link href="/" className="hover:text-blue-600 mx-1">Categorías</Link> &gt; 
        <span className="text-blue-600 font-medium ml-1">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/5">
          <div className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain w-full h-full p-4"
              priority
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {product.images.map((img: string, idx: number) => (
              <div
                key={idx}
                className={`cursor-pointer rounded-lg overflow-hidden aspect-square bg-white border ${
                  selectedImage === idx
                    ? "border-blue-600 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-400"
                }`}
                onClick={() => setSelectedImage(idx)}
              >
                <Image
                  src={img}
                  alt={`Vista ${idx + 1}`}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full p-1"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-3/5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 4 ? "fill-yellow-500 text-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-700">4.0 (128 reseñas)</span>
                <span className="text-sm text-gray-700">•</span>
                <span className={`text-sm ${product.stock > 0 ? "text-green-700" : "text-red-700"}`}>
                  {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2.5 rounded-full border ${isFavorite ? 'bg-red-100 border-red-300 text-red-600' : 'border-gray-300 hover:bg-gray-100 text-gray-600'}`}
              >
                <Heart className={isFavorite ? "fill-red-600" : ""} size={20} />
              </button>
              <button className="p-2.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600">
                <Share size={20} />
              </button>
            </div>
          </div>

          <div className="my-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-800">
                S/ {product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <>
                  <span className="text-gray-600 line-through">
                    S/ {product.price}
                  </span>
                  <span className="text-sm font-medium px-2 py-1 bg-red-100 text-red-700 rounded-md">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-700 mt-2">
              Precio incluye impuestos • Envío calculado en el checkout
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="text-gray-700">Garantía de 12 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="text-gray-700">Entrega en 24-48 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="text-gray-700">Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="text-gray-700">Devolución gratis 30 días</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product || product.stock <= 0}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition disabled:bg-gray-400"
            >
              <ShoppingCart size={20} />
              Añadir al Carrito
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-800">Tiempo de entrega</span>
              <span className="text-gray-700">24-48 horas</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-800">SKU</span>
              <span className="text-gray-700">PRD-{product.id}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="font-medium text-gray-800">Compartir</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <Facebook size={20} />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <Twitch size={20} />
                </button>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <Instagram size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}