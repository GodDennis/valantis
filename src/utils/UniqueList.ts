export function getUniqueListBy<T>(arr: T[], key: keyof T): T[] {
    return [...new Map(arr.map(item => [item[key], item])).values()];
}

export function getUniqueId(arr: string[] | undefined): string[] | undefined {
    if (arr) {
        const uniqueSet = new Set();
        arr.forEach(el => {
            uniqueSet.add(el);
        });
        return Array.from(uniqueSet) as string[];
    }
    return;
}
