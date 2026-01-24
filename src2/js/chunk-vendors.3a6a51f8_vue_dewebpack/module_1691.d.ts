/**
 * Array of non-enumerable property names that exist on JavaScript objects.
 * These properties are typically not returned by for...in loops or Object.keys(),
 * but are important when dealing with object introspection and polyfills.
 * 
 * @remarks
 * This list includes fundamental Object.prototype methods that are shadowed
 * in property enumeration and are commonly checked in legacy browser compatibility code.
 */
declare const nonEnumerableProps: readonly [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];

export = nonEnumerableProps;