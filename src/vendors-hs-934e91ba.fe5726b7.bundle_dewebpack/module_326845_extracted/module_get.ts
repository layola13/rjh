export function moduleGet<T>(this: { get: (key: string) => T }, t: string): T {
    return this.get(t);
}