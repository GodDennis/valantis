import s from "./ProductsTable.module.scss";

import { Table } from "..";

import { THeader } from "../THeader";
import { memo } from "react";

type HeadCellProps = {
    title: string;
    key: string;
};
type productsRows = {
    brand: string;
    id: string;
    price: number;
    product: string;
};

type ProductsTable = {
    products: productsRows[];
};

const head: HeadCellProps[] = [
    { title: "Id", key: "id" },
    { title: "Title", key: "title" },
    { title: "Price", key: "price" },
    { title: "Brand", key: "brand" },
];

export const ProductsTable = memo(({ products }: ProductsTable) => {
    return (
        <Table.Root className={s.root}>
            <THeader head={head} />
            <Table.Body>
                {products.map(product => {
                    return (
                        <Table.Row key={product.id}>
                            <Table.Cell>{product.id}</Table.Cell>
                            <Table.Cell>{product.product}</Table.Cell>
                            <Table.Cell>{product.price}</Table.Cell>
                            <Table.Cell>{product.brand}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table.Root>
    );
});
