/**
 * Ruby icon component definition (Ant Design Icons)
 * Provides SVG path data and metadata for the Ruby programming language icon
 */

/**
 * Icon attribute configuration
 */
interface IconAttrs {
  /** SVG fill rule for path rendering */
  'fill-rule': string;
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the icon is focusable for accessibility */
  focusable: string;
}

/**
 * SVG path element configuration
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: {
    /** SVG path data defining the shape */
    d: string;
  };
}

/**
 * SVG root element configuration
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Ruby programming language icon definition
 * Contains SVG path data for rendering the Ruby logo in outlined style
 */
declare const rubyIcon: IconDefinition;

export default rubyIcon;