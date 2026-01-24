/**
 * DOM collection type definitions and polyfills
 * 
 * This module ensures that various DOM collection types have proper
 * toStringTag symbols and are registered in the internal type registry.
 * 
 * @module DOMCollectionTypes
 */

/**
 * List of DOM collection interface names that should be treated as array-like
 * and have their toStringTag properly configured.
 */
declare const DOM_COLLECTION_TYPES: readonly [
  "CSSRuleList",
  "CSSStyleDeclaration",
  "CSSValueList",
  "ClientRectList",
  "DOMRectList",
  "DOMStringList",
  "DOMTokenList",
  "DataTransferItemList",
  "FileList",
  "HTMLAllCollection",
  "HTMLCollection",
  "HTMLFormElement",
  "HTMLSelectElement",
  "MediaList",
  "MimeTypeArray",
  "NamedNodeMap",
  "NodeList",
  "PaintRequestList",
  "Plugin",
  "PluginArray",
  "SVGLengthList",
  "SVGNumberList",
  "SVGPathSegList",
  "SVGPointList",
  "SVGStringList",
  "SVGTransformList",
  "SourceBufferList",
  "StyleSheetList",
  "TextTrackCueList",
  "TextTrackList",
  "TouchList"
];

/**
 * Type registry mapping collection names to their Array-like behavior
 */
declare const TYPE_REGISTRY: Record<string, unknown>;

/**
 * Global object reference (typically `window` in browsers)
 */
declare const GLOBAL_OBJECT: typeof globalThis;

/**
 * Well-known Symbol.toStringTag used for Object.prototype.toString behavior
 */
declare const TO_STRING_TAG_SYMBOL: typeof Symbol.toStringTag;

/**
 * Utility to define a non-enumerable property on an object
 * 
 * @param target - The object to define the property on
 * @param propertyKey - The property key (string or symbol)
 * @param value - The value to set
 */
declare function defineHiddenProperty<T extends object, K extends PropertyKey>(
  target: T,
  propertyKey: K,
  value: unknown
): void;

/**
 * Initializes DOM collection types with proper toStringTag and type registry entries.
 * 
 * For each DOM collection type:
 * 1. Adds Symbol.toStringTag to its prototype if missing
 * 2. Registers it in the type registry as Array-like
 * 
 * @remarks
 * This ensures consistent behavior across different DOM collection types,
 * treating them similarly to native Arrays for iteration and type checking.
 */
declare function initializeDOMCollectionTypes(): void;

export {
  DOM_COLLECTION_TYPES,
  TYPE_REGISTRY,
  GLOBAL_OBJECT,
  TO_STRING_TAG_SYMBOL,
  defineHiddenProperty,
  initializeDOMCollectionTypes
};