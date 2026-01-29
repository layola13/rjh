interface PropertyDescriptor {
  value?: unknown;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

function defineIteratorMethods(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
  shouldDefine: boolean
): void {
  const definePropertySupported = checkDefinePropertySupport();

  if (propertyKey) {
    if (definePropertySupported) {
      Object.defineProperty(target, propertyKey, {
        value: descriptor,
        enumerable: !shouldDefine,
        configurable: !shouldDefine,
        writable: !shouldDefine
      });
    } else {
      (target as Record<string, unknown>)[propertyKey] = descriptor;
    }
  } else {
    defineIteratorMethod(target, "next", 0);
    defineIteratorMethod(target, "throw", 1);
    defineIteratorMethod(target, "return", 2);
  }
}

function checkDefinePropertySupport(): boolean {
  try {
    Object.defineProperty({}, "", {});
    return true;
  } catch {
    return false;
  }
}

function defineIteratorMethod(
  target: object,
  methodName: string,
  methodType: number
): void {
  defineIteratorMethods(
    target,
    methodName,
    function (this: { _invoke: (name: string, type: number, value: unknown) => unknown }, value: unknown) {
      return this._invoke(methodName, methodType, value);
    } as unknown as PropertyDescriptor,
    false
  );
}

export default defineIteratorMethods;
export { defineIteratorMethods };