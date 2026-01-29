import getBuiltIn from './13270';
import hasOwnProperty from './98324';
import createNonEnumerableProperty from './71154';
import objectIsPrototypeOf from './6368';
import setPrototypeOf from './7712';
import copyConstructorProperties from './22451';
import createPropertyDescriptor from './21253';
import inheritIfRequired from './47068';
import normalizeStringArgument from './1752';
import installErrorCause from './36067';
import installErrorStack from './61748';
import DESCRIPTORS from './63855';
import IS_PURE from './28808';

interface ErrorConstructor {
  new (message?: string): Error;
  prototype: Error;
  stackTraceLimit?: number;
  prepareStackTrace?: (error: Error, stack: any) => any;
}

type ErrorFactory = (messageOrOptions?: any, options?: any) => Error;

/**
 * Creates a wrapped error constructor with enhanced functionality
 * @param path - Dot-separated path to the built-in error constructor (e.g., 'Error', 'TypeError')
 * @param wrapper - Factory function to wrap the error constructor
 * @param forced - Whether to force override even if native implementation exists
 * @param useOptionsParameter - Whether the constructor uses an options parameter (ES2022 Error Cause)
 * @returns The wrapped error constructor or undefined
 */
export default function createErrorConstructor(
  path: string,
  wrapper: (factory: ErrorFactory) => ErrorConstructor,
  forced: boolean,
  useOptionsParameter: boolean
): ErrorConstructor | undefined {
  const STACK_TRACE_LIMIT_PROPERTY = 'stackTraceLimit';
  const expectedArgumentCount = useOptionsParameter ? 2 : 1;
  const pathSegments = path.split('.');
  const errorName = pathSegments[pathSegments.length - 1];
  const NativeErrorConstructor = getBuiltIn.apply(null, pathSegments) as ErrorConstructor | undefined;

  if (!NativeErrorConstructor) {
    return undefined;
  }

  const nativePrototype = NativeErrorConstructor.prototype;

  // Clean up 'cause' property in non-pure mode if it exists
  if (!IS_PURE && hasOwnProperty(nativePrototype, 'cause')) {
    delete nativePrototype.cause;
  }

  // Return native constructor if not forced
  if (!forced) {
    return NativeErrorConstructor;
  }

  const BaseError = getBuiltIn('Error') as ErrorConstructor;

  const WrappedErrorConstructor = wrapper(function (
    this: any,
    messageOrOptions?: any,
    options?: any
  ): Error {
    const message = normalizeStringArgument(
      useOptionsParameter ? options : messageOrOptions,
      undefined
    );
    const instance = useOptionsParameter
      ? new NativeErrorConstructor(messageOrOptions)
      : new NativeErrorConstructor();

    if (message !== undefined) {
      createNonEnumerableProperty(instance, 'message', message);
    }

    installErrorStack(instance, WrappedErrorConstructor, instance.stack, 2);

    if (this && objectIsPrototypeOf(nativePrototype, this)) {
      inheritIfRequired(instance, this, WrappedErrorConstructor);
    }

    if (arguments.length > expectedArgumentCount) {
      installErrorCause(instance, arguments[expectedArgumentCount]);
    }

    return instance;
  } as any);

  WrappedErrorConstructor.prototype = nativePrototype;

  // Set up prototype chain
  if (errorName !== 'Error') {
    if (setPrototypeOf) {
      setPrototypeOf(WrappedErrorConstructor, BaseError);
    } else {
      copyConstructorProperties(WrappedErrorConstructor, BaseError, { name: true });
    }
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT_PROPERTY in NativeErrorConstructor) {
    createPropertyDescriptor(WrappedErrorConstructor, NativeErrorConstructor, STACK_TRACE_LIMIT_PROPERTY);
    createPropertyDescriptor(WrappedErrorConstructor, NativeErrorConstructor, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedErrorConstructor, NativeErrorConstructor);

  // Fix prototype properties in non-pure mode
  if (!IS_PURE) {
    try {
      if (nativePrototype.name !== errorName) {
        createNonEnumerableProperty(nativePrototype, 'name', errorName);
      }
      nativePrototype.constructor = WrappedErrorConstructor;
    } catch (error) {
      // Silently fail if prototype is frozen
    }
  }

  return WrappedErrorConstructor;
}