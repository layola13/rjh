interface ArgType {
  readValueFromPointer(args: number): unknown;
  argPackAdvance: number;
}

interface ModuleType {
  HEAP32: Int32Array;
}

const emvalAllocatorCache: Map<number, EmvalAllocatorFunction> = new Map();

type EmvalAllocatorFunction = (
  constructor: new (...args: unknown[]) => unknown,
  argTypes: number,
  args: number
) => number;

function createEmvalAllocator(
  argCount: number,
  requireRegisteredType: (typeId: number, paramName: string) => ArgType,
  module: ModuleType,
  emvalRegister: (obj: unknown) => number
): EmvalAllocatorFunction {
  let argList = '';
  for (let i = 0; i < argCount; i++) {
    argList += (i !== 0 ? ', ' : '') + `arg${i}`;
  }

  let functionBody = `return function emval_allocator_${argCount}(constructor, argTypes, args) {\n`;
  
  for (let i = 0; i < argCount; i++) {
    functionBody += `var argType${i} = requireRegisteredType(Module['HEAP32'][(argTypes >> 2) + ${i}], "parameter ${i}");\n`;
    functionBody += `var arg${i} = argType${i}.readValueFromPointer(args);\n`;
    functionBody += `args += argType${i}['argPackAdvance'];\n`;
  }
  
  functionBody += `var obj = new constructor(${argList});\n`;
  functionBody += `return __emval_register(obj);\n`;
  functionBody += '}\n';

  return new Function(
    'requireRegisteredType',
    'Module',
    '__emval_register',
    functionBody
  )(requireRegisteredType, module, emvalRegister) as EmvalAllocatorFunction;
}

function allocateEmvalInstance(
  constructor: new (...args: unknown[]) => unknown,
  argCount: number,
  argTypes: number,
  args: number,
  requireRegisteredType: (typeId: number, paramName: string) => ArgType,
  module: ModuleType,
  emvalRegister: (obj: unknown) => number
): number {
  let allocator = emvalAllocatorCache.get(argCount);
  
  if (!allocator) {
    allocator = createEmvalAllocator(argCount, requireRegisteredType, module, emvalRegister);
    emvalAllocatorCache.set(argCount, allocator);
  }
  
  return allocator(constructor, argTypes, args);
}