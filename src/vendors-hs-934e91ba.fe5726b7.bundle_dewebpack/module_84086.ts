type Predicate<T> = (value: T) => boolean;
type PropertyPath = string | string[];
type IterateeShorthand = PropertyPath | [PropertyPath, unknown] | Record<string, unknown>;

function baseIteratee<T>(value: IterateeShorthand | Predicate<T> | null | undefined): Predicate<T> {
    if (typeof value === "function") {
        return value as Predicate<T>;
    }
    
    if (value == null) {
        return identity<T>();
    }
    
    if (typeof value === "object") {
        if (isArray(value)) {
            return matchesProperty<T>(value[0], value[1]);
        }
        return matches<T>(value);
    }
    
    return property<T>(value as PropertyPath);
}

function identity<T>(value: T): T {
    return value;
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function matchesProperty<T>(path: PropertyPath, srcValue: unknown): Predicate<T> {
    // Implementation placeholder
    return (obj: T): boolean => {
        // Match property at path with srcValue
        return false;
    };
}

function matches<T>(source: Record<string, unknown>): Predicate<T> {
    // Implementation placeholder
    return (obj: T): boolean => {
        // Match all properties in source
        return false;
    };
}

function property<T>(path: PropertyPath): Predicate<T> {
    // Implementation placeholder
    return (obj: T): boolean => {
        // Get property at path
        return false;
    };
}

export default baseIteratee;