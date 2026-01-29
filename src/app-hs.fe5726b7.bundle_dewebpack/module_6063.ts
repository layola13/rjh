function get<T>(obj: T | null | undefined, path: string | string[], defaultValue?: unknown): unknown {
    const result = obj == null ? undefined : getByPath(obj, path);
    return result === undefined ? defaultValue : result;
}

function getByPath(obj: unknown, path: string | string[]): unknown {
    // Implementation of path traversal logic
    // This would be the actual implementation from module 1695
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current == null) {
            return undefined;
        }
        current = (current as Record<string, unknown>)[key];
    }
    
    return current;
}

export default get;