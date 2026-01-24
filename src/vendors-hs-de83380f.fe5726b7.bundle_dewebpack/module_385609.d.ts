/**
 * Check Square Icon Component Definition
 * An outlined check mark icon within a square frame
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that compose the icon */
  children: SvgChildElement[];
}

/**
 * Complete icon configuration object
 */
interface CheckSquareIconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'check-square';
  /** Icon style theme */
  theme: 'outlined';
}

/**
 * Check Square Icon - Outlined theme
 * Represents a checkmark symbol inside a square outline
 */
declare const checkSquareIcon: CheckSquareIconConfig;

export default checkSquareIcon;