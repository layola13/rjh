export function arrRemove<T>(arr: T[] | null | undefined, item: T): void {
    if (arr) {
        const index = arr.indexOf(item);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }
}