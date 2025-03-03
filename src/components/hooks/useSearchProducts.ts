import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/apiService";
import { Product } from "@/types/product";

export function useSearchProducts(searchQuery: string) {
  return useQuery<Product[]>({
    queryKey: ["searchProducts", searchQuery],
    queryFn: () => fetchProducts(1, 12, { search: searchQuery }),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });
}
