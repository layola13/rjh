const classofRaw = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

const fails = (executor: () => void): boolean => {
  try {
    executor();
    return false;
  } catch {
    return true;
  }
};

const uncurryThis = <T, A extends unknown[], R>(fn: (this: T, ...args: A) => R) => {
  return (thisArg: T, ...args: A): R => {
    return fn.apply(thisArg, args);
  };
};

const split = uncurryThis(String.prototype.split);

const indexedToArray = fails(() => {
  return !Object("z").propertyIsEnumerable(0);
})
  ? (value: unknown): unknown[] | object => {
      return classofRaw(value) === "String" 
        ? split(value as string, "") 
        : Object(value);
    }
  : Object;

export default indexedToArray;