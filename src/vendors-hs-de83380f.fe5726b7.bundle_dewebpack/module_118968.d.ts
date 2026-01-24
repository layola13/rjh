/**
 * SVG path attributes interface
 * Defines the properties for an SVG path element
 */
interface SvgPathAttributes {
  /** SVG path data string that defines the shape */
  d: string;
}

/**
 * SVG path element structure
 * Represents a path element within an SVG
 */
interface SvgPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: SvgPathAttributes;
}

/**
 * SVG root element attributes
 * Configuration for the root SVG element
 */
interface SvgRootAttributes {
  /** Fill rule for determining the interior of paths */
  'fill-rule': 'evenodd' | 'nonzero';
  /** SVG viewBox - defines the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: 'false' | 'true' | 'auto';
}

/**
 * SVG icon structure
 * Complete structure of an SVG icon element
 */
interface SvgIcon {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** Root SVG element attributes */
  attrs: SvgRootAttributes;
  /** Child elements (paths) within the SVG */
  children: SvgPathElement[];
}

/**
 * Icon definition interface
 * Complete icon configuration object used throughout the application
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Unique identifier name for the icon */
  name: string;
  /** Visual theme variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * TikTok filled icon
 * Represents the TikTok logo in filled style with a viewBox of 64 64 896 896
 */
declare const tikTokFilledIcon: IconDefinition;

export default tikTokFilledIcon;