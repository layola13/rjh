function processValue<T>(value: T): T {
    return isValid(value) ? transform(value) : merge(value, {});
}