import { newProducts } from "@/mocks/db";
import { ProductCard } from "./ProductCard";

export function NewArrivals() {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Nuevos Lanzamientos</h2>
            <p className="text-gray-600">Los últimos productos que acaban de llegar</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }