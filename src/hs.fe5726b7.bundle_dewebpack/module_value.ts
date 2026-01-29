function createInstance<T>(value: T, options: unknown): T {
    return new (value as any)(value, options);
}