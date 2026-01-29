function get<T = any>(obj: T, path: string | string[]): any {
    return obj[path as keyof T];
}