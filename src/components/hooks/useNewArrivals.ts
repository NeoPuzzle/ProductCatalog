import { useQuery } from "@tanstack/react-query";
import { fetchNewProducts } from "@/services/apiService";
import { Product } from "@/types/product";

export function useNewArrivals() {
  return useQuery<Product[]>({
    queryKey: ["newArrivals"],
    queryFn: fetchNewProducts,
    staleTime: 1000 * 60 * 10,
  });
}
