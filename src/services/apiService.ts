import { Category } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function fetchProductsByCategory(categorySlug: string) {
  try {
    const categoriesResponse = await fetch(`${API_URL}/categories`);
    if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");
    const categories = await categoriesResponse.json();

    const category = categories.find((cat: Category) => cat.slug === categorySlug);
    if (!category) throw new Error("Categoría no encontrada");

    const productsResponse = await fetch(
      `${API_URL}/products?category=${encodeURIComponent(category.name)}`
    );
    if (!productsResponse.ok) throw new Error("Failed to fetch products");
    return await productsResponse.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

export async function fetchProducts(
  page: number = 1,
  limit: number = 12,
  filters: { category?: string; brand?: string; search?: string } = {}
) {
  try {
    const params = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
    });

    if (filters.category) params.append("category", filters.category);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.search) params.append("q", filters.search);

    const response = await fetch(`${API_URL}/products?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductById(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function fetchNewProducts() {
  try {
    const response = await fetch(`${API_URL}/newProducts`);
    if (!response.ok) throw new Error("Failed to fetch new products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching new products:", error);
    throw new Error("Failed to fetch new products");
  }
}