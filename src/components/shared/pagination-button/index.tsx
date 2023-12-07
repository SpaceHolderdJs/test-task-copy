import { FC, memo } from "react";

type Props = {
  text: string;
  onCLickFunc: () => void;
  isDisabled: boolean;
};

export const PaginationButton: FC<Props> = memo(
  ({ text, onCLickFunc, isDisabled }) => {
    return (
      <div
        className={`px-2 py-1.5 border rounded cursor-pointer ${
          (isDisabled && "opacity-50 pointer-events-none") || ""
        }`}
        onClick={onCLickFunc}>
        {text}
      </div>
    );
  }
);

PaginationButton.displayName = "PaginationButton";
