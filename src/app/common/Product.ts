import { ProductCategory } from "./productCategory";

export interface Product {
    id: number; // Maps to Long in Java
    name: string; // Maps to String in Java
    price: number; // Maps to Double in Java
    category: ProductCategory; // Maps to ProductCategory in Java
    image: string | null; // Maps to byte[] in Java (stored as Base64 string in TS)
    quantity:number;
    available:boolean;
  }