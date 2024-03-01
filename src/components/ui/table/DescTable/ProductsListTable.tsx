import s from "./ProductsList.module.scss";

import { Table } from "..";

import { THeader } from "../THeader";
import { memo } from "react";

type HeadCellProps = {
    [key: string]: string;
};
type productsRows = {
    brand: string;
    id: string;
    price: number;
    product: string;
};

type goodListTableProps = {
    products: productsRows[];
    head: HeadCellProps[];
};

export const ProductsListTable = memo(({ products, head }: goodListTableProps) => {
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
