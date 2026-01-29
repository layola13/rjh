/**
 * Validates the structure and properties of Redux connect function parameters.
 * Ensures that mapStateToProps, mapDispatchToProps, and mergeProps are properly defined
 * and contain the required dependsOnOwnProps property when applicable.
 */

/**
 * Configuration object for Redux mapStateToProps or mapDispatchToProps
 */
interface ReduxMapperConfig {
  /**
   * Indicates whether the mapper function depends on the component's own props
   */
  dependsOnOwnProps?: boolean;
  [key: string]: unknown;
}

/**
 * Type alias for mapper function parameter names
 */
type MapperType = 'mapStateToProps' | 'mapDispatchToProps' | 'mergeProps';

/**
 * Validates Redux connect configuration parameters.
 * Throws an error if any required parameter is missing or invalid.
 * Warns if mapStateToProps or mapDispatchToProps lack dependsOnOwnProps property.
 *
 * @param mapStateToProps - Function or object that maps Redux state to component props
 * @param mapDispatchToProps - Function or object that maps dispatch to component props
 * @param mergeProps - Optional function that merges state props, dispatch props, and own props
 * @param componentName - Name of the connected component (for error reporting)
 * @throws {Error} When any required parameter is missing or invalid
 */
export default function validateConnectParams(
  mapStateToProps: ReduxMapperConfig | null | undefined,
  mapDispatchToProps: ReduxMapperConfig | null | undefined,
  mergeProps: ReduxMapperConfig | null | undefined,
  componentName: string
): void {
  validateMapper(mapStateToProps, 'mapStateToProps', componentName);
  validateMapper(mapDispatchToProps, 'mapDispatchToProps', componentName);
  validateMapper(mergeProps, 'mergeProps', componentName);
}

/**
 * Validates a single mapper configuration object.
 * Ensures the mapper exists and contains the dependsOnOwnProps property when required.
 *
 * @param mapper - The mapper configuration to validate
 * @param mapperType - Type of mapper being validated
 * @param componentName - Name of the connected component (for error reporting)
 * @throws {Error} When the mapper is null or undefined
 */
function validateMapper(
  mapper: ReduxMapperConfig | null | undefined,
  mapperType: MapperType,
  componentName: string
): void {
  if (!mapper) {
    throw new Error(`Unexpected value for ${mapperType} in ${componentName}.`);
  }

  // Only check for dependsOnOwnProps in mapStateToProps and mapDispatchToProps
  if (
    (mapperType === 'mapStateToProps' || mapperType === 'mapDispatchToProps') &&
    !Object.prototype.hasOwnProperty.call(mapper, 'dependsOnOwnProps')
  ) {
    // Note: The original code calls a warning function (likely console.warn wrapper)
    // Import path: n(720645) - typically a warning utility
    console.warn(
      `The selector for ${mapperType} of ${componentName} did not specify a value for dependsOnOwnProps.`
    );
  }
}