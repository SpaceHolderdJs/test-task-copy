import { FC, memo } from "react";

import { Statuses } from "@/types/statuses";
import Image from "next/image";
import draftSvg from "@/public/draft.svg";
import completeSvg from "@/public/complete-st.svg";
import pendingSvg from "@/public/pending-st.svg";

type Props = {
    status: string;
};

export const Status: FC<Props> = memo(({ status }) => {
    const lowerCasedStatus = status.toLowerCase();

    return (
        <>
            {lowerCasedStatus === Statuses.complete ? (
                <Image
                    src={completeSvg}
                    height="18"
                    width="82"
                    alt="complete icon"
                />
            ) : lowerCasedStatus === Statuses.pending ? (
                <Image
                    src={pendingSvg}
                    height="18"
                    width="74"
                    alt="pending icon"
                />
            ) : (
                <Image src={draftSvg} height="18" width="56" alt="draft icon" />
            )}
        </>
    );
});

Status.displayName = "Status";
