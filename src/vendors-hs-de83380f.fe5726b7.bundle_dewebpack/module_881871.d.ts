/**
 * DingTalk Square Icon Configuration
 * 
 * Represents the filled DingTalk square icon for Ant Design Icon library.
 * This icon is typically used to represent DingTalk application or integration points.
 */

/**
 * SVG element attributes interface
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
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element configuration
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfiguration {
  /** HTML/SVG tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChildElement[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfiguration;
  /** Unique identifier name for the icon */
  name: string;
  /** Visual theme style of the icon */
  theme: string;
}

/**
 * DingTalk Square filled icon definition
 * 
 * @remarks
 * This icon uses a filled theme style and represents the DingTalk application
 * in a square format. The viewBox is set to "64 64 896 896" for proper scaling.
 */
declare const dingtalkSquareIcon: IconDefinition;

export default dingtalkSquareIcon;