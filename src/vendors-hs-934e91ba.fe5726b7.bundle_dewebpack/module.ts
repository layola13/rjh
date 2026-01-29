function createInstance<A, T>(config: A, options: T): I<A, T> {
    return new I(config, options);
}