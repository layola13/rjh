export function createErrorClass(errorFactory: (instance: Error) => void): ErrorConstructor {
  const CustomError = errorFactory(function(this: Error) {
    Error.call(this);
    this.stack = new Error().stack;
  } as any) as any;

  CustomError.prototype = Object.create(Error.prototype);
  CustomError.prototype.constructor = CustomError;

  return CustomError;
}

interface ErrorConstructor {
  new(): Error;
  prototype: Error;
}