import { Item } from "@/types/types";

export function deleteDuplicate(ProductsArray: Item[]): Item[] {
    return ProductsArray.reduce((acc: Item[], product: Item) => {
        if (!acc.find(v => v.id == product.id)) {
            acc.push(product);
        }
        return acc;
    }, []);
}
