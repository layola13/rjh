const hasOwnProperty = (target: object, property: PropertyKey): boolean => {
    return Object.prototype.hasOwnProperty.call(target, property);
};

const isCallable = (value: unknown): value is Function => {
    return typeof value === 'function';
};

const requireObjectCoercible = <T>(value: T): NonNullable<T> => {
    if (value == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    return value as NonNullable<T>;
};

const getSharedKey = (key: string): symbol | string => {
    return Symbol.for(`IE_PROTO_${key}`);
};

const USE_NATIVE_GET_PROTOTYPE_OF = typeof Object.getPrototypeOf === 'function';

const IE_PROTO = getSharedKey('IE_PROTO');

/**
 * Gets the prototype of an object with fallback for older environments
 */
export const getPrototypeOf = USE_NATIVE_GET_PROTOTYPE_OF
    ? Object.getPrototypeOf
    : function (target: unknown): object | null {
        const obj = requireObjectCoercible(target) as object;

        if (hasOwnProperty(obj, IE_PROTO)) {
            return (obj as Record<PropertyKey, unknown>)[IE_PROTO] as object;
        }

        const constructor = (obj as { constructor?: unknown }).constructor;

        if (isCallable(constructor) && obj instanceof constructor) {
            return constructor.prototype as object;
        }

        return obj instanceof Object ? Object.prototype : null;
    };