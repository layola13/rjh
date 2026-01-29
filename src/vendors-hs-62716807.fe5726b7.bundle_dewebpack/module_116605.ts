interface ExportOptions {
  enumerable?: boolean;
  name?: string;
  global?: boolean;
  unsafe?: boolean;
  nonConfigurable?: boolean;
  nonWritable?: boolean;
}

interface ObjectDefineProperty {
  f(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
}

function isCallable(value: unknown): boolean {
  return typeof value === 'function';
}

function setFunctionName(fn: Function, name: string, options: ExportOptions): void {
  // Implementation for setting function name
}

function createGlobalProperty(name: string, value: unknown): void {
  // Implementation for creating global property
}

const defineProperty: ObjectDefineProperty = {
  f(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    Object.defineProperty(target, propertyKey, descriptor);
  }
};

export default function exportFunction(
  target: any,
  propertyName: string,
  value: unknown,
  options: ExportOptions = {}
): any {
  const isEnumerable = options.enumerable;
  const functionName = options.name !== undefined ? options.name : propertyName;

  if (isCallable(value)) {
    setFunctionName(value as Function, functionName, options);
  }

  if (options.global) {
    if (isEnumerable) {
      target[propertyName] = value;
    } else {
      createGlobalProperty(propertyName, value);
    }
  } else {
    try {
      if (options.unsafe && target[propertyName]) {
        options.enumerable = true;
      } else {
        delete target[propertyName];
      }
    } catch (error) {
      // Ignore deletion errors
    }

    if (isEnumerable) {
      target[propertyName] = value;
    } else {
      defineProperty.f(target, propertyName, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    }
  }

  return target;
}