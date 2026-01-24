/**
 * Save icon definition (filled theme)
 * 
 * Represents a save/floppy disk icon used in Ant Design icon library.
 * This is a filled variant of the save icon.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the icon can receive focus */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface SaveIconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Save icon filled theme export
 * 
 * @remarks
 * This icon represents the save action, typically used in toolbars and action buttons.
 * The filled theme provides a solid, prominent appearance.
 */
declare const saveIconFilled: SaveIconConfig;

export default saveIconFilled;