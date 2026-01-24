/**
 * Validates the selector functions used in a React-Redux connect operation.
 * Ensures that mapStateToProps, mapDispatchToProps, and mergeProps are properly defined
 * and checks for the presence of the dependsOnOwnProps property.
 * 
 * @param mapStateToProps - Function that maps Redux state to component props
 * @param mapDispatchToProps - Function that maps dispatch actions to component props
 * @param mergeProps - Function that merges state props, dispatch props, and own props
 * @param connectName - Name of the connect operation for error reporting
 * @throws {Error} If any selector is undefined or invalid
 */
export default function validateSelectors(
  mapStateToProps: unknown,
  mapDispatchToProps: unknown,
  mergeProps: unknown,
  connectName: string
): void;

/**
 * Validates a single selector function.
 * Checks if the selector exists and warns if dependsOnOwnProps is not specified
 * for mapStateToProps or mapDispatchToProps.
 * 
 * @param selector - The selector function to validate
 * @param selectorName - Name of the selector for error reporting ('mapStateToProps' | 'mapDispatchToProps' | 'mergeProps')
 * @param connectName - Name of the connect operation for error reporting
 * @throws {Error} If the selector is undefined or null
 * @internal
 */
declare function validateSelector(
  selector: unknown,
  selectorName: string,
  connectName: string
): void;