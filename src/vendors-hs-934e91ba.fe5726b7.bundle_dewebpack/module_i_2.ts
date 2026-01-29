interface EmscriptenType {
  name: string;
  registeredClass: RegisteredClass;
  toWireType(destructors: unknown[], value: unknown): unknown;
  fromWireType(value: unknown): unknown;
}

interface RegisteredClass {
  constructor_body: ConstructorFunction[];
}

type ConstructorFunction = (...args: unknown[]) => unknown;

type TypeDependencyCallback = (types: EmscriptenType[]) => void;

declare function w(condition: boolean): void;
declare function ct(paramCount: number, typeId: number): number[];
declare function st(functionPtr: number, thisPtr: number): (...args: unknown[]) => unknown;
declare function vA(
  dependencies: number[],
  typeIds: number[],
  callback: TypeDependencyCallback
): void;
declare function yA(message: string): void;
declare function ft(message: string, unboundTypes: number[]): void;
declare function lt(destructors: unknown[]): void;

class dA extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BindingError';
  }
}

/**
 * Registers a class constructor with Emscripten's type system.
 * Handles parameter marshalling between JavaScript and WebAssembly.
 */
function registerConstructor(
  classTypeId: number,
  parameterCount: number,
  rawClassType: number,
  invokerFnPtr: number,
  invokerFnContext: number,
  constructorPtr: number
): void {
  w(parameterCount > 0);

  const unboundParameterTypes = ct(parameterCount, rawClassType);
  const invokerFunction = st(invokerFnPtr, invokerFnContext);
  const wireArguments: unknown[] = [constructorPtr];
  const destructors: unknown[] = [];

  vA([], [classTypeId], (resolvedTypes: EmscriptenType[]) => {
    const classType = resolvedTypes[0];
    const constructorSignature = `constructor ${classType.name}`;

    if (classType.registeredClass.constructor_body === undefined) {
      classType.registeredClass.constructor_body = [];
    }

    const constructorIndex = parameterCount - 1;

    if (classType.registeredClass.constructor_body[constructorIndex] !== undefined) {
      throw new dA(
        `Cannot register multiple constructors with identical number of parameters (${constructorIndex}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`
      );
    }

    classType.registeredClass.constructor_body[constructorIndex] = function unboundConstructor() {
      ft(`Cannot construct ${classType.name} due to unbound types`, unboundParameterTypes);
    };

    vA([], unboundParameterTypes, (parameterTypes: EmscriptenType[]) => {
      classType.registeredClass.constructor_body[constructorIndex] = function boundConstructor(
        ...args: unknown[]
      ) {
        if (args.length !== constructorIndex) {
          yA(
            `${constructorSignature} called with ${args.length} arguments, expected ${constructorIndex}`
          );
        }

        destructors.length = 0;
        wireArguments.length = parameterCount;

        for (let i = 1; i < parameterCount; ++i) {
          wireArguments[i] = parameterTypes[i].toWireType(destructors, args[i - 1]);
        }

        const returnValue = invokerFunction(...wireArguments);
        lt(destructors);

        return parameterTypes[0].fromWireType(returnValue);
      };

      return [];
    });

    return [];
  });
}