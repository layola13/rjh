function hasProperty<T extends object>(obj: T, property: PropertyKey): boolean {
    return property in obj;
}