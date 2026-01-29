function processValue<T>(value: T): T {
    return isValid(value) ? transform(value) : normalize(value, {});
}

function isValid<T>(value: T): boolean {
    // Implementation needed
    throw new Error('Not implemented');
}

function transform<T>(value: T): T {
    // Implementation needed
    throw new Error('Not implemented');
}

function normalize<T>(value: T, options: Record<string, unknown>): T {
    // Implementation needed
    throw new Error('Not implemented');
}