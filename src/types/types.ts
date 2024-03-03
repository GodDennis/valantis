export type Items = {
    result: Item[];
};
export type Ids = {
    result: string[];
};

export type Item = {
    brand: string;
    id: string;
    price: number;
    product: string;
};

export type Filter = {
    brand?: string;
    price?: number;
    product?: string;
};
