import installErrorCause from './module_79227';
import globalObject from './module_81482';
import applyConstructor from './module_95888';
import createErrorConstructor from './module_30742';

const WEBASSEMBLY = 'WebAssembly';
const webAssemblyObject = globalObject[WEBASSEMBLY];
const nativeCauseSupported = 7 !== Error('e', { cause: 7 }).cause;

interface InstallOptions {
  global?: boolean;
  target?: string;
  stat?: boolean;
  constructor?: boolean;
  arity?: number;
  forced?: boolean;
}

function installGlobalError(errorName: string, wrapper: (originalConstructor: ErrorConstructor) => Function): void {
  const options: Record<string, Function> = {};
  options[errorName] = createErrorConstructor(errorName, wrapper, nativeCauseSupported);
  
  installErrorCause({
    global: true,
    constructor: true,
    arity: 1,
    forced: nativeCauseSupported
  }, options);
}

function installWebAssemblyError(errorName: string, wrapper: (originalConstructor: ErrorConstructor) => Function): void {
  if (webAssemblyObject && webAssemblyObject[errorName]) {
    const options: Record<string, Function> = {};
    options[errorName] = createErrorConstructor(`${WEBASSEMBLY}.${errorName}`, wrapper, nativeCauseSupported);
    
    installErrorCause({
      target: WEBASSEMBLY,
      stat: true,
      constructor: true,
      arity: 1,
      forced: nativeCauseSupported
    }, options);
  }
}

installGlobalError('Error', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): Error {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('EvalError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): EvalError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('RangeError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): RangeError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('ReferenceError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): ReferenceError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('SyntaxError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): SyntaxError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('TypeError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): TypeError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installGlobalError('URIError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): URIError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installWebAssemblyError('CompileError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): WebAssembly.CompileError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installWebAssemblyError('LinkError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): WebAssembly.LinkError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});

installWebAssemblyError('RuntimeError', (originalConstructor: ErrorConstructor) => {
  return function (message?: string): WebAssembly.RuntimeError {
    return applyConstructor(originalConstructor, this, arguments);
  };
});