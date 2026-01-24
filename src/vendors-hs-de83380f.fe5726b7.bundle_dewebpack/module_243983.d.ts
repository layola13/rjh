/**
 * Icon definition for a "picture align left" icon in outlined theme.
 * This icon represents a layout with an image on the left and text on the right.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Represents an SVG path element with its attributes
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
 * Represents the root SVG element structure
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: PathElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Picture Left Outlined Icon
 * 
 * An Ant Design icon representing left-aligned image layout.
 * Displays a rectangular content area with an image placeholder on the left
 * and text lines on the right side.
 */
declare const picLeftOutlined: IconDefinition;

export default picLeftOutlined;