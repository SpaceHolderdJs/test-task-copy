import { FC, memo } from "react";

import { SharedButton } from "@/components/shared/button";
import { IDtoSharedButton } from "@/types/filters";

type Props = {
    dtoForSharedButton: Array<IDtoSharedButton>;
};

export const FilterButton: FC<Props> = memo(({ dtoForSharedButton }) => {
    return (
        <>
            <div className="flex gap-5">
                {dtoForSharedButton.slice(0, 2).map(({ text, onClickFunc }) => (
                    <div
                        key={text}
                        onClick={onClickFunc}
                        className="cursor-pointer"
                    >
                        <SharedButton text={text} />
                    </div>
                ))}
            </div>
            <div
                className="cursor-pointer"
                onClick={dtoForSharedButton[2].onClickFunc}
            >
                <SharedButton
                    text={dtoForSharedButton[2].text}
                    isButton={false}
                />
            </div>
        </>
    );
});

FilterButton.displayName = "FilterButton";
