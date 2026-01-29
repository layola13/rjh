function getEntries<T>(v: T | null | undefined): T[] {
    return v ? [v] : [];
}