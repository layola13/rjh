/**
 * Icon definition for a project icon in filled theme.
 * This module exports an icon configuration object compatible with Ant Design's icon system.
 * 
 * @module ProjectFilledIcon
 */

/**
 * Represents the attributes for an SVG element or path element.
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** The path data for SVG path elements */
  d?: string;
}

/**
 * Represents a child element within an SVG structure.
 */
interface SvgChild {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes applied to this element */
  attrs: SvgAttributes;
  /** Nested children elements (optional) */
  children?: SvgChild[];
}

/**
 * Represents the icon structure containing SVG configuration.
 */
interface IconDefinition {
  /** The SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon object with metadata.
 */
interface IconObject {
  /** The SVG icon definition */
  icon: IconDefinition;
  /** The semantic name of the icon */
  name: string;
  /** The visual theme variant */
  theme: string;
}

/**
 * Project icon in filled theme style.
 * Displays a chart-like visualization representing project data or analytics.
 */
declare const projectFilledIcon: IconObject;

export default projectFilledIcon;