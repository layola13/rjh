export default function has<T>(this: { __data__: Map<T, unknown> | Set<T> }, key: T): boolean {
    return this.__data__.has(key);
}