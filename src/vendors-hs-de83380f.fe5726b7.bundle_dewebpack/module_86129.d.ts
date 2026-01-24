/**
 * Line height icon definition
 * Ant Design outlined icon component for line-height functionality
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration interface
 */
interface LineHeightIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Line height icon configuration
 * Represents a text formatting icon for adjusting line height
 */
declare const lineHeightIcon: LineHeightIcon;

export default lineHeightIcon;