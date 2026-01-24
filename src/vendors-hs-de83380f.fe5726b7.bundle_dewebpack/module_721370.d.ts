/**
 * Ant Design Cloud icon component definition
 * Icon representing cloud functionality in outlined theme
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
  /** SVG viewBox coordinates and dimensions */
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
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface AntCloudIcon {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Unique identifier for the icon */
  name: string;
  /** Visual style theme of the icon */
  theme: string;
}

/**
 * Ant Design Cloud Icon (Outlined)
 * 
 * Default export containing the complete definition for a cloud icon
 * in Ant Design's outlined theme style.
 */
declare const antCloudIcon: AntCloudIcon;

export default antCloudIcon;