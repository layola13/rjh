export function tryCatch(fn: () => unknown): boolean {
    try {
        return !!fn();
    } catch {
        return true;
    }
}