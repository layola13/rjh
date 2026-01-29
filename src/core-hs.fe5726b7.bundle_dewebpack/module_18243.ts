type RegExpExecResult = RegExpExecArray | null;

interface RegExpLike {
  exec?: (str: string) => RegExpExecResult;
}

function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function validateObject(value: unknown): void {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    throw new TypeError('Value must be an object');
  }
}

function getClassOf(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

function nativeRegExpExec(regexp: RegExp, str: string): RegExpExecResult {
  return RegExp.prototype.exec.call(regexp, str);
}

function regExpExec(regexp: RegExpLike | RegExp, str: string): RegExpExecResult {
  const execMethod = (regexp as RegExpLike).exec;
  
  if (isCallable(execMethod)) {
    const result = execMethod.call(regexp, str);
    
    if (result !== null) {
      validateObject(result);
    }
    
    return result;
  }
  
  if (getClassOf(regexp) === 'RegExp') {
    return nativeRegExpExec(regexp as RegExp, str);
  }
  
  throw new TypeError('RegExp#exec called on incompatible receiver');
}

export { regExpExec };