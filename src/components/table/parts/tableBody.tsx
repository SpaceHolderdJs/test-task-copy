import { FC, memo } from "react";

import { Status } from "@/components/shared/status";
import { INormalizeDto } from "@/types/products";

type Props = {
    products: Array<INormalizeDto>;
};

export const TableBody: FC<Props> = memo(({ products }) => {
    return (
        <tbody>
            {products.map(({ id, title, rating, status, createdAt }, index) => {
                return (
                    <tr
                        className={`border-b border-bd-grey text-grey-200 text-sm first:border-t border-bd-grey text-sm ${
                            index < 3 ? "col-span-1" : "col-span-2"
                        }`}
                        key={id}
                    >
                        <td scope="row" className="px-6 py-2 text-normal">
                            {id}
                        </td>
                        <td className="px-6 py-2">
                            <Status status={status} />
                        </td>
                        <td className="px-6 py-2">{title}</td>
                        <td className="px-6 py-2">{createdAt}</td>
                    </tr>
                );
            })}
        </tbody>
    );
});

TableBody.displayName = "TableBody";
