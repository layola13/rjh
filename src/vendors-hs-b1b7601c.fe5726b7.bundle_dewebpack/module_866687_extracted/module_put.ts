function put<T>(element: T, key: string): T {
    this.add(element, key);
    return element;
}