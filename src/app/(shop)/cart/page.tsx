"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useGlobalState } from "@/context/GlobalStateProvider";
import { useState } from "react";

export default function ShoppingCart() {
  const { cart: rawCart, updateQuantity, removeFromCart, clearCart } = useGlobalState();
  const cart = Array.isArray(rawCart) ? rawCart : [];
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "DESCUENTO20") {
      setDiscount(subtotal * 0.2);
    } else if (couponCode.toUpperCase() === "PROMO50") {
      setDiscount(50);
    } else {
      setDiscount(0);
      alert("Cupón inválido");
    }
  };

  return (
    <>
      <Header onProductClick={(id: string) => console.log(`Product clicked: ${id}`)} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Parece que aún no has agregado productos a tu carrito.</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Producto</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Cantidad</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Precio</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Subtotal</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <span>Imagen</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-xs text-gray-500">SKU: {item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                              disabled={item.quantity <= 1}
                            >
                              <span className="text-lg">-</span>
                            </button>
                            <input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="mx-2 border text-gray-900 text-center w-12 rounded-md"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                              disabled={item.quantity >= item.stock}
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                          <p className="text-xs text-center mt-1 text-gray-500">
                            {item.stock} disponibles
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-500">S/{item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          S/{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg text-gray-600 font-semibold mb-4">Resumen de la Orden</h2>
              <p className="text-gray-600 font-medium">Subtotal: S/{subtotal.toFixed(2)}</p>
              <p className="text-gray-600 font-medium">IGV (18%): S/{taxAmount.toFixed(2)}</p>
              {discount > 0 && <p className="text-gray-600 font-medium">Descuento: -S/{discount.toFixed(2)}</p>}
              <p className="font-bold text-gray-600 text-xl">Total: S/{total.toFixed(2)}</p>
              <input 
                type="text" 
                placeholder="Código de cupón" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)} 
                className="w-full border border-black text-black p-2 rounded-lg mb-2"
              />
              <button onClick={applyCoupon} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
                Aplicar Cupón
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}