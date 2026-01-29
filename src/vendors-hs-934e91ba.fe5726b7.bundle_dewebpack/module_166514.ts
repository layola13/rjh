type AnyFunction = (...args: any[]) => any;

function overRest<T extends AnyFunction>(
  func: T,
  start: number = func.length - 1,
  transform: (args: any[]) => any = (x) => x
): (...args: any[]) => any {
  const startIndex = Math.max(start === undefined ? func.length - 1 : start, 0);
  
  return function (this: any, ...args: any[]): any {
    const restArgsCount = Math.max(args.length - startIndex, 0);
    const restArgs: any[] = new Array(restArgsCount);
    
    for (let index = 0; index < restArgsCount; index++) {
      restArgs[index] = args[startIndex + index];
    }
    
    const finalArgs: any[] = new Array(startIndex + 1);
    
    for (let index = 0; index < startIndex; index++) {
      finalArgs[index] = args[index];
    }
    
    finalArgs[startIndex] = transform(restArgs);
    
    return func.apply(this, finalArgs);
  };
}

export default overRest;