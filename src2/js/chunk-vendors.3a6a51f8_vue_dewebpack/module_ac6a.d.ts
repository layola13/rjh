/**
 * DOM Collection Iterator Module
 * 
 * This module adds iterator support to various DOM collection types,
 * making them compatible with ES6 iteration protocols (for...of loops, spread operator, etc.)
 */

/**
 * Map of DOM collection types to their enumerable status
 * - true: collection should have enumerable iterator properties
 * - false: collection should have non-enumerable iterator properties
 */
interface DOMCollectionConfig {
  /** CSS rule list collection */
  CSSRuleList: boolean;
  /** Inline and computed style declaration */
  CSSStyleDeclaration: boolean;
  /** CSS value list */
  CSSValueList: boolean;
  /** Legacy client rectangle list */
  ClientRectList: boolean;
  /** Modern DOM rectangle list */
  DOMRectList: boolean;
  /** List of strings */
  DOMStringList: boolean;
  /** Token list (e.g., classList) */
  DOMTokenList: boolean;
  /** DataTransfer items in drag-and-drop */
  DataTransferItemList: boolean;
  /** File input files */
  FileList: boolean;
  /** Legacy all elements collection */
  HTMLAllCollection: boolean;
  /** Live HTML element collection */
  HTMLCollection: boolean;
  /** Form element collection */
  HTMLFormElement: boolean;
  /** Select element options */
  HTMLSelectElement: boolean;
  /** CSS media query list */
  MediaList: boolean;
  /** Browser MIME types */
  MimeTypeArray: boolean;
  /** Element attribute map */
  NamedNodeMap: boolean;
  /** Node list collection */
  NodeList: boolean;
  /** Canvas paint request list */
  PaintRequestList: boolean;
  /** Browser plugin */
  Plugin: boolean;
  /** Browser plugin array */
  PluginArray: boolean;
  /** SVG length list */
  SVGLengthList: boolean;
  /** SVG number list */
  SVGNumberList: boolean;
  /** SVG path segment list */
  SVGPathSegList: boolean;
  /** SVG point list */
  SVGPointList: boolean;
  /** SVG string list */
  SVGStringList: boolean;
  /** SVG transform list */
  SVGTransformList: boolean;
  /** Media source buffer list */
  SourceBufferList: boolean;
  /** Document stylesheet list */
  StyleSheetList: boolean;
  /** Text track cue list */
  TextTrackCueList: boolean;
  /** Video/audio track list */
  TextTrackList: boolean;
  /** Touch event touch list */
  TouchList: boolean;
}

/**
 * Configuration map defining which DOM collections should have enumerable iterators
 */
declare const DOM_COLLECTION_CONFIG: Readonly<DOMCollectionConfig>;

/**
 * Iterator methods to be added to DOM collections
 */
interface ArrayIteratorMethods<T> {
  /** Returns an iterator over collection values */
  [Symbol.iterator](): IterableIterator<T>;
  /** Returns an iterator over [index, value] pairs */
  entries(): IterableIterator<[number, T]>;
  /** Returns an iterator over collection keys (indices) */
  keys(): IterableIterator<number>;
  /** Returns an iterator over collection values */
  values(): IterableIterator<T>;
  /** Executes a function for each element */
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: unknown): void;
}

/**
 * Augments DOM collection prototypes with iterator support
 * 
 * @param arrayIteratorMethods - Standard array iterator methods to install
 * @param getObjectKeys - Function to retrieve object keys
 * @param redefineProperty - Function to redefine properties on objects
 * @param globalObject - Global window/global object
 * @param hideProperty - Function to define non-enumerable properties
 * @param iteratorRegistry - Registry mapping type names to iterator implementations
 * @param iteratorSymbol - Symbol.iterator symbol
 * @param toStringTagSymbol - Symbol.toStringTag symbol
 * @param arrayIterator - Reference to Array iterator implementation
 * @param collectionConfig - Configuration for DOM collections
 */
declare function augmentDOMCollections(
  arrayIteratorMethods: ArrayIteratorMethods<unknown>,
  getObjectKeys: (obj: object) => string[],
  redefineProperty: (target: object, key: string, source: object, enumerable: boolean) => void,
  globalObject: typeof globalThis,
  hideProperty: (target: object, key: symbol, value: unknown) => void,
  iteratorRegistry: Record<string, unknown>,
  iteratorSymbol: typeof Symbol.iterator,
  toStringTagSymbol: typeof Symbol.toStringTag,
  arrayIterator: unknown,
  collectionConfig: DOMCollectionConfig
): void;

/**
 * Module exports - enables iteration on DOM collections
 */
export {};