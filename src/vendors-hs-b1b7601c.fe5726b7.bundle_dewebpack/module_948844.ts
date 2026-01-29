function identity<T>(value: T): T {
  return value;
}

export function pipe<T>(...functions: Array<(value: any) => any>): (value: T) => any {
  return pipeFromArray(functions);
}

export function pipeFromArray<T>(functions: Array<(value: any) => any>): (value: T) => any {
  if (functions.length === 0) {
    return identity;
  }
  
  if (functions.length === 1) {
    return functions[0];
  }
  
  return (initialValue: T) => {
    return functions.reduce((accumulator, currentFunction) => {
      return currentFunction(accumulator);
    }, initialValue);
  };
}