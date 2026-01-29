export function argsOrArgArray<T>(args: ArrayLike<T> | ArrayLike<T[]>): T[] | ArrayLike<T> {
    return args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
}