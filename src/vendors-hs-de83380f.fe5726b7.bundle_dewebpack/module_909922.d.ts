/**
 * Arrow Up icon component definition for Ant Design Icons
 * @module IconDefinition
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path elements */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested child elements (optional) */
  children?: IconChild[];
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SVGAttributes;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Arrow Up outlined icon definition
 * Represents an upward-pointing arrow used in UI navigation
 */
declare const arrowUpIcon: IconDefinition;

export default arrowUpIcon;