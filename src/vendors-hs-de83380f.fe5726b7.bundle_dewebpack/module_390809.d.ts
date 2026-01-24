/**
 * Windows filled icon component definition
 * Represents a Windows logo icon in the Ant Design icon library
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the icon can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
export interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
export interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** SVG element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

/**
 * Complete icon configuration
 */
export interface WindowsFilledIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Windows filled icon configuration
 * A filled Windows logo icon with four quadrants
 */
declare const windowsFilledIcon: WindowsFilledIconConfig;

export default windowsFilledIcon;