interface ErrorWithStack extends Error {
  stack?: string;
}

function installErrorStack(
  error: ErrorWithStack,
  constructor: Function,
  createStackMessage: (message: string, additionalInfo?: unknown) => string,
  additionalInfo?: unknown
): void {
  const captureStackTrace = Error.captureStackTrace;
  const shouldInstallStack = typeof captureStackTrace !== 'undefined';

  if (shouldInstallStack) {
    if (captureStackTrace) {
      captureStackTrace(error, constructor);
    } else {
      const defineProperty = Object.defineProperty;
      const stackMessage = createStackMessage(
        error.message ?? '',
        additionalInfo
      );
      defineProperty(error, 'stack', {
        value: stackMessage,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
}

export default installErrorStack;