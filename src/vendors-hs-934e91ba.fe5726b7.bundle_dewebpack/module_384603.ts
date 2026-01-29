type PropertyDescriptor = {
  configurable: boolean;
  enumerable: boolean;
  value: unknown;
  writable: boolean;
};

type DefinePropertyFunction = (
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => object;

type CreateConstantFunction = <T>(value: T) => () => T;

type IdentityFunction = <T>(value: T) => T;

const createConstant: CreateConstantFunction = <T>(value: T): (() => T) => {
  return () => value;
};

const defineProperty: DefinePropertyFunction | undefined = 
  typeof Object.defineProperty === 'function' 
    ? Object.defineProperty 
    : undefined;

const identity: IdentityFunction = <T>(value: T): T => value;

export const setToStringTag = defineProperty
  ? <T>(target: object, value: T): object => {
      return defineProperty(target, "toString", {
        configurable: true,
        enumerable: false,
        value: createConstant(value),
        writable: true
      });
    }
  : identity;