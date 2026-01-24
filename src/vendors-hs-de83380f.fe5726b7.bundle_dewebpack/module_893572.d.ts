/**
 * Apple icon component definition (filled theme)
 * Represents the Apple logo SVG icon configuration
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element configuration
 */
interface SvgPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates (minX minY width height) */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG icon configuration structure
 */
interface SvgIconConfig {
  /** Root SVG tag name */
  tag: 'svg';
  /** Root SVG element attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgPathElement[];
}

/**
 * Icon component definition
 * Contains all metadata and configuration for rendering an icon
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Apple icon (filled theme) - Default export
 * Pre-configured Apple logo icon suitable for use in icon libraries
 */
declare const appleFilledIcon: IconDefinition;

export default appleFilledIcon;