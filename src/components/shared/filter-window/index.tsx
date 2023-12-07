import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from "react-select";
import { ProductContex } from "@/app/contexts/product";
import { INormalizeDto } from "@/types/products";
import { IStatus } from "@/types/status";
import { ICreatedAtAndStatus } from "@/types/filters";
import { ReactSelectChangeEventType } from "@/types/react-select";

type Props = {
  text?: string;
  isById?: boolean;
};

const grayColor = "#6A7383";

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
    mainContext!.setSearchById(value);
  };

  const searchByStatusAndDate = () => {
    mainContext!.setSearchByStatusAndDate({
      status: statusValue.status,
      createdAt: createdAtValue.createdAt,
    });
  };

  const searchById = () => {
    mainContext!.setSearchById(idValue);
  };

  const arrayForStateSelect = ["draft", "pending", "complete"].map((value) => ({
    value,
    label: `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`,
  }));

  const arrayForDateSelect =
    mainContext?.products.reduce(
      (acc: { value: string; label: string }[], element: INormalizeDto) => {
        return [...acc, { value: element.createdAt, label: element.createdAt }];
      },
      []
    ) || [];

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
  }, [arrayForStateSelect, createdAtValue, statusValue]);

  return (
    <div className="rounded-lg border border-solid border-gray-300 bg-white shadow-md h-fit">
      <div className="p-4 w-80">
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
            <div className="flex flex-col gap-2">
              {dataForSelects.map(({ value, onChange, options }, index) => (
                <Select
                  key={index}
                  value={value}
                  onChange={onChange}
                  options={
                    options as
                      | OptionsOrGroups<
                          IStatus | ICreatedAtAndStatus,
                          GroupBase<IStatus | ICreatedAtAndStatus>
                        >
                      | undefined
                  }
                  styles={customStyles}
                />
              ))}
            </div>
          )}
          <div
            className="flex justify-center bg-blue rounded-md cursor-pointer"
            onClick={isById ? searchById : searchByStatusAndDate}>
            <span className="text-white text-center font-semibold leading-tight p-2 ">
              Apply
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
