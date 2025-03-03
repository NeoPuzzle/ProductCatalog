"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useState, useMemo } from "react";
import { useGlobalState } from "@/context/GlobalContext";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function ShoppingCart() {
  const { cart: rawCart, updateQuantity, removeFromCart, clearCart } = useGlobalState();
  const cart = Array.isArray(rawCart) ? rawCart : [];
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const taxRate = 0.18;
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const taxAmount = useMemo(() => subtotal * taxRate, [subtotal]);
  const total = useMemo(() => subtotal + taxAmount - discount, [subtotal, taxAmount, discount]);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "DESCUENTO20") {
      setDiscount(subtotal * 0.2);
      setCouponMessage("Cupón aplicado con éxito: 20% de descuento.");
    } else if (couponCode.toUpperCase() === "PROMO50") {
      setDiscount(50);
      setCouponMessage("Cupón aplicado con éxito: S/50 de descuento.");
    } else {
      setDiscount(0);
      setCouponMessage("Cupón inválido, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <HeaderWrapper />
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
              <div className="bg-gray-600 rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-500">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Producto</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Cantidad</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Precio</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Subtotal</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 flex items-center">
                          <img src={Array.isArray(item.images) ? item.images[0] : item.images} alt={item.name} className="h-20 w-20 object-cover rounded-md border" />
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                            <p className="text-xs text-gray-900">SKU: {item.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-900 p-1"
                            disabled={item.quantity <= 1}
                          >-
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = Math.max(1, Math.min(item.stock, parseInt(e.target.value) || 1));
                              updateQuantity(item.id, newQuantity);
                            }}
                            className="mx-2 border text-gray-900 text-center w-12 rounded-md"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                            className="text-gray-900 p-1"
                            disabled={item.quantity >= item.stock}
                          >+
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">S/{item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">S/{(item.price * item.quantity).toFixed(2)}</td>
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
            <div className="lg:w-1/3 bg-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Resumen de la Orden</h2>
              <p className="text-gray-600">Subtotal: S/{subtotal.toFixed(2)}</p>
              <p className="text-gray-600">IGV (18%): S/{taxAmount.toFixed(2)}</p>
              {discount > 0 && <p className="text-gray-600">Descuento: -S/{discount.toFixed(2)}</p>}
              <p className="font-bold text-xl">Total: S/{total.toFixed(2)}</p>
              <input type="text" placeholder="Código de cupón" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="w-full border p-2 rounded-lg mb-2" />
              <button onClick={applyCoupon} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                Aplicar Cupón
              </button>
              {couponMessage && <p className="text-red-500 mt-2">{couponMessage}</p>}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}