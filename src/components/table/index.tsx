"use client";

import {
    FC,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { TableHeader } from "./parts/tableHeader";
import { ProductContex } from "@/app/contexts/product";
import { TableBody } from "./parts/tableBody";
import { PaginationButton } from "../shared/pagination-button";
import { tableheaderArray } from "@/mocked";
import { INormalizeDto } from "@/types/products";

interface ISettersForProps {
    handleCloseModalByState: () => void;
    handleCloseModalById: () => void;
}

type Props = {
    settersForProducts: ISettersForProps;
};

export const ProductsTable: FC<Props> = memo(({ settersForProducts }) => {
    const [lengthOfProducts, setLengthOfProducts] = useState({
        start: 0,
        finish: 15,
    });

    const { handleCloseModalByState, handleCloseModalById } =
        settersForProducts;
    const [buttonVisible, setButtonVisble] = useState(true);

    const mainContext = useContext(ProductContex);

    const {
        products,
        searchById,
        status,
        createdAt,
        isSearchById,
        clearAllFilters,
        setIsClearAllFilters,
        setProductNotFound,
    } = mainContext || {};

    const filteredProducts = useMemo(() => {
        setLengthOfProducts({
            start: 0,
            finish: 15,
        });

        if (clearAllFilters) {
            return products;
        }

        const resolvers = [
            [
                () => !!isSearchById,
                (product: INormalizeDto) => String(product.id) === searchById,
            ],
            [
                () => !!(status && createdAt),
                (product: INormalizeDto) =>
                    product.status.toLowerCase() === status!.toLowerCase() &&
                    product.createdAt === createdAt,
            ],
            [() => clearAllFilters, (product: INormalizeDto) => product],
        ];

        const filteredProducts = products?.filter((product) => {
            for (const [predicate, statement] of resolvers) {
                if (predicate(product) && statement(product)) {
                    return true;
                }
            }

            return false;
        });

        const isFilters = [isSearchById, status && createdAt].some(Boolean);

        if (setProductNotFound && isFilters && !filteredProducts?.length) {
            setProductNotFound(true);
        }

        return filteredProducts?.length ? filteredProducts : products;
    }, [
        clearAllFilters,
        createdAt,
        isSearchById,
        products,
        searchById,
        setProductNotFound,
        status,
    ]);

    useEffect(() => {
        const isButtonVisible =
            filteredProducts && filteredProducts.length < 14;

        setButtonVisble(!isButtonVisible);

        if (filteredProducts && filteredProducts.length < 3) {
            handleCloseModalByState();
            handleCloseModalById();
        }
    }, [
        clearAllFilters,
        createdAt,
        filteredProducts,
        handleCloseModalById,
        handleCloseModalByState,
        isSearchById,
        products?.length,
        setProductNotFound,
        status,
    ]);

    const partsOfProducts = useMemo(() => {
        return filteredProducts?.slice(
            lengthOfProducts.start,
            lengthOfProducts.finish
        );
    }, [filteredProducts, lengthOfProducts.finish, lengthOfProducts.start]);

    const buttonIsDisabled = useMemo(() => {
        return lengthOfProducts.finish === products?.length;
    }, [lengthOfProducts.finish, products?.length]);

    const moveToNextPage = () => {
        setLengthOfProducts((prev) => ({
            start: prev.start + 15,
            finish: prev.finish + 15,
        }));
    };

    const moveToPrevPage = useCallback(() => {
        if (lengthOfProducts.start >= 15 && lengthOfProducts.finish >= 15) {
            setLengthOfProducts((prev) => ({
                start: prev.start - 15,
                finish: prev.finish - 15,
            }));
        }
        return;
    }, [lengthOfProducts.finish, lengthOfProducts.start]);

    const paginationInfoArray = useMemo(() => {
        return [
            {
                text: "Previous",
                onCLickFunc: moveToPrevPage,
                isDisabled: !lengthOfProducts.start,
            },
            {
                text: "Next",
                onCLickFunc: moveToNextPage,
                isDisabled: buttonIsDisabled,
            },
        ];
    }, [buttonIsDisabled, lengthOfProducts.start, moveToPrevPage]);

    if (!partsOfProducts) {
        return null;
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHeader tableheaderArray={tableheaderArray} />
                <TableBody products={partsOfProducts} />
            </table>
            <div className="flex items-center justify-between px-6">
                Viewing {partsOfProducts.length} of {products?.length} results
                {buttonVisible && (
                    <div className="flex gap-1 pt-2.5">
                        {paginationInfoArray.map(
                            ({ text, onCLickFunc, isDisabled }) => (
                                <PaginationButton
                                    key={text}
                                    text={text}
                                    onCLickFunc={onCLickFunc}
                                    isDisabled={isDisabled}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

ProductsTable.displayName = "ProductsTable";
