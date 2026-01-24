/**
 * Converts media query objects into CSS media query strings.
 * Supports single objects, arrays of objects, or raw strings.
 */

/**
 * Checks if a CSS property name relates to dimensions (height or width)
 * @param property - The CSS property name to test
 * @returns True if the property ends with 'height' or 'width'
 */
type DimensionProperty = string;

/**
 * Media query value types
 */
type MediaQueryValue = string | number | boolean;

/**
 * Media query configuration object
 * Keys are CSS property names, values can be strings, numbers, or booleans
 */
interface MediaQueryObject {
  [key: string]: MediaQueryValue;
}

/**
 * Input type for media query conversion
 * Can be a string, single object, or array of objects
 */
type MediaQueryInput = string | MediaQueryObject | MediaQueryObject[];

/**
 * Hyphenates camelCase property names (imported from module 778427)
 * @param propertyName - CamelCase property name
 * @returns Hyphenated property name
 */
declare function hyphenateStyleName(propertyName: string): string;

/**
 * Tests if a property name represents a dimension (height/width)
 * @param propertyName - The property name to check
 * @returns True if property relates to dimensions
 */
function isDimensionProperty(propertyName: string): boolean {
  return /[height|width]$/.test(propertyName);
}

/**
 * Converts a single media query object to a string
 * @param queryObject - Object containing media query properties
 * @returns Formatted media query string
 */
function convertObjectToMediaQuery(queryObject: MediaQueryObject): string {
  let result = "";
  const keys = Object.keys(queryObject);

  keys.forEach((key: string, index: number) => {
    let value = queryObject[key];
    let hyphenatedKey = hyphenateStyleName(key);

    // Auto-append 'px' to numeric dimension values
    if (isDimensionProperty(hyphenatedKey) && typeof value === "number") {
      value = `${value}px`;
    }

    // Format based on value type
    if (value === true) {
      result += hyphenatedKey;
    } else if (value === false) {
      result += `not ${hyphenatedKey}`;
    } else {
      result += `(${hyphenatedKey}: ${value})`;
    }

    // Add 'and' separator between conditions
    if (index < keys.length - 1) {
      result += " and ";
    }
  });

  return result;
}

/**
 * Converts media query input to CSS media query string
 * @param input - String, object, or array of objects representing media queries
 * @returns Formatted CSS media query string
 */
export default function toMediaQuery(input: MediaQueryInput): string {
  // Pass through strings as-is
  if (typeof input === "string") {
    return input;
  }

  // Handle array of query objects
  if (Array.isArray(input)) {
    let result = "";
    input.forEach((queryObject: MediaQueryObject, index: number) => {
      result += convertObjectToMediaQuery(queryObject);
      
      // Add comma separator between query groups
      if (index < input.length - 1) {
        result += ", ";
      }
    });
    return result;
  }

  // Handle single query object
  return convertObjectToMediaQuery(input);
}