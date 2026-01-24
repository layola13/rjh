/**
 * Setting icon component definition for Ant Design Icons
 * Provides a gear/cog icon typically used for settings or configuration
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
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
 * Icon configuration structure
 */
interface IconNode {
  /** SVG root tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Setting (gear) icon definition
 * Theme: outlined
 * Displays a settings cog/gear icon at 896x896 viewBox
 */
declare const settingIcon: IconDefinition;

export default settingIcon;