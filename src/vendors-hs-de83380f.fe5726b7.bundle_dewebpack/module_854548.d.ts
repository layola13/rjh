/**
 * Ant Design Icon: Minus Circle (Filled)
 * A filled circle icon with a minus/horizontal line symbol in the center
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Minus Circle Filled Icon
 * Represents a circular button with a minus/subtract symbol
 * Commonly used for remove, collapse, or decrease actions
 */
declare const minusCircleFilledIcon: IconDefinition;

export default minusCircleFilledIcon;