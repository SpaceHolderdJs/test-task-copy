import { FC, memo } from "react";

type Props = {
    tableheaderArray: Array<{ name: string }>;
};

export const TableHeader: FC<Props> = memo(({ tableheaderArray }) => (
    <thead className="font-semibold text-dark border-t border-bd-grey border-1">
        <tr>
            {tableheaderArray.map(({ name }) => (
                <th scope="col" className="px-6 py-3 " key={name}>
                    {name}
                </th>
            ))}
        </tr>
    </thead>
));

TableHeader.displayName = "TableHeader";
