import { Item } from "@/types/types";

export function splitArrayIntoChunks(array: Item[]) {
    const linkedList: Item[][] = [];
    let currentChunk: Item[] = [];

    array?.map((el, i) => {
        currentChunk.push(el);
        if (currentChunk.length === 50 || i === array.length - 1) {
            linkedList.push(currentChunk);
            currentChunk = [];
        }
    });
    return linkedList;
}
