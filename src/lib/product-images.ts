import fridge from "@/assets/hero-1.jpg";
import tv from "@/assets/hero-2.jpg";
import laundry from "@/assets/hero-3.jpg";
import type { Product } from "@/data/products";

const map: Record<Product["image"], string> = { fridge, tv, laundry };

export const productImage = (key: Product["image"]) => map[key];
