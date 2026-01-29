function applyFunction<T>(fn: () => T, context: any): T {
    return fn.call(context);
}