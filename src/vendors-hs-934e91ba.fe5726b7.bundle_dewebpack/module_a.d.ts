/**
 * Module: module_a
 * Original ID: a
 * 
 * Registers a class method with support for function overloading.
 * Handles pure virtual functions and creates appropriate method descriptors.
 */

/**
 * Type dependency resolver callback
 */
type DependencyCallback<T> = (resolvedTypes: unknown[]) => T[];

/**
 * Method descriptor with overload support
 */
interface MethodDescriptor {
  /** Number of arguments (excluding 'this' and hidden parameters) */
  argCount: number;
  /** Name of the class this method belongs to */
  className: string;
  /** Overload table indexed by argument count */
  overloadTable?: Record<number, MethodDescriptor>;
}

/**
 * Registered class metadata
 */
interface RegisteredClass {
  /** Class name */
  name: string;
  /** Instance prototype object */
  instancePrototype: Record<string, MethodDescriptor>;
  /** List of pure virtual function names */
  pureVirtualFunctions: string[];
}

/**
 * Class handle with registration info
 */
interface ClassHandle {
  name: string;
  registeredClass: RegisteredClass;
}

/**
 * Registers a class method with overload support
 * 
 * @param classHandle - Handle to the class being extended
 * @param methodName - Raw method name identifier
 * @param typeIds - Array of type IDs for signature
 * @param rawInvoker - Raw function invoker
 * @param invokerSignature - Signature descriptor for the invoker
 * @param argumentCount - Total number of arguments including hidden params
 * @param isPureVirtual - Whether this is a pure virtual function
 * @param isAsync - Whether this method is asynchronous
 */
function registerClassMethod(
  classHandle: ClassHandle,
  methodName: unknown,
  typeIds: unknown[],
  rawInvoker: unknown,
  invokerSignature: unknown,
  argumentCount: number,
  isPureVirtual: unknown,
  isAsync: unknown
): void {
  // Resolve type dependencies from type IDs
  const typeDependencies = convertTypeIds(typeIds, rawInvoker);
  
  // Convert raw method name to string
  const methodNameStr = readString(methodName);
  
  // Get invoker function from signature
  const invoker = getInvoker(invokerSignature, isAsync);
  
  // Wait for all type dependencies to resolve
  whenDependenciesReady([], [classHandle], (resolvedClasses: ClassHandle[]) => {
    const classInfo = resolvedClasses[0];
    const fullMethodName = `${classInfo.name}.${methodNameStr}`;

    /**
     * Placeholder function that throws when called before types are bound
     */
    function unboundTypeHandler(): never {
      throwBindingError(
        `Cannot call ${fullMethodName} due to unbound types`,
        typeDependencies
      );
    }

    // Track pure virtual functions
    if (isPureVirtual && classInfo.registeredClass.pureVirtualFunctions) {
      classInfo.registeredClass.pureVirtualFunctions.push(methodNameStr);
    }

    const prototype = classInfo.registeredClass.instancePrototype;
    const existingMethod = prototype[methodNameStr];
    const userArgCount = argumentCount - 2; // Exclude 'this' and return type

    // Check if method needs initialization or is an overload
    const needsInit =
      existingMethod === undefined ||
      (existingMethod.overloadTable === undefined &&
        existingMethod.className !== classInfo.name &&
        existingMethod.argCount === userArgCount);

    if (needsInit) {
      // Initialize new method
      unboundTypeHandler.argCount = userArgCount;
      unboundTypeHandler.className = classInfo.name;
      prototype[methodNameStr] = unboundTypeHandler;
    } else {
      // Add to existing method's overload table
      ensureOverloadTable(prototype, methodNameStr, fullMethodName);
      prototype[methodNameStr].overloadTable![userArgCount] = unboundTypeHandler;
    }

    // Wait for parameter types to resolve, then create final method
    whenDependenciesReady([], typeDependencies, (resolvedTypes: unknown[]) => {
      const methodImplementation = createMethodCaller(
        fullMethodName,
        resolvedTypes,
        classInfo,
        invoker,
        isPureVirtual
      );

      if (prototype[methodNameStr].overloadTable === undefined) {
        // Single method without overloads
        methodImplementation.argCount = userArgCount;
        prototype[methodNameStr] = methodImplementation;
      } else {
        // Add to overload table
        prototype[methodNameStr].overloadTable![userArgCount] = methodImplementation;
      }

      return [];
    });

    return [];
  });
}