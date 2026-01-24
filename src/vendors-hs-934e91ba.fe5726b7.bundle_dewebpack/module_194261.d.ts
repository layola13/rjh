/**
 * Assigns own and inherited enumerable string keyed properties of source objects
 * to the destination object for all destination properties that resolve to `undefined`.
 * Source objects are applied from left to right. Once a property is set, additional
 * values of the same property are ignored.
 *
 * **Note:** This method mutates the target object.
 *
 * @template T - The type of the target object
 * @param {T} target - The destination object to assign values to
 * @param {...Array<Partial<T>>} sources - The source objects to assign properties from
 * @returns {T} The modified target object with default values applied
 *
 * @example
 *