interface TypeDescriptor {
  [key: string]: unknown;
}

function registerExternalFunction(
  functionName: string,
  parameterCount: number,
  parameterTypeIds: unknown,
  returnTypeId: unknown,
  invokerFunction: unknown,
  functionPointer: unknown
): void {
  const typeList = convertTypeList(parameterCount, parameterTypeIds);
  const normalizedFunctionName = normalizeFunctionName(functionName);
  const invoker = createInvoker(returnTypeId, invokerFunction);

  whenDependenciesReady(
    normalizedFunctionName,
    () => {
      throwBindingError(
        `Cannot call ${normalizedFunctionName} due to unbound types`,
        typeList
      );
    },
    parameterCount - 1
  );

  resolveTypes([], typeList, (resolvedTypes: TypeDescriptor[]) => {
    const signatureTypes = [resolvedTypes[0], null].concat(
      resolvedTypes.slice(1)
    );
    
    exposeFunction(
      normalizedFunctionName,
      createFunctionBinding(
        normalizedFunctionName,
        signatureTypes,
        null,
        invoker,
        functionPointer
      ),
      parameterCount - 1
    );
    
    return [];
  });
}