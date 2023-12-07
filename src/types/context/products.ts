import { Dispatch, SetStateAction } from "react";
import { INormalizeDto } from "../products";
import { IsearchByStatusAndDate } from "../filters";

export interface context {
  products: INormalizeDto[];
  searchById: string;
  setSearchById: Dispatch<SetStateAction<string>>;
  status: string;
  createdAt: string;
  setSearchByStatusAndDate: Dispatch<IsearchByStatusAndDate>;
}
