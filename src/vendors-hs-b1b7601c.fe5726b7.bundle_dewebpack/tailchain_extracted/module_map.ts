function map<T, U>(this: T[], callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: unknown): U[] {
    return Array.prototype.map.call(this, callbackfn, thisArg !== undefined ? thisArg : undefined);
}