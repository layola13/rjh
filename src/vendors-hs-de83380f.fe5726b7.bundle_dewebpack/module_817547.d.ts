/**
 * Ant Design Icon: Up Circle Filled
 * A circular icon with an upward-pointing chevron/arrow
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme/style */
  theme: string;
}

/**
 * Up Circle Filled Icon
 * 
 * Represents an upward-pointing chevron inside a filled circle.
 * Commonly used for scroll-to-top, collapse, or upward navigation actions.
 * 
 * @example
 * import UpCircleFilled from './up-circle-filled';
 * <Icon component={UpCircleFilled.icon} />
 */
declare const UpCircleFilled: IconDefinition;

export default UpCircleFilled;