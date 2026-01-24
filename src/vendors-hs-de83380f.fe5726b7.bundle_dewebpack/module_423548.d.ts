/**
 * Layout icon configuration (filled theme)
 * Represents a layout/column structure icon in the Ant Design icon set
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * Root SVG element configuration
 */
interface SvgElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: PathElement[];
}

/**
 * Icon definition structure for Ant Design icons
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Layout icon (filled theme) - represents a column layout structure
 * Typically used in UI controls for switching between different layout modes
 */
declare const layoutFilledIcon: IconDefinition;

export default layoutFilledIcon;