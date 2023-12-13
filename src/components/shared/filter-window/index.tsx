import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from "react-select";
import { ProductContex } from "@/app/contexts/product";
import { INormalizeDto } from "@/types/products";
import { IStatus } from "@/types/status";
import { ICreatedAtAndStatus } from "@/types/filters";
import { OptionType, ReactSelectChangeEventType } from "@/types/react-select";
import { arrayForStateSelect, grayColor } from "@/mocked";

type Props = {
    text?: string;
    isById?: boolean;
};

const customStyles: StylesConfig<
    IStatus | ICreatedAtAndStatus,
    false,
    GroupBase<IStatus | ICreatedAtAndStatus>
> = {
    singleValue: (provided: Record<string, unknown>) => ({
        ...provided,
        color: grayColor,
    }),
};
export const FilterWindow: FC<Props> = ({ text, isById }) => {
    const [idValue, setIdValue] = useState("");

    const [statusValue, setStatusValue] = useState<IStatus>({
        status: "pending",
        label: "Pending",
        value: "",
    });

    const [createdAtValue, setCreatedAtValue] = useState<ICreatedAtAndStatus>({
        createdAt: "",
        label: "Supplement",
        value: "",
    });

    const mainContext = useContext(ProductContex);

    const searchByIdOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setIdValue(value);
    };

    const searchByStatusAndDate = () => {
        mainContext!.setSearchByStatusAndDate({
            status: statusValue.status,
            createdAt: createdAtValue.createdAt,
        });
    };

    const searchById = () => {
        mainContext!.setIsSearchById(true);
        mainContext!.setSearchById(idValue);
    };

    const arrayForDateSelect = useMemo(() => {
        return (
            mainContext?.products.reduce(
                (
                    acc: { value: string; label: string }[],
                    element: INormalizeDto
                ) => {
                    return [
                        ...acc,
                        { value: element.createdAt, label: element.createdAt },
                    ];
                },
                []
            ) || []
        );
    }, [mainContext?.products]);

    const handleStatusChange: ReactSelectChangeEventType = (e) => {
        setStatusValue({
            label: e!.label,
            status: e!.value,
            value: e!.value,
        });
    };

    const handleTimeChange: ReactSelectChangeEventType = (e) => {
        setCreatedAtValue({
            createdAt: e!.value,
            label: e!.label,
            value: e!.value,
        });
    };

    const dataForSelects = useMemo(() => {
        return [
            {
                value: statusValue,
                onChange: handleStatusChange,
                options: Array.from(new Set(arrayForStateSelect)),
            },
            {
                value: createdAtValue,
                onChange: handleTimeChange,
                options: Array.from(new Set(arrayForDateSelect as [])),
            },
        ];
    }, [arrayForDateSelect, createdAtValue, statusValue]);

    return (
        <div className="px-4 py-1 pb-3 w-80">
            <div className="flex flex-col gap-4">
                <div className="text-dark text-base font-medium">
                    Filter by {text}
                </div>
                {isById ? (
                    <div className="inline-flex items-center gap-3 min-w-content">
                        <span className="text-grey-200 text-sm font-normal">
                            is equal to
                        </span>
                        <input
                            placeholder="Label"
                            type="text"
                            className="rounded-md border border-solid border-ray-300 p-1 outline-none  placeholder-grey-400 placeholder-400 pl-2"
                            value={idValue}
                            onChange={searchByIdOnChange}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 min-h-full">
                        {dataForSelects.map(
                            ({ value, onChange, options }, index) => (
                                <Select
                                    key={index}
                                    value={value}
                                    onChange={onChange}
                                    options={options as OptionType}
                                    styles={customStyles}
                                />
                            )
                        )}
                    </div>
                )}
                <div
                    className="flex justify-center bg-blue rounded-md cursor-pointer"
                    onClick={isById ? searchById : searchByStatusAndDate}
                >
                    <span className="text-white text-center font-semibold leading-tight p-2 ">
                        Apply
                    </span>
                </div>

                {!!mainContext?.isProductNotFound && (
                    <div className="flex justify-center text-red">
                        Product not found!
                    </div>
                )}
            </div>
        </div>
    );
};
