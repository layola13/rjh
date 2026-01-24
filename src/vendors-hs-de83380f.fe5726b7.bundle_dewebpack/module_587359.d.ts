/**
 * Slack Square Filled Icon Component
 * 
 * A filled Slack logo icon in a square shape, typically used in icon libraries
 * or design systems. This icon follows the Ant Design icon specification.
 */

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
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Array of child elements (paths) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Slack Square Filled Icon
 * 
 * Default export containing the complete icon definition including
 * SVG markup, name, and theme information.
 */
declare const SlackSquareFilledIcon: IconDefinition;

export default SlackSquareFilledIcon;