/**
 * Icon definition for an outlined bulb/lightbulb icon
 * Represents an idea, inspiration, or lighting concept in Ant Design icon system
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the icon can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Child element in the SVG structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure
 */
interface Icon {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Visual style theme of the icon */
  theme: string;
}

/**
 * Bulb icon definition (outlined theme)
 * 
 * This icon depicts a lightbulb and is commonly used to represent:
 * - Ideas and creativity
 * - Insights and inspiration
 * - Power/light controls
 * - Settings or configuration options
 * 
 * @remarks
 * This is an outlined (not filled) variant of the bulb icon.
 * The icon uses a 64-896 viewBox coordinate system.
 */
declare const bulbOutlinedIcon: IconDefinition;

export default bulbOutlinedIcon;