export interface ProductCategory {
    id:number;
    name: string;
    image: string | null; // Maps to byte[] in Java (stored as Base64 string in TS)
  }