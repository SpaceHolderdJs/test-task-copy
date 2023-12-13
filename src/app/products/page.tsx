"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { productsApi } from "@/api/products";
import { ProductsTable } from "@/components/table";
import { INormalizeDto, IProducts } from "@/types/products";
import { ProductContex } from "../contexts/product";
import { FilterWindow } from "@/components/shared/filter-window";
import { generateRandomStatus } from "@/helpers/generateRandomStatus";
import { generateRandomFormattedDate } from "@/helpers/generateRandomDate";
import { IsearchByStatusAndDate } from "@/types/filters";
import { Modals } from "@/components/modals";
import { FilterButton } from "@/components/parts/filters-button";

export default function Page() {
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: productsApi.getAllProducts,
    });

    const [openModalById, setOpenModalById] = useState(false);
    const [openModalByState, setOpenModalByState] = useState(false);
    const [searchById, setSearchById] = useState<string>("");
    const [isSearchById, setIsSearchById] = useState(false);
    const [isProductNotFound, setProductNotFound] = useState(false);
    const [isClearAllFilters, setIsClearAllFilters] = useState(false);
    const [searchByStatusAndDate, setSearchByStatusAndDate] =
        useState<IsearchByStatusAndDate>({
            status: "",
            createdAt: "",
        });

    const normalizeDto: INormalizeDto[] = useMemo(() => {
        return data?.products.reduce(
            (acc: INormalizeDto[], product: IProducts) => {
                return [
                    ...acc,
                    {
                        ...product,
                        status: generateRandomStatus(),
                        createdAt: generateRandomFormattedDate(),
                    },
                ];
            },
            []
        );
    }, [data]);

    const productsContextValue = useMemo(() => {
        return {
            products: normalizeDto,
            searchById,
            setSearchById,
            status: searchByStatusAndDate.status,
            createdAt: searchByStatusAndDate.createdAt,
            setSearchByStatusAndDate,
            isSearchById,
            setIsSearchById,
            clearAllFilters: isClearAllFilters,
            setIsClearAllFilters,
            isProductNotFound,
            setProductNotFound,
        };
    }, [
        isClearAllFilters,
        isProductNotFound,
        isSearchById,
        normalizeDto,
        searchById,
        searchByStatusAndDate.createdAt,
        searchByStatusAndDate.status,
    ]);

    const resetFilters = useCallback(() => {
        setIsClearAllFilters(false);
        productsContextValue.setIsSearchById(false);
        productsContextValue.setSearchById("");
        productsContextValue.setSearchByStatusAndDate({
            status: "",
            createdAt: "",
        });
        setProductNotFound(false);
    }, [productsContextValue]);

    const handleOpenModalById = useCallback(() => {
        setOpenModalById(true);
        resetFilters();
    }, [resetFilters]);

    const handleOpenModalByState = useCallback(() => {
        setOpenModalByState(true);
        resetFilters();
    }, [resetFilters]);

    const handleCloseModalById = () => {
        setOpenModalById(false);
    };

    const handleCloseModalByState = () => {
        setOpenModalByState(false);
    };

    const clearAllFilters = () => {
        setIsClearAllFilters(true);
    };

    const settersForProducts = {
        handleCloseModalByState,
        handleCloseModalById,
    };

    const dtoForFilteWindow = useMemo(() => {
        return [
            {
                isById: true,
                text: "Request ID",
                openModal: openModalById,
                closeModal: handleCloseModalById,
            },
            {
                isById: false,
                text: "state",
                openModal: openModalByState,
                closeModal: handleCloseModalByState,
            },
        ];
    }, [openModalById, openModalByState]);

    const dtoForSharedButton = useMemo(() => {
        return [
            {
                text: "State",
                onClickFunc: handleOpenModalByState,
            },
            {
                text: "Request ID",
                onClickFunc: handleOpenModalById,
            },
            {
                text: "Reset All Filters",
                onClickFunc: clearAllFilters,
            },
        ];
    }, [handleOpenModalById, handleOpenModalByState]);

    if (!data?.products) {
        return null;
    }

    return (
        <div className="flex flex-col gap-5 p-4">
            <ProductContex.Provider value={productsContextValue}>
                {dtoForFilteWindow.map(
                    ({ isById, text, openModal, closeModal }) => {
                        return (
                            <Modals
                                key={text}
                                isOpen={openModal!}
                                closeModal={closeModal!}
                            >
                                <FilterWindow isById={isById} text={text} />
                            </Modals>
                        );
                    }
                )}
                <div className="flex justify-between">
                    <FilterButton dtoForSharedButton={dtoForSharedButton} />
                </div>

                <ProductsTable settersForProducts={settersForProducts} />
            </ProductContex.Provider>
        </div>
    );
}
