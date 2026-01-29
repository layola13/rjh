type TypeId = unknown;
type TypeName = string;
type FunctionName = string;
type ParameterCount = number;

interface TypeInfo {
  id: TypeId;
  name: TypeName;
}

function registerFunction(
  functionName: FunctionName,
  returnTypeId: TypeId,
  parameterTypeIds: TypeId[],
  parameterCount: ParameterCount,
  invoker: unknown,
  functionPointer: unknown
): void {
  const typeIds = resolveTypes(returnTypeId, parameterTypeIds);
  const normalizedFunctionName = normalizeFunctionName(functionName);
  const invokerFunction = createInvoker(parameterCount, invoker);

  setFunctionStub(normalizedFunctionName, () => {
    throwBindingError(`Cannot call ${normalizedFunctionName} due to unbound types`, typeIds);
  }, parameterCount - 1);

  whenDependentTypesAreResolved([], typeIds, (resolvedTypes: TypeInfo[]) => {
    const typesWithNullContext = [resolvedTypes[0], null].concat(resolvedTypes.slice(1));
    const functionImplementation = createFunctionImplementation(
      normalizedFunctionName,
      typesWithNullContext,
      null,
      invokerFunction,
      functionPointer
    );
    registerFunctionImplementation(normalizedFunctionName, functionImplementation, parameterCount - 1);
    return [];
  });
}

function resolveTypes(returnTypeId: TypeId, parameterTypeIds: TypeId[]): TypeId[] {
  return [returnTypeId, ...parameterTypeIds];
}

function normalizeFunctionName(name: string): string {
  // Placeholder for actual implementation
  return name;
}

function createInvoker(parameterCount: ParameterCount, invoker: unknown): unknown {
  // Placeholder for actual implementation
  return invoker;
}

function setFunctionStub(
  functionName: FunctionName,
  stub: () => void,
  adjustedParameterCount: number
): void {
  // Placeholder for actual implementation
}

function throwBindingError(message: string, typeIds: TypeId[]): never {
  throw new Error(`${message}: ${JSON.stringify(typeIds)}`);
}

function whenDependentTypesAreResolved(
  dependencies: unknown[],
  typeIds: TypeId[],
  callback: (types: TypeInfo[]) => unknown[]
): void {
  // Placeholder for actual implementation
}

function createFunctionImplementation(
  functionName: FunctionName,
  types: (TypeInfo | null)[],
  context: null,
  invoker: unknown,
  functionPointer: unknown
): unknown {
  // Placeholder for actual implementation
  return null;
}

function registerFunctionImplementation(
  functionName: FunctionName,
  implementation: unknown,
  adjustedParameterCount: number
): void {
  // Placeholder for actual implementation
}