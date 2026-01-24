/**
 * DOM Collection Types Configuration
 * 
 * Defines which DOM collection types have iterable capabilities.
 * - Value 0: Non-iterable collection (legacy behavior)
 * - Value 1: Iterable collection (supports Symbol.iterator)
 * 
 * This mapping is commonly used for polyfills or compatibility layers
 * to determine which collections need iterator support in older environments.
 */

/**
 * Configuration value for DOM collection iterability
 */
type CollectionIterability = 0 | 1;

/**
 * Map of DOM collection interface names to their iterability status
 */
interface DOMCollectionTypes {
  /** CSS rule list collection */
  CSSRuleList: CollectionIterability;
  
  /** CSS style declaration collection (inline styles, computed styles) */
  CSSStyleDeclaration: CollectionIterability;
  
  /** CSS value list collection */
  CSSValueList: CollectionIterability;
  
  /** Client rectangle list collection */
  ClientRectList: CollectionIterability;
  
  /** DOM rectangle list collection */
  DOMRectList: CollectionIterability;
  
  /** DOM string list collection */
  DOMStringList: CollectionIterability;
  
  /** DOM token list collection (e.g., classList) - iterable */
  DOMTokenList: CollectionIterability;
  
  /** Data transfer item list collection (drag & drop API) */
  DataTransferItemList: CollectionIterability;
  
  /** File list collection (file input elements) */
  FileList: CollectionIterability;
  
  /** HTML all elements collection (document.all) */
  HTMLAllCollection: CollectionIterability;
  
  /** HTML element collection */
  HTMLCollection: CollectionIterability;
  
  /** HTML form element collection */
  HTMLFormElement: CollectionIterability;
  
  /** HTML select element options collection */
  HTMLSelectElement: CollectionIterability;
  
  /** CSS media query list collection */
  MediaList: CollectionIterability;
  
  /** MIME type array collection */
  MimeTypeArray: CollectionIterability;
  
  /** Named node map collection (element attributes) */
  NamedNodeMap: CollectionIterability;
  
  /** Node list collection - iterable */
  NodeList: CollectionIterability;
  
  /** Paint request list collection */
  PaintRequestList: CollectionIterability;
  
  /** Browser plugin object */
  Plugin: CollectionIterability;
  
  /** Browser plugin array collection */
  PluginArray: CollectionIterability;
  
  /** SVG length list collection */
  SVGLengthList: CollectionIterability;
  
  /** SVG number list collection */
  SVGNumberList: CollectionIterability;
  
  /** SVG path segment list collection */
  SVGPathSegList: CollectionIterability;
  
  /** SVG point list collection */
  SVGPointList: CollectionIterability;
  
  /** SVG string list collection */
  SVGStringList: CollectionIterability;
  
  /** SVG transform list collection */
  SVGTransformList: CollectionIterability;
  
  /** Media source buffer list collection */
  SourceBufferList: CollectionIterability;
  
  /** Stylesheet list collection */
  StyleSheetList: CollectionIterability;
  
  /** Text track cue list collection */
  TextTrackCueList: CollectionIterability;
  
  /** Text track list collection */
  TextTrackList: CollectionIterability;
  
  /** Touch event touch list collection */
  TouchList: CollectionIterability;
}

/**
 * DOM collection types configuration object
 */
declare const domCollectionTypes: DOMCollectionTypes;

export default domCollectionTypes;