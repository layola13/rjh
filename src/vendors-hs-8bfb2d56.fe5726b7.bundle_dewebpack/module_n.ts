interface TypeDependency {
  pointerType: TypeRegistration;
  constPointerType: TypeRegistration;
}

interface ConstructorBodyMap {
  [parameterCount: number]: (...args: any[]) => any;
}

interface ClassTypeInfo {
  registeredClass?: RegisteredClass;
  instancePrototype: any;
}

interface RegisteredClass {
  instancePrototype: any;
}

interface TypeRegistration {
  name: string;
  isReference: boolean;
  isConst: boolean;
  isSmartPointer: boolean;
}

class ClassType {
  constructor(
    public name: string,
    public typeInfo: any,
    public isValue: boolean,
    public isReference: boolean,
    public isConst: boolean
  ) {}
}

class PointerType {
  constructor(
    public name: string,
    public typeInfo: any,
    public isValue: boolean,
    public isReference: boolean,
    public isConst: boolean
  ) {}
}

interface ConstructorInfo {
  constructor_body?: ConstructorBodyMap;
}

const EMPTY_PROTOTYPE = {};

function registerClassType(
  rawType: number,
  typeInfo: any,
  rawDestructorType: number | undefined,
  baseClassRawType: number | undefined,
  getUpcastRawType: number | undefined,
  upcastRawType: number | undefined,
  downcastRawType: number | undefined,
  getDowncastRawType: number | undefined,
  className: string,
  destructorPointer: number | undefined,
  constructorPointer: number | undefined,
  constructorSignature: number | undefined,
  constructorInfo: ConstructorInfo
): void {
  const processedClassName = parseTypeName(className);
  const upcastFunction = convertFunctionPointer(getUpcastRawType, upcastRawType);
  const destructorFunction = destructorPointer && convertFunctionPointer(rawDestructorType, destructorPointer);
  const downcastFunction = downcastRawType && convertFunctionPointer(getDowncastRawType, downcastRawType);
  const constructorFunc = convertFunctionPointer(constructorSignature, constructorInfo);

  const typeId = createTypeIdentifier(processedClassName);

  exposePublicSymbol(typeId, function () {
    throwBindingError(`Cannot construct ${processedClassName} due to unbound types`, [baseClassRawType]);
  });

  whenDependentTypesAreResolved(
    [rawType, typeInfo, rawDestructorType],
    baseClassRawType ? [baseClassRawType] : [],
    function (resolvedTypes: ClassTypeInfo[]): [ClassType, PointerType, PointerType] {
      const baseType = resolvedTypes[0];
      const prototypeBase = baseClassRawType
        ? (baseType.registeredClass as RegisteredClass).instancePrototype
        : EMPTY_PROTOTYPE;

      const constructor = createNamedFunction(typeId, function (this: any, ...args: any[]) {
        if (Object.getPrototypeOf(this) !== instancePrototype) {
          throw new BindingError(`Use 'new' to construct ${processedClassName}`);
        }

        if (constructorInfo.constructor_body === undefined) {
          throw new BindingError(`${processedClassName} has no accessible constructor`);
        }

        const overload = constructorInfo.constructor_body[args.length];

        if (overload === undefined) {
          const validCounts = Object.keys(constructorInfo.constructor_body).toString();
          throw new BindingError(
            `Tried to invoke ctor of ${processedClassName} with invalid number of parameters (${args.length}) - expected (${validCounts}) parameters instead!`
          );
        }

        return overload.apply(this, args);
      });

      const instancePrototype = Object.create(prototypeBase, {
        constructor: {
          value: constructor,
        },
      });

      constructor.prototype = instancePrototype;

      const classTypeInstance = new ClassType(
        processedClassName,
        constructor,
        instancePrototype,
        constructorFunc,
        baseType.registeredClass,
        upcastFunction,
        destructorFunction,
        downcastFunction
      );

      const valueType = new ClassType(processedClassName, classTypeInstance, true, false, false);
      const pointerType = new PointerType(`${processedClassName}*`, classTypeInstance, false, false, false);
      const constPointerType = new PointerType(`${processedClassName} const*`, classTypeInstance, false, true, false);

      registeredTypes[rawType] = {
        pointerType: pointerType,
        constPointerType: constPointerType,
      };

      replacePublicSymbol(typeId, constructor);

      return [valueType, pointerType, constPointerType];
    }
  );
}

function parseTypeName(name: string): string {
  return name;
}

function convertFunctionPointer(signature: number | undefined, pointer: number | undefined): ((...args: any[]) => any) | undefined {
  if (signature === undefined || pointer === undefined) {
    return undefined;
  }
  return (...args: any[]) => {};
}

function createTypeIdentifier(name: string): string {
  return name;
}

function exposePublicSymbol(name: string, value: Function): void {}

function whenDependentTypesAreResolved(
  types: (number | any | undefined)[],
  dependencies: number[],
  callback: (resolvedTypes: ClassTypeInfo[]) => [ClassType, PointerType, PointerType]
): void {}

function createNamedFunction(name: string, func: Function): any {
  return func;
}

class BindingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BindingError';
  }
}

function throwBindingError(message: string, types: (number | undefined)[]): void {
  throw new BindingError(message);
}

const registeredTypes: Record<number, TypeDependency> = {};

function replacePublicSymbol(name: string, value: any): void {}