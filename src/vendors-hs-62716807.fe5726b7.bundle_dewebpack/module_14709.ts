interface ExportOptions {
  target: string;
  global: boolean;
  stat: boolean;
  dontCallGetSet?: boolean;
  forced?: boolean;
  sham?: boolean;
}

interface PropertyDescriptor {
  value?: any;
  sham?: boolean;
}

type ExportMethods = Record<string, any>;

declare const globalObject: any;

function setGlobalProperty(name: string, value: Record<string, any>): any {
  // Implementation would set property on global object
  return globalObject[name] = value;
}

function getOwnPropertyDescriptor(target: any, property: string): PropertyDescriptor | undefined {
  return Object.getOwnPropertyDescriptor(target, property) as PropertyDescriptor | undefined;
}

function defineProperty(target: any, property: string, value: boolean): void {
  Object.defineProperty(target, property, {
    value,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

function copyProperties(target: any, source: any): void {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}

function redefine(target: any, property: string, value: any, options: ExportOptions): void {
  Object.defineProperty(target, property, {
    value,
    writable: true,
    enumerable: !options.sham,
    configurable: true
  });
}

function isPrimitive(value: any): boolean {
  return value == null || (typeof value !== 'object' && typeof value !== 'function');
}

function validateExport(path: string, forced?: boolean): boolean {
  return forced !== false;
}

function getTypeOf(value: any): string {
  return typeof value;
}

export default function exportModule(options: ExportOptions, methods: ExportMethods): void {
  let targetObject: any;
  let methodName: string;
  let existingValue: any;
  let newMethod: any;
  let descriptor: PropertyDescriptor | undefined;

  const targetName = options.target;
  const isGlobal = options.global;
  const isStatic = options.stat;

  if (isGlobal) {
    targetObject = globalObject;
  } else if (isStatic) {
    targetObject = globalObject[targetName] || setGlobalProperty(targetName, {});
  } else {
    targetObject = (globalObject[targetName] || {}).prototype;
  }

  if (!targetObject) {
    return;
  }

  for (methodName in methods) {
    newMethod = methods[methodName];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(targetObject, methodName);
      existingValue = descriptor?.value;
    } else {
      existingValue = targetObject[methodName];
    }

    const exportPath = isGlobal 
      ? methodName 
      : `${targetName}${isStatic ? '.' : '#'}${methodName}`;

    if (!validateExport(exportPath, options.forced) && existingValue !== undefined) {
      if (getTypeOf(newMethod) === getTypeOf(existingValue)) {
        continue;
      }
      copyProperties(newMethod, existingValue);
    }

    if (options.sham || (existingValue?.sham)) {
      defineProperty(newMethod, 'sham', true);
    }

    redefine(targetObject, methodName, newMethod, options);
  }
}