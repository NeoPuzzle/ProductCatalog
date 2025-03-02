import { useState } from "react";

export function useSearch<T>(data: T[] | null, key: keyof T) {
  const [query, setQuery] = useState("");

  const filteredData = (data || []).filter((item) =>
    String(item[key]).toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, filteredData };
}