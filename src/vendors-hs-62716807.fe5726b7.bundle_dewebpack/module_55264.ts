interface PropertyDescriptor {
  value?: unknown;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
  get?(): unknown;
  set?(value: unknown): void;
}

type PropertyKey = string | symbol;

declare const DESCRIPTORS_SUPPORT: boolean;
declare const IE8_DOM_DEFINE_SUPPORT: boolean;
declare function toIndexedObject(value: unknown): object;
declare function toPropertyKey(value: unknown): PropertyKey;
declare function hasOwnProperty(object: object, key: PropertyKey): boolean;
declare function createPropertyDescriptor(
  bitmap: number,
  value: unknown
): PropertyDescriptor;
declare const propertyIsEnumerableModule: {
  f: (key: PropertyKey) => boolean;
};

const nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

export const f = DESCRIPTORS_SUPPORT
  ? nativeGetOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(
      object: unknown,
      propertyName: unknown
    ): PropertyDescriptor | undefined {
      const indexedObject = toIndexedObject(object);
      const key = toPropertyKey(propertyName);

      if (IE8_DOM_DEFINE_SUPPORT) {
        try {
          return nativeGetOwnPropertyDescriptor(indexedObject, key);
        } catch (error) {
          // IE8 DOM elements throw when accessing descriptor
        }
      }

      if (hasOwnProperty(indexedObject, key)) {
        return createPropertyDescriptor(
          !propertyIsEnumerableModule.f.call(indexedObject, key),
          indexedObject[key as keyof typeof indexedObject]
        );
      }

      return undefined;
    };