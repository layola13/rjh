/**
 * CSS autoprefixer utility module
 * Provides vendor prefix handling for CSS-in-JS properties
 */

/**
 * CSS property value type - can be string, number, or undefined
 */
export type CSSValue = string | number | undefined;

/**
 * Generic CSS properties object with string keys and CSS values
 */
export interface CSSProperties {
  [key: string]: CSSValue;
}

/**
 * Vendor-prefixed border radius properties
 */
export interface PrefixedBorderRadius {
  msBorderRadius: CSSValue;
  MozBorderRadius: CSSValue;
  OBorderRadius: CSSValue;
  WebkitBorderRadius: CSSValue;
  borderRadius: CSSValue;
}

/**
 * Vendor-prefixed box shadow properties
 */
export interface PrefixedBoxShadow {
  msBoxShadow: CSSValue;
  MozBoxShadow: CSSValue;
  OBoxShadow: CSSValue;
  WebkitBoxShadow: CSSValue;
  boxShadow: CSSValue;
}

/**
 * Vendor-prefixed user select properties
 */
export interface PrefixedUserSelect {
  WebkitTouchCallout: CSSValue;
  KhtmlUserSelect: CSSValue;
  MozUserSelect: CSSValue;
  msUserSelect: CSSValue;
  WebkitUserSelect: CSSValue;
  userSelect: CSSValue;
}

/**
 * Vendor-prefixed flex properties
 */
export interface PrefixedFlex {
  WebkitBoxFlex: CSSValue;
  MozBoxFlex: CSSValue;
  WebkitFlex: CSSValue;
  msFlex: CSSValue;
  flex: CSSValue;
}

/**
 * Vendor-prefixed flex basis properties
 */
export interface PrefixedFlexBasis {
  WebkitFlexBasis: CSSValue;
  flexBasis: CSSValue;
}

/**
 * Vendor-prefixed justify content properties
 */
export interface PrefixedJustifyContent {
  WebkitJustifyContent: CSSValue;
  justifyContent: CSSValue;
}

/**
 * Vendor-prefixed transition properties
 */
export interface PrefixedTransition {
  msTransition: CSSValue;
  MozTransition: CSSValue;
  OTransition: CSSValue;
  WebkitTransition: CSSValue;
  transition: CSSValue;
}

/**
 * Vendor-prefixed transform properties
 */
export interface PrefixedTransform {
  msTransform: CSSValue;
  MozTransform: CSSValue;
  OTransform: CSSValue;
  WebkitTransform: CSSValue;
  transform: CSSValue;
}

/**
 * Absolute positioning properties
 */
export interface AbsolutePosition {
  position: 'absolute';
  top: CSSValue;
  right: CSSValue;
  bottom: CSSValue;
  left: CSSValue;
}

/**
 * Extended property placeholder
 */
export interface ExtendedProperty {
  extend: CSSValue;
}

/**
 * Union of all possible prefixed property return types
 */
export type PrefixedProperties = 
  | PrefixedBorderRadius
  | PrefixedBoxShadow
  | PrefixedUserSelect
  | PrefixedFlex
  | PrefixedFlexBasis
  | PrefixedJustifyContent
  | PrefixedTransition
  | PrefixedTransform
  | AbsolutePosition
  | ExtendedProperty
  | CSSProperties;

/**
 * Style object with nested selectors or pseudo-classes
 */
export interface StyleObject {
  [selector: string]: CSSProperties;
}

/**
 * Automatically adds vendor prefixes to CSS properties
 * 
 * @param styles - Style object with selectors as keys and CSS properties as values
 * @returns Transformed style object with vendor-prefixed properties
 * 
 * @example
 *