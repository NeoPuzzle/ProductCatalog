import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/apiService";
import { Category } from "@/types/product";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
}
