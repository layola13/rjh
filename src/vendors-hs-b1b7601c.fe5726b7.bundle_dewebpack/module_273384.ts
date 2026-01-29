export function count<T>(predicate?: (item: T, index: number) => boolean): number {
    return reduce<T, number>(
        (accumulator: number, item: T, index: number): number => {
            return !predicate || predicate(item, index) ? accumulator + 1 : accumulator;
        },
        0
    );
}

function reduce<T, R>(
    callback: (accumulator: R, item: T, index: number) => R,
    initialValue: R
): R {
    // This would need to be imported from module 603637
    // Placeholder implementation shown for completeness
    throw new Error('reduce function should be imported from the appropriate module');
}