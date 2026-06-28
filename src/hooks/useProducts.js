import { useContext } from "react";
import { ProductContext } from "../context/ProductContext.jsx";

export function useProducts() {
  return useContext(ProductContext);
}
