"use client";
import { Header } from "./Header";

export default function HeaderWrapper({
  onProductClick,
}: {
  onProductClick?: (id: string) => void;
}) {
  return <Header onProductClick={onProductClick ?? (() => {})} />;
}
