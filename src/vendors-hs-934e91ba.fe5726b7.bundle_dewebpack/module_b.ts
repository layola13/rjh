interface RegisteredClass {
  pureVirtualFunctions: string[];
  instancePrototype: Record<string, any>;
}

interface ClassType {
  name: string;
  registeredClass: RegisteredClass;
}

interface MethodDescriptor {
  argCount?: number;
  className?: string;
  overloadTable?: Record<number, MethodDescriptor>;
}

function registerVirtualMethod(
  classType: ClassType,
  methodName: string,
  argumentCount: number,
  returnType: unknown,
  parameterTypes: unknown[],
  methodIndex: number,
  methodOptions: unknown,
  isPureVirtual: boolean
): void {
  const convertedParameterTypes = convertTypes(argumentCount, returnType);
  const normalizedMethodName = normalizeName(methodName);
  const methodInvoker = createInvoker(parameterTypes, methodIndex);

  whenDependenciesReady([], [classType], (resolvedTypes: ClassType[]) => {
    const resolvedClassType = resolvedTypes[0];
    const fullMethodName = `${resolvedClassType.name}.${normalizedMethodName}`;

    function unboundMethodStub(): void {
      throwBindingError(
        `Cannot call ${fullMethodName} due to unbound types`,
        convertedParameterTypes
      );
    }

    if (isPureVirtual) {
      resolvedClassType.registeredClass.pureVirtualFunctions.push(
        normalizedMethodName
      );
    }

    const prototype = resolvedClassType.registeredClass.instancePrototype;
    const existingMethod = prototype[normalizedMethodName] as
      | MethodDescriptor
      | undefined;

    const overloadCount = argumentCount - 2;

    if (
      existingMethod === undefined ||
      (existingMethod.overloadTable === undefined &&
        existingMethod.className !== resolvedClassType.name &&
        existingMethod.argCount === overloadCount)
    ) {
      unboundMethodStub.argCount = overloadCount;
      unboundMethodStub.className = resolvedClassType.name;
      prototype[normalizedMethodName] = unboundMethodStub;
    } else {
      ensureOverloadTable(prototype, normalizedMethodName, fullMethodName);
      prototype[normalizedMethodName].overloadTable![overloadCount] =
        unboundMethodStub;
    }

    whenDependenciesReady([], convertedParameterTypes, (resolvedParamTypes: unknown[]) => {
      const boundMethod = createMethodImplementation(
        fullMethodName,
        resolvedParamTypes,
        resolvedClassType,
        methodInvoker,
        methodOptions
      );

      if (prototype[normalizedMethodName].overloadTable === undefined) {
        boundMethod.argCount = overloadCount;
        prototype[normalizedMethodName] = boundMethod;
      } else {
        prototype[normalizedMethodName].overloadTable![overloadCount] = boundMethod;
      }

      return [];
    });

    return [];
  });
}