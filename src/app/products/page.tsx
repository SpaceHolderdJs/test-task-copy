"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { productsApi } from "@/api/products";
import { SharedButton } from "@/components/shared/button";
import { ProductsTable } from "@/components/table";
import { INormalizeDto, IProducts } from "@/types/products";
import { ProductContex } from "../contexts/product";
import { FilterWindow } from "@/components/shared/filter-window";
import { generateRandomStatus } from "@/helpers/generateRandomStatus";
import { generateRandomFormattedDate } from "@/helpers/generateRandomDate";
import { dtoForFilteWindow, dtoForSharedButton } from "@/mocked";
import { IsearchByStatusAndDate } from "@/types/filters";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAllProducts,
  });

  const [searchById, setSearchById] = useState<string>("");
  const [searchByStatusAndDate, setSearchByStatusAndDate] =
    useState<IsearchByStatusAndDate>({
      status: "",
      createdAt: "",
    });

  const normalizeDto: INormalizeDto[] = useMemo(() => {
    return data?.products.reduce((acc: INormalizeDto[], product: IProducts) => {
      return [
        ...acc,
        {
          ...product,
          status: generateRandomStatus(),
          createdAt: generateRandomFormattedDate(),
        },
      ];
    }, []);
  }, [data]);

  const productsContextValue = useMemo(() => {
    return {
      products: normalizeDto,
      searchById,
      setSearchById,
      status: searchByStatusAndDate.status,
      createdAt: searchByStatusAndDate.createdAt,
      setSearchByStatusAndDate,
    };
  }, [
    normalizeDto,
    searchById,
    searchByStatusAndDate.createdAt,
    searchByStatusAndDate.status,
  ]);

  if (!data?.products) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <ProductContex.Provider value={productsContextValue}>
        <div className="flex gap-5">
          {dtoForFilteWindow.map(({ isById, text }, index) => (
            <FilterWindow isById={isById} text={text} key={index} />
          ))}
        </div>
        <div className="flex gap-5">
          {dtoForSharedButton.map(({ text }) => (
            <SharedButton text={text} key={text} />
          ))}
        </div>
        <ProductsTable />
      </ProductContex.Provider>
    </div>
  );
}
