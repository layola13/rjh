/**
 * Ant Design Icon: Skin (Filled Theme)
 * 
 * This module exports an icon definition object compatible with Ant Design's icon system.
 * The icon represents a skin/theme customization symbol.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Root SVG icon structure
 */
interface SvgIconStructure {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon definition object structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIconStructure;
  /** Icon identifier name */
  name: 'skin';
  /** Icon visual theme variant */
  theme: 'filled';
}

/**
 * Skin icon definition (filled theme)
 * 
 * Represents a customization/theme icon with a filled style.
 * ViewBox: 64 64 896 896 (standard Ant Design icon coordinate system)
 */
declare const skinFilledIcon: IconDefinition;

export default skinFilledIcon;