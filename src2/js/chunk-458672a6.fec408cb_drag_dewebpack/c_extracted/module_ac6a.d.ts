/**
 * DOM Collection Iterator Polyfill Module
 * 
 * This module adds iterator support to various DOM collection types.
 * It ensures that DOM collections like NodeList, HTMLCollection, etc.
 * can be iterated using modern iteration protocols (for...of loops).
 * 
 * @module DOMCollectionIteratorPolyfill
 */

/**
 * Configuration mapping for DOM collection types.
 * Maps collection type names to whether they should be enumerable.
 */
interface DOMCollectionConfig {
  /** CSS rule list collection */
  CSSRuleList: boolean;
  /** Inline style declaration object */
  CSSStyleDeclaration: boolean;
  /** CSS value list */
  CSSValueList: boolean;
  /** Legacy client rectangle list */
  ClientRectList: boolean;
  /** Modern DOM rectangle list */
  DOMRectList: boolean;
  /** List of strings in DOM */
  DOMStringList: boolean;
  /** Token list (e.g., classList) */
  DOMTokenList: boolean;
  /** Data transfer items in drag & drop */
  DataTransferItemList: boolean;
  /** File input file list */
  FileList: boolean;
  /** Special collection of all elements */
  HTMLAllCollection: boolean;
  /** Live collection of HTML elements */
  HTMLCollection: boolean;
  /** Form element collection */
  HTMLFormElement: boolean;
  /** Select element options */
  HTMLSelectElement: boolean;
  /** CSS media query list */
  MediaList: boolean;
  /** Browser MIME type array */
  MimeTypeArray: boolean;
  /** Named attribute map */
  NamedNodeMap: boolean;
  /** Node list collection */
  NodeList: boolean;
  /** Paint request list */
  PaintRequestList: boolean;
  /** Browser plugin object */
  Plugin: boolean;
  /** Browser plugins array */
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
  /** Stylesheet collection */
  StyleSheetList: boolean;
  /** Text track cue list */
  TextTrackCueList: boolean;
  /** Text track list */
  TextTrackList: boolean;
  /** Touch event touch list */
  TouchList: boolean;
}

/**
 * Iterator symbol type
 */
declare const ITERATOR_SYMBOL: unique symbol;

/**
 * String tag symbol type
 */
declare const TO_STRING_TAG_SYMBOL: unique symbol;

/**
 * Module dependencies interface
 */
interface ModuleDependencies {
  /** Array iterator methods object (cadf) */
  arrayIteratorMethods: Record<string, Function>;
  
  /** Object.keys implementation (0d58) */
  getObjectKeys: (obj: object) => string[];
  
  /** Redefine property method (2aba) */
  redefineProperty: (target: object, key: string, descriptor: PropertyDescriptor, enumerable?: boolean) => void;
  
  /** Global object reference (7726) */
  global: typeof globalThis;
  
  /** Hide property method (32e9) */
  hideProperty: (target: object, key: PropertyKey, value: unknown) => void;
  
  /** Iterators storage object (84f2) */
  iterators: Record<string, Function>;
  
  /** Well-known symbols provider (2b4c) */
  wellKnownSymbols: Record<string, symbol>;
}

/**
 * Polyfill initialization function
 * 
 * Iterates through DOM collection types and adds iterator support:
 * 1. Adds iterator protocol (Symbol.iterator)
 * 2. Adds toStringTag for proper type identification
 * 3. Copies array iterator methods if collection is enumerable
 * 
 * @param dependencies - Module dependencies containing helper functions and references
 */
declare function initializeDOMCollectionIterators(dependencies: ModuleDependencies): void;

/**
 * Type augmentation for DOM collections with iterator support
 */
declare global {
  interface CSSRuleList extends Iterable<CSSRule> {}
  interface CSSStyleDeclaration extends Iterable<string> {}
  interface CSSValueList extends Iterable<CSSValue> {}
  interface ClientRectList extends Iterable<ClientRect> {}
  interface DOMRectList extends Iterable<DOMRect> {}
  interface DOMStringList extends Iterable<string> {}
  interface DOMTokenList extends Iterable<string> {}
  interface DataTransferItemList extends Iterable<DataTransferItem> {}
  interface FileList extends Iterable<File> {}
  interface HTMLAllCollection extends Iterable<Element> {}
  interface HTMLCollection extends Iterable<Element> {}
  interface HTMLFormElement extends Iterable<Element> {}
  interface HTMLSelectElement extends Iterable<HTMLOptionElement> {}
  interface MediaList extends Iterable<string> {}
  interface MimeTypeArray extends Iterable<MimeType> {}
  interface NamedNodeMap extends Iterable<Attr> {}
  interface NodeList extends Iterable<Node> {}
  interface Plugin extends Iterable<MimeType> {}
  interface PluginArray extends Iterable<Plugin> {}
  interface SVGLengthList extends Iterable<SVGLength> {}
  interface SVGNumberList extends Iterable<SVGNumber> {}
  interface SVGPathSegList extends Iterable<SVGPathSeg> {}
  interface SVGPointList extends Iterable<DOMPoint> {}
  interface SVGStringList extends Iterable<string> {}
  interface SVGTransformList extends Iterable<SVGTransform> {}
  interface SourceBufferList extends Iterable<SourceBuffer> {}
  interface StyleSheetList extends Iterable<StyleSheet> {}
  interface TextTrackCueList extends Iterable<TextTrackCue> {}
  interface TextTrackList extends Iterable<TextTrack> {}
  interface TouchList extends Iterable<Touch> {}
}

export type {
  DOMCollectionConfig,
  ModuleDependencies
};

export {
  initializeDOMCollectionIterators,
  ITERATOR_SYMBOL,
  TO_STRING_TAG_SYMBOL
};