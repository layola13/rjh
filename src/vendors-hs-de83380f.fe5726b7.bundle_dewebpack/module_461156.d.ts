/**
 * Search icon definition for Ant Design Icons
 * @module SearchOutlined
 */

/**
 * SVG attributes interface for the icon element
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChild[];
}

/**
 * Complete icon object structure
 */
interface IconObject {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Search icon (outlined theme) definition
 * Represents a magnifying glass search icon with viewBox "64 64 896 896"
 */
declare const SearchOutlinedIcon: IconObject;

export default SearchOutlinedIcon;