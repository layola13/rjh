/**
 * Icon definition for the "bars" icon in outlined theme
 * Represents a list or menu with three horizontal bars and circular bullets
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Prevents the SVG from receiving focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon child element definition
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Nested child elements */
  children?: IconChild[];
}

/**
 * Icon structure definition
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Bars icon definition - A list/menu icon with horizontal lines and bullet points
 * Used for navigation menus, list views, or outline displays
 */
declare const BarsOutlined: IconDefinition;

export default BarsOutlined;