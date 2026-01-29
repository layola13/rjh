/**
 * Cleanup function for iterator/generator resources
 * Safely calls the return method if available and handles exceptions
 */
function cleanupIterator<T>(iterator: Iterator<T> | IterableIterator<T> | null): void {
    let hasError = false;
    let error: unknown;

    try {
        if (iterator && typeof iterator.return === 'function') {
            iterator.return();
        }
    } finally {
        if (hasError) {
            throw error;
        }
    }
}