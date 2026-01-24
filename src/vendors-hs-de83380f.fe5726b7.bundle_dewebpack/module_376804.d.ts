/**
 * Info Circle outlined icon definition
 * Ant Design icon component configuration
 */

/**
 * SVG attributes interface for icon elements
 */
interface IconSvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Icon child element (path) definition
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: IconSvgAttrs;
  /** Array of child path elements that compose the icon */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure and rendering configuration */
  icon: IconStructure;
  /** Semantic name of the icon */
  name: string;
  /** Icon theme variant (outlined, filled, or two-tone) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Info Circle icon (outlined theme)
 * Displays a circular information symbol with an 'i' character
 */
declare const InfoCircleOutlined: IconDefinition;

export default InfoCircleOutlined;