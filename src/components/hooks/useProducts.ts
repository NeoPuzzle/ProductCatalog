import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/apiService";
import { Product } from "@/types/product";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: () => fetchProducts(1, 12),
    staleTime: 1000 * 60 * 10,
  });
}
