interface EnumValue {
  value: number;
  constructor: Function;
}

interface EnumConstructor {
  prototype: any;
  values: Record<number, EnumValue>;
  [key: string]: any;
}

function createEnumValue(
  enumRef: any,
  key: string,
  value: number
): void {
  const enumDescriptor = getEnumDescriptor(enumRef, "enum");
  const normalizedKey = normalizeKey(key);
  const constructor = enumDescriptor.constructor as EnumConstructor;
  
  const enumValueInstance: EnumValue = Object.create(
    constructor.prototype,
    {
      value: {
        value: value
      },
      constructor: {
        value: createNamedFunction(
          `${enumDescriptor.name}_${normalizedKey}`,
          function() {}
        )
      }
    }
  );
  
  constructor.values[value] = enumValueInstance;
  constructor[normalizedKey] = enumValueInstance;
}

declare function getEnumDescriptor(target: any, type: string): any;
declare function normalizeKey(key: string): string;
declare function createNamedFunction(name: string, fn: Function): Function;