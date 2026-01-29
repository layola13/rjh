const OBJECT_PROTOTYPE_METHODS: readonly string[] = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
] as const;

export default OBJECT_PROTOTYPE_METHODS;