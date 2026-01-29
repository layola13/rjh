const SECRET_TOKEN: unique symbol = Symbol.for('prop-types.secret');

function emptyFunction(): void {}

function resetWarningCache(): void {}

interface PropTypeChecker {
  (props: Record<string, unknown>, propName: string, componentName: string, location: string, propFullName: string, secret: symbol): Error | null;
  isRequired: PropTypeChecker;
}

interface PropTypes {
  array: PropTypeChecker;
  bigint: PropTypeChecker;
  bool: PropTypeChecker;
  func: PropTypeChecker;
  number: PropTypeChecker;
  object: PropTypeChecker;
  string: PropTypeChecker;
  symbol: PropTypeChecker;
  any: PropTypeChecker;
  arrayOf: (typeChecker: PropTypeChecker) => PropTypeChecker;
  element: PropTypeChecker;
  elementType: PropTypeChecker;
  instanceOf: (expectedClass: unknown) => PropTypeChecker;
  node: PropTypeChecker;
  objectOf: (typeChecker: PropTypeChecker) => PropTypeChecker;
  oneOf: (expectedValues: unknown[]) => PropTypeChecker;
  oneOfType: (typeCheckers: PropTypeChecker[]) => PropTypeChecker;
  shape: (shapeTypes: Record<string, PropTypeChecker>) => PropTypeChecker;
  exact: (shapeTypes: Record<string, PropTypeChecker>) => PropTypeChecker;
  checkPropTypes: typeof resetWarningCache;
  resetWarningCache: typeof resetWarningCache;
  PropTypes?: PropTypes;
}

function createPropTypes(): PropTypes {
  function validatePropType(
    props: Record<string, unknown>,
    propName: string,
    componentName: string,
    location: string,
    propFullName: string,
    secret: symbol
  ): Error | null {
    if (secret !== SECRET_TOKEN) {
      const error = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
      );
      error.name = 'Invariant Violation';
      throw error;
    }
    return null;
  }

  function createChainableTypeChecker(): PropTypeChecker {
    return validatePropType as PropTypeChecker;
  }

  validatePropType.isRequired = validatePropType as PropTypeChecker;

  const propTypes: PropTypes = {
    array: validatePropType as PropTypeChecker,
    bigint: validatePropType as PropTypeChecker,
    bool: validatePropType as PropTypeChecker,
    func: validatePropType as PropTypeChecker,
    number: validatePropType as PropTypeChecker,
    object: validatePropType as PropTypeChecker,
    string: validatePropType as PropTypeChecker,
    symbol: validatePropType as PropTypeChecker,
    any: validatePropType as PropTypeChecker,
    arrayOf: createChainableTypeChecker,
    element: validatePropType as PropTypeChecker,
    elementType: validatePropType as PropTypeChecker,
    instanceOf: createChainableTypeChecker,
    node: validatePropType as PropTypeChecker,
    objectOf: createChainableTypeChecker,
    oneOf: createChainableTypeChecker,
    oneOfType: createChainableTypeChecker,
    shape: createChainableTypeChecker,
    exact: createChainableTypeChecker,
    checkPropTypes: resetWarningCache,
    resetWarningCache: resetWarningCache
  };

  propTypes.PropTypes = propTypes;
  return propTypes;
}

export default createPropTypes;