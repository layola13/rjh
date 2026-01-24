/**
 * Ant Design Icon: Bulb (Filled)
 * Represents a filled bulb/lightbulb icon component
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Bulb filled icon definition
 * Used for representing ideas, tips, or lighting concepts in UI
 */
declare const bulbFilledIcon: IconDefinition;

export default bulbFilledIcon;