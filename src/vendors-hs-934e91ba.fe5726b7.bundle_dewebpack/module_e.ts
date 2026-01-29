interface RegisteredClass {
  instancePrototype: any;
  name: string;
}

interface ClassType {
  name: string;
  registeredClass: RegisteredClass;
}

interface WireType<T> {
  fromWireType(ptr: number): T;
  toWireType(destructors: unknown[], value: T): number;
}

/**
 * Registers a class property accessor with support for getters and optional setters
 * @param classType - The class type to register the property on
 * @param propertyName - The name of the property
 * @param getterReturnType - Type ID for the getter return value
 * @param getterContext - Context pointer for the getter function
 * @param getterFunction - Native getter function pointer
 * @param setterReturnType - Optional type ID for the setter (if writable)
 * @param setterContext - Optional context pointer for the setter function
 * @param setterFunction - Optional native setter function pointer
 */
function registerClassProperty(
  classType: ClassType,
  propertyName: string,
  getterReturnType: number,
  getterContext: number,
  getterFunction: number,
  setterReturnType?: number,
  setterContext?: number,
  setterFunction?: number
): void {
  const normalizedPropertyName = convertPropertyName(propertyName);
  const boundGetterFunction = createBoundFunction(getterContext, getterFunction);

  whenDependenciesReady([], [classType], ([resolvedClass]: [ClassType]) => {
    const fullPropertyPath = `${resolvedClass.name}.${normalizedPropertyName}`;
    
    const unboundDescriptor: PropertyDescriptor = {
      get() {
        throwBindingError(
          `Cannot access ${fullPropertyPath} due to unbound types`,
          [getterReturnType, setterReturnType]
        );
      },
      enumerable: true,
      configurable: true
    };

    if (setterFunction) {
      unboundDescriptor.set = function() {
        throwBindingError(
          `Cannot access ${fullPropertyPath} due to unbound types`,
          [getterReturnType, setterReturnType]
        );
      };
    } else {
      unboundDescriptor.set = function() {
        throwBindingError(`${fullPropertyPath} is a read-only property`);
      };
    }

    Object.defineProperty(
      resolvedClass.registeredClass.instancePrototype,
      normalizedPropertyName,
      unboundDescriptor
    );

    const typeDependencies = setterFunction 
      ? [getterReturnType, setterReturnType] 
      : [getterReturnType];

    whenDependenciesReady([], typeDependencies, (types: WireType<any>[]) => {
      const getterType = types[0];
      
      const boundDescriptor: PropertyDescriptor = {
        get() {
          const instancePtr = getInstancePointer(
            this,
            resolvedClass,
            `${fullPropertyPath} getter`
          );
          return getterType.fromWireType(boundGetterFunction(getterFunction, instancePtr));
        },
        enumerable: true
      };

      if (setterFunction) {
        const boundSetterFunction = createBoundFunction(setterContext!, setterFunction);
        const setterType = types[1];
        
        boundDescriptor.set = function(value: any) {
          const instancePtr = getInstancePointer(
            this,
            resolvedClass,
            `${fullPropertyPath} setter`
          );
          const destructors: unknown[] = [];
          boundSetterFunction(
            setterFunction,
            instancePtr,
            setterType.toWireType(destructors, value)
          );
          runDestructors(destructors);
        };
      }

      Object.defineProperty(
        resolvedClass.registeredClass.instancePrototype,
        normalizedPropertyName,
        boundDescriptor
      );

      return [];
    });

    return [];
  });
}

declare function convertPropertyName(name: string): string;
declare function createBoundFunction(context: number, functionPtr: number): (ptr: number, ...args: any[]) => any;
declare function whenDependenciesReady(
  dependencies: unknown[],
  types: unknown[],
  callback: (resolved: any[]) => unknown[]
): void;
declare function throwBindingError(message: string, types?: unknown[]): never;
declare function getInstancePointer(instance: any, classType: ClassType, context: string): number;
declare function runDestructors(destructors: unknown[]): void;