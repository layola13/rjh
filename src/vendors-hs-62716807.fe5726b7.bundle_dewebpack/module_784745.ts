export function tuple<T extends unknown[]>(...args: T): T {
    return args;
}

export function tupleNum<T extends number[]>(...args: T): T {
    return args;
}