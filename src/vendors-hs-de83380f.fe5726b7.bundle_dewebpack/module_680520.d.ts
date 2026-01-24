/**
 * Alipay Circle Filled Icon Definition
 * 
 * A filled circular icon representing the Alipay logo.
 * This icon follows the Ant Design icon specification format.
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition following Ant Design icon specification
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconSvg;
  /** Icon identifier name */
  name: 'alipay-circle';
  /** Icon style theme variant */
  theme: 'filled';
}

/**
 * Alipay Circle Filled Icon
 * 
 * @remarks
 * This is a filled theme icon representing Alipay's circular logo.
 * Compatible with Ant Design icon system.
 * 
 * @example
 *