interface RegisteredClass {
  constructor_body: Array<(...args: unknown[]) => unknown>;
  name: string;
}

interface ClassType {
  name: string;
  registeredClass: RegisteredClass;
}

interface TypeInfo {
  toWireType(destructors: unknown[], value: unknown): unknown;
  fromWireType(value: unknown): unknown;
}

function registerConstructor(
  classHandle: unknown,
  argCount: number,
  rawArgTypesAddr: unknown,
  invokerSignature: unknown,
  invoker: (...args: unknown[]) => unknown,
  rawConstructor: unknown
): void {
  const argTypes = resolveArgTypes(rawArgTypesAddr, argCount);
  const invokerFunc = getFunctionInvoker(invokerSignature, invoker);

  whenDependentTypesAreResolved([], [classHandle], (classTypes: ClassType[]) => {
    const classType = classTypes[0];
    const humanName = `constructor ${classType.name}`;

    if (classType.registeredClass.constructor_body === undefined) {
      classType.registeredClass.constructor_body = [];
    }

    const parameterCount = argCount - 1;
    if (classType.registeredClass.constructor_body[parameterCount] !== undefined) {
      throw new BindingError(
        `Cannot register multiple constructors with identical number of parameters (${parameterCount}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`
      );
    }

    classType.registeredClass.constructor_body[parameterCount] = function() {
      throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, argTypes);
    };

    whenDependentTypesAreResolved([], argTypes, (resolvedArgTypes: TypeInfo[]) => {
      classType.registeredClass.constructor_body[parameterCount] = function(...args: unknown[]) {
        if (args.length !== parameterCount) {
          throwBindingError(
            `${humanName} called with ${args.length} arguments, expected ${parameterCount}`
          );
        }

        const destructors: unknown[] = [];
        const wireArgs = new Array<unknown>(argCount);
        wireArgs[0] = rawConstructor;

        for (let i = 1; i < argCount; ++i) {
          wireArgs[i] = resolvedArgTypes[i].toWireType(destructors, args[i - 1]);
        }

        const ptr = invokerFunc.apply(null, wireArgs);
        runDestructors(destructors);
        
        return resolvedArgTypes[0].fromWireType(ptr);
      };

      return [];
    });

    return [];
  });
}

function resolveArgTypes(addr: unknown, count: number): unknown[] {
  // Implementation placeholder
  return [];
}

function getFunctionInvoker(signature: unknown, func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
  // Implementation placeholder
  return func;
}

function whenDependentTypesAreResolved(
  dependencies: unknown[],
  types: unknown[],
  callback: (resolved: any[]) => unknown[]
): void {
  // Implementation placeholder
}

function throwUnboundTypeError(message: string, types: unknown[]): never {
  throw new Error(message);
}

function throwBindingError(message: string): never {
  throw new Error(message);
}

function runDestructors(destructors: unknown[]): void {
  // Implementation placeholder
}

class BindingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BindingError';
  }
}