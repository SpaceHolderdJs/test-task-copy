import { FC, memo } from "react";
import Image from "next/image";

import addSvg from "@/public/add.svg";

type Props = {
    text?: string;
    isButton?: boolean;
};
export const SharedButton: FC<Props> = memo(({ text, isButton = true }) => {
    return (
        <div className="flex gap-1 px-2 border border-grey border-1 border-dashed rounded-full">
            {isButton && (
                <Image
                    priority
                    src={addSvg}
                    width="14"
                    height="14"
                    alt="add icon"
                />
            )}
            {text}
        </div>
    );
});

SharedButton.displayName = "SharedButton";
