/**
 * Ant Design Icon definition for align-right outlined icon
 * @module AlignRightOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure interface
 */
interface IconDefinition {
  /** Icon tag name (svg) */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration interface
 */
interface AlignRightIconConfig {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Align Right Outlined Icon configuration
 * 
 * This icon represents right text alignment functionality.
 * Part of Ant Design's icon library.
 */
declare const alignRightOutlinedIcon: AlignRightIconConfig;

export default alignRightOutlinedIcon;