import axios from "axios";

const API_URL = "http://localhost:3001";

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function fetchProducts(
  page: number = 1,
  limit: number = 12,
  filters: { category?: string; brand?: string; search?: string } = {}
) {
  try {
    const params: Record<string, string | number> = {
      _page: page,
      _limit: limit,
    };

    if (filters.category) params.category = filters.category;
    if (filters.brand) params.brand = filters.brand;
    if (filters.search) params.q = filters.search;

    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchProductById(productId: string) {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product");
  }
}


export async function fetchNewProducts() {
    try { 
      const response = await axios.get(`${API_URL}/newProducts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }