/**
 * Clock Circle Icon (Two-tone theme)
 * 
 * A two-tone clock icon component definition for Ant Design icon system.
 * Displays a circular clock face with hour and minute hands.
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /**
   * Icon render function
   * @param primaryColor - Primary theme color for the icon
   * @param secondaryColor - Secondary theme color for the icon
   * @returns SVG structure object
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;
  
  /** Icon identifier name */
  name: 'clock-circle';
  
  /** Icon theme variant */
  theme: 'twotone';
}

declare const clockCircleTwoTone: IconDefinition;

export default clockCircleTwoTone;