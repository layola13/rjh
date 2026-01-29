type GetBuiltinFunction = (name: string) => any;

interface MockSet {
  size: number;
  has(): boolean;
  keys(): MockIterator;
}

interface MockIterator {
  next(): IteratorResult<never>;
}

function checkSetMethod(methodName: string): boolean {
  try {
    const SetConstructor = getBuiltin("Set");
    const setInstance = new SetConstructor();
    
    const mockSet: MockSet = {
      size: 0,
      has(): boolean {
        return false;
      },
      keys(): MockIterator {
        return {
          next(): IteratorResult<never> {
            return {
              done: true,
            };
          },
        };
      },
    };
    
    setInstance[methodName](mockSet);
    
    return true;
  } catch (error) {
    return false;
  }
}

export default checkSetMethod;

declare function getBuiltin(name: string): any;