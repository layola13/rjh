interface RegisteredClass {
  pureVirtualFunctions: string[];
  instancePrototype: Record<string, any>;
}

interface ClassType {
  name: string;
  registeredClass: RegisteredClass;
}

interface MethodOverload {
  argCount?: number;
  className?: string;
  overloadTable?: Record<number, MethodOverload>;
  (...args: any[]): any;
}

/**
 * Registers a pure virtual method on a class type with type binding and overload resolution
 */
function registerPureVirtualMethod(
  classType: ClassType,
  methodName: string,
  argumentCount: number,
  rawArgumentTypes: unknown[],
  rawReturnType: unknown,
  invokerFunction: Function,
  methodImplementation: Function,
  isAsync: boolean
): void {
  const boundArgumentTypes = convertTypes(rawArgumentTypes, rawReturnType);
  const normalizedMethodName = sanitizeMethodName(methodName);
  const boundInvoker = getInvoker(rawReturnType, invokerFunction);

  waitForTypeDependencies([], [classType], (resolvedClasses: ClassType[]) => {
    const resolvedClass = resolvedClasses[0];
    const fullMethodName = `${resolvedClass.name}.${normalizedMethodName}`;

    function unboundMethodStub(): void {
      throwBindingError(`Cannot call ${fullMethodName} due to unbound types`, boundArgumentTypes);
    }

    if (isAsync && resolvedClass.registeredClass.pureVirtualFunctions.push(normalizedMethodName));

    const instancePrototype = resolvedClass.registeredClass.instancePrototype;
    const existingMethod = instancePrototype[normalizedMethodName];
    const overloadKey = argumentCount - 2;

    const shouldReplaceMethod =
      existingMethod === undefined ||
      (existingMethod.overloadTable === undefined &&
        existingMethod.className !== resolvedClass.name &&
        existingMethod.argCount === overloadKey);

    if (shouldReplaceMethod) {
      unboundMethodStub.argCount = overloadKey;
      unboundMethodStub.className = resolvedClass.name;
      instancePrototype[normalizedMethodName] = unboundMethodStub;
    } else {
      ensureOverloadTable(instancePrototype, normalizedMethodName, fullMethodName);
      instancePrototype[normalizedMethodName].overloadTable![overloadKey] = unboundMethodStub;
    }

    waitForTypeDependencies([], boundArgumentTypes, (resolvedArgumentTypes: unknown[]) => {
      const boundMethod = createMethodWrapper(
        fullMethodName,
        resolvedArgumentTypes,
        resolvedClass,
        boundInvoker,
        methodImplementation
      );

      if (instancePrototype[normalizedMethodName].overloadTable === undefined) {
        boundMethod.argCount = overloadKey;
        instancePrototype[normalizedMethodName] = boundMethod;
      } else {
        instancePrototype[normalizedMethodName].overloadTable![overloadKey] = boundMethod;
      }

      return [];
    });

    return [];
  });
}

function convertTypes(argumentTypes: unknown[], returnType: unknown): unknown[] {
  return Ct(argumentTypes, returnType);
}

function sanitizeMethodName(name: string): string {
  return sA(name);
}

function getInvoker(returnType: unknown, invokerFunction: Function): Function {
  return gt(returnType, invokerFunction);
}

function throwBindingError(message: string, types: unknown[]): never {
  ut(message, types);
}

function waitForTypeDependencies(
  dependencies: unknown[],
  types: unknown[],
  callback: (resolved: any[]) => unknown[]
): void {
  wA(dependencies, types, callback);
}

function ensureOverloadTable(
  prototype: Record<string, any>,
  methodName: string,
  fullName: string
): void {
  LA(prototype, methodName, fullName);
}

function createMethodWrapper(
  methodName: string,
  argumentTypes: unknown[],
  classType: ClassType,
  invoker: Function,
  implementation: Function
): MethodOverload {
  return ct(methodName, argumentTypes, classType, invoker, implementation);
}