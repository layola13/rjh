interface TypeInfo {
  name: string;
  isVoid?: boolean;
  argPackAdvance: number;
  deleteObject?: ((arg: any) => void) | null;
  readValueFromPointer: (pointer: number) => any;
  toWireType?: (destructors: any, value: any) => any;
}

interface TypeRegistry {
  [key: number]: TypeInfo;
}

declare const O: Int32Array;
declare const ht: Array<(...args: any[]) => any>;

function pt(typeId: number, parameterName: string): TypeInfo {
  // Implementation would depend on the actual type registry lookup
  throw new Error('pt function implementation required');
}

function ae(name: string): string {
  // Sanitizes/formats method names
  return name.replace(/[^a-zA-Z0-9_$]/g, '_');
}

function tt(constructor: FunctionConstructor, args: string[]): Function {
  // Creates a new function using Function constructor with given arguments
  return constructor(...args);
}

function createMethodCaller(argumentCount: number, typePointer: number): number {
  const typeInfos = getTypeInfoArray(argumentCount, typePointer);
  const returnType = typeInfos[0];
  const parameterTypes = typeInfos.slice(1);
  
  const functionName = generateFunctionName(returnType, parameterTypes);
  const generatedFunction = generateMethodCallerCode(
    argumentCount,
    returnType,
    parameterTypes,
    functionName
  );
  
  return registerFunction(generatedFunction);
}

function getTypeInfoArray(count: number, pointer: number): TypeInfo[] {
  const result = new Array<TypeInfo>(count);
  
  for (let i = 0; i < count; ++i) {
    result[i] = pt(O[(pointer >> 2) + i], `parameter ${i}`);
  }
  
  return result;
}

function generateFunctionName(returnType: TypeInfo, parameterTypes: TypeInfo[]): string {
  const paramNames = parameterTypes.map(type => type.name).join('_');
  return `${returnType.name}_$${paramNames}$`;
}

function generateMethodCallerCode(
  argumentCount: number,
  returnType: TypeInfo,
  parameterTypes: TypeInfo[],
  functionName: string
): Function {
  const templateArgs = ['retType'];
  const templateValues: TypeInfo[] = [returnType];
  
  let parameterList = '';
  for (let i = 0; i < argumentCount - 1; ++i) {
    parameterList += (i !== 0 ? ', ' : '') + `arg${i}`;
    templateArgs.push(`argType${i}`);
    templateValues.push(parameterTypes[i]);
  }
  
  let functionBody = `return function ${ae('methodCaller_' + functionName)}(handle, name, destructors, args) {\n`;
  
  let pointerOffset = 0;
  for (let i = 0; i < argumentCount - 1; ++i) {
    const offsetStr = pointerOffset ? `+${pointerOffset}` : '';
    functionBody += `  var arg${i} = argType${i}.readValueFromPointer(args${offsetStr});\n`;
    pointerOffset += parameterTypes[i].argPackAdvance;
  }
  
  functionBody += `  var rv = handle[name](${parameterList});\n`;
  
  for (let i = 0; i < argumentCount - 1; ++i) {
    if (parameterTypes[i].deleteObject) {
      functionBody += `  argType${i}.deleteObject(arg${i});\n`;
    }
  }
  
  if (!returnType.isVoid) {
    functionBody += `  return retType.toWireType(destructors, rv);\n`;
  }
  
  functionBody += '};\n';
  templateArgs.push(functionBody);
  
  return tt(Function, templateArgs).apply(null, templateValues);
}

function registerFunction(func: Function): number {
  const index = ht.length;
  ht.push(func);
  return index;
}

export { createMethodCaller };