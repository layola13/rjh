/**
 * Validates that a collection contains an element.
 * This function checks if the given collection has the specified value
 * and returns the collection for method chaining.
 * 
 * @module ValidationUtilities
 */

import { has } from './module_68801';

/**
 * Validates that a value exists in a collection.
 * 
 * This function performs an existence check using the `has` function
 * and returns the input value unchanged, enabling fluent/chained operations.
 * 
 * @template T - The type of the collection being validated
 * @param collection - The collection to validate for element existence
 * @returns The same collection that was passed in, after validation
 * @throws May throw if the `has` function determines the element doesn't exist
 * 
 * @example
 *