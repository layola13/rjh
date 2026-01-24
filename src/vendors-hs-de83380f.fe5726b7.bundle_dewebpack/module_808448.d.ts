/**
 * Select icon component definition (Outlined theme)
 * Ant Design Icons - Select icon with outlined style
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon object structure
 */
interface SelectIconOutlined {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Select icon (Outlined theme) - represents selection or external link action
 * Typically used for indicating selectable items or opening in new window
 */
declare const selectIconOutlined: SelectIconOutlined;

export default selectIconOutlined;