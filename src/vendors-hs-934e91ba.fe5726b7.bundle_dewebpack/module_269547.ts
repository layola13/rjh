function createConstantFunction<T>(value: T): () => T {
    return function(): T {
        return value;
    };
}

export default createConstantFunction;