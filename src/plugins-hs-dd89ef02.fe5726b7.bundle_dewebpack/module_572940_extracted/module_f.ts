function finalizeIterator<T>(iterator: Iterator<T> | IterableIterator<T> | null | undefined, shouldThrow: boolean, error: unknown): void {
    try {
        if (iterator && typeof iterator.return === 'function') {
            iterator.return();
        }
    } finally {
        if (shouldThrow) {
            throw error;
        }
    }
}