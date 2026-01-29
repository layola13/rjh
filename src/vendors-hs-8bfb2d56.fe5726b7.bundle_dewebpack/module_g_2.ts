interface RegisteredClass {
  pureVirtualFunctions: string[];
  instancePrototype: Record<string, any>;
}

interface ClassType {
  name: string;
  registeredClass: RegisteredClass;
}

interface OverloadableFunction {
  argCount?: number;
  className?: string;
  overloadTable?: Record<number, Function>;
}

/**
 * Registers a virtual method on a class prototype with type binding and overload support
 */
function registerVirtualMethod(
  classType: ClassType,
  methodName: string,
  argumentCount: number,
  argumentTypes: unknown[],
  returnType: unknown,
  methodImplementation: unknown,
  invokerFunction: Function,
  isPureVirtual: boolean
): void {
  const unboundTypes = resolveTypes(argumentCount, argumentTypes);
  const sanitizedMethodName = sanitizeMethodName(methodName);
  const boundReturnType = bindReturnType(returnType, methodImplementation);

  whenDependenciesReady([], [classType], (resolvedClasses) => {
    const resolvedClass = resolvedClasses[0];
    const fullMethodName = `${resolvedClass.name}.${sanitizedMethodName}`;

    function unboundMethodStub(): never {
      throwBindingError(
        `Cannot call ${fullMethodName} due to unbound types`,
        unboundTypes
      );
    }

    if (isPureVirtual) {
      resolvedClass.registeredClass.pureVirtualFunctions.push(sanitizedMethodName);
    }

    const prototype = resolvedClass.registeredClass.instancePrototype;
    const existingMethod = prototype[sanitizedMethodName] as OverloadableFunction | undefined;

    const shouldReplaceMethod =
      existingMethod === undefined ||
      (existingMethod.overloadTable === undefined &&
        existingMethod.className !== resolvedClass.name &&
        existingMethod.argCount === argumentCount - 2);

    if (shouldReplaceMethod) {
      unboundMethodStub.argCount = argumentCount - 2;
      unboundMethodStub.className = resolvedClass.name;
      prototype[sanitizedMethodName] = unboundMethodStub;
    } else {
      ensureOverloadTable(prototype, sanitizedMethodName, fullMethodName);
      prototype[sanitizedMethodName].overloadTable![argumentCount - 2] = unboundMethodStub;
    }

    whenDependenciesReady([], unboundTypes, (resolvedTypes) => {
      const boundMethod = createMethodInvoker(
        fullMethodName,
        resolvedTypes,
        resolvedClass,
        boundReturnType,
        invokerFunction
      );

      const currentMethod = prototype[sanitizedMethodName] as OverloadableFunction;

      if (currentMethod.overloadTable === undefined) {
        boundMethod.argCount = argumentCount - 2;
        prototype[sanitizedMethodName] = boundMethod;
      } else {
        currentMethod.overloadTable[argumentCount - 2] = boundMethod;
      }

      return [];
    });

    return [];
  });
}

// Placeholder declarations for external dependencies
declare function resolveTypes(count: number, types: unknown[]): unknown[];
declare function sanitizeMethodName(name: string): string;
declare function bindReturnType(type: unknown, implementation: unknown): unknown;
declare function whenDependenciesReady(
  deps1: unknown[],
  deps2: unknown[],
  callback: (resolved: any[]) => unknown[]
): void;
declare function throwBindingError(message: string, types: unknown[]): never;
declare function ensureOverloadTable(
  prototype: Record<string, any>,
  methodName: string,
  fullName: string
): void;
declare function createMethodInvoker(
  name: string,
  types: unknown[],
  classType: ClassType,
  returnType: unknown,
  invoker: Function
): Function;