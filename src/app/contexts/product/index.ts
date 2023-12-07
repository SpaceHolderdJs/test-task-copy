import { createContext } from "react";
import { context } from "@/types/context/products";

export const ProductContex = createContext<null | context>(null);
