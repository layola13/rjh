/**
 * DOM Collection Iterator Polyfill
 * 
 * This module provides iterator support for various DOM collection types.
 * It ensures that DOM collections like NodeList, HTMLCollection, etc. 
 * have proper iteration capabilities (for...of loops, spreading, etc.)
 * and correct toString behavior via Symbol.iterator and Symbol.toStringTag.
 */

/**
 * Map of DOM collection interface names to their enumerable status.
 * - `true`: Collection should have enumerable iterator methods
 * - `false`: Collection iterator methods should be non-enumerable
 */
interface DOMCollectionConfig {
  readonly CSSRuleList: true;
  readonly CSSStyleDeclaration: false;
  readonly CSSValueList: false;
  readonly ClientRectList: false;
  readonly DOMRectList: false;
  readonly DOMStringList: false;
  readonly DOMTokenList: true;
  readonly DataTransferItemList: false;
  readonly FileList: false;
  readonly HTMLAllCollection: false;
  readonly HTMLCollection: false;
  readonly HTMLFormElement: false;
  readonly HTMLSelectElement: false;
  readonly MediaList: true;
  readonly MimeTypeArray: false;
  readonly NamedNodeMap: false;
  readonly NodeList: true;
  readonly PaintRequestList: false;
  readonly Plugin: false;
  readonly PluginArray: false;
  readonly SVGLengthList: false;
  readonly SVGNumberList: false;
  readonly SVGPathSegList: false;
  readonly SVGPointList: false;
  readonly SVGStringList: false;
  readonly SVGTransformList: false;
  readonly SourceBufferList: false;
  readonly StyleSheetList: true;
  readonly TextTrackCueList: false;
  readonly TextTrackList: false;
  readonly TouchList: false;
}

/**
 * Global object reference (typically `window` in browsers)
 */
declare const global: Window & typeof globalThis;

/**
 * Iterator methods from Array.prototype to be copied to DOM collections
 */
interface ArrayIteratorMethods<T> {
  [Symbol.iterator](): IterableIterator<T>;
  entries(): IterableIterator<[number, T]>;
  keys(): IterableIterator<number>;
  values(): IterableIterator<T>;
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: unknown): void;
}

/**
 * Utility type to extract the keys of DOMCollectionConfig
 */
type DOMCollectionName = keyof DOMCollectionConfig;

/**
 * Adds Symbol.iterator and Symbol.toStringTag to DOM collection prototypes
 * and copies array iteration methods to collections marked as enumerable.
 * 
 * @remarks
 * This polyfill iterates through all configured DOM collection types and:
 * 1. Adds Symbol.iterator if not present (delegates to Array iterator)
 * 2. Adds Symbol.toStringTag for proper Object.prototype.toString behavior
 * 3. Copies Array iterator methods (entries, keys, values, forEach) for enumerable collections
 * 
 * @internal
 * Module initialization is self-executing and modifies global DOM prototypes
 */
declare module 'dom-collection-iterator-polyfill' {
  /**
   * Configuration object mapping DOM collection names to enumerable flags
   */
  export const DOM_COLLECTIONS: DOMCollectionConfig;
  
  /**
   * List of DOM collection names to be polyfilled
   */
  export const collectionNames: ReadonlyArray<DOMCollectionName>;
  
  /**
   * Applies iterator polyfill to a specific DOM collection prototype
   * 
   * @param collectionName - Name of the DOM collection interface
   * @param isEnumerable - Whether iterator methods should be enumerable
   * @param globalContext - Global object containing the collection constructor
   */
  export function polyfillCollection(
    collectionName: DOMCollectionName,
    isEnumerable: boolean,
    globalContext: typeof globalThis
  ): void;
}

/**
 * Type augmentation to ensure TypeScript recognizes iterator support
 * on DOM collections that may not have it in older type definitions
 */
declare global {
  interface NodeList<TNode extends Node = Node> extends Iterable<TNode> {
    [Symbol.iterator](): IterableIterator<TNode>;
    [Symbol.toStringTag]: 'NodeList';
  }
  
  interface HTMLCollection extends Iterable<Element> {
    [Symbol.iterator](): IterableIterator<Element>;
    [Symbol.toStringTag]: 'HTMLCollection';
  }
  
  interface DOMTokenList extends Iterable<string> {
    [Symbol.iterator](): IterableIterator<string>;
    [Symbol.toStringTag]: 'DOMTokenList';
  }
  
  interface CSSRuleList extends Iterable<CSSRule> {
    [Symbol.iterator](): IterableIterator<CSSRule>;
    [Symbol.toStringTag]: 'CSSRuleList';
  }
  
  interface MediaList extends Iterable<string> {
    [Symbol.iterator](): IterableIterator<string>;
    [Symbol.toStringTag]: 'MediaList';
  }
  
  interface StyleSheetList extends Iterable<CSSStyleSheet> {
    [Symbol.iterator](): IterableIterator<CSSStyleSheet>;
    [Symbol.toStringTag]: 'StyleSheetList';
  }
}

export {};