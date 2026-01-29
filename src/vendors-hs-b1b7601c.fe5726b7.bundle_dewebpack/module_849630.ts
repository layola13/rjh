interface ArgsResult<T = unknown> {
  args: T[];
  keys: string[] | null;
}

export function argsArgArrayOrObject<T = unknown>(args: unknown[]): ArgsResult<T> {
  if (args.length === 1) {
    const firstArg = args[0];
    
    if (Array.isArray(firstArg)) {
      return {
        args: firstArg,
        keys: null
      };
    }
    
    if (isPlainObject(firstArg)) {
      const keys = Object.keys(firstArg);
      return {
        args: keys.map((key) => firstArg[key]),
        keys
      };
    }
  }
  
  return {
    args: args as T[],
    keys: null
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}