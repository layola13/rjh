/**
 * JPG file icon component definition for Ant Design icon system.
 * Represents a document icon with "JPG" text overlay.
 * @module FileJpgOutlined
 */

export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Accessibility attribute to prevent focus on decorative SVG */
  focusable: string;
}

export interface PathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

export interface IconDefinition {
  /** Root SVG element tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconNode[];
}

/**
 * Complete icon configuration object
 */
export interface AntDesignIconConfig {
  /** Icon visual definition including SVG structure */
  icon: IconDefinition;
  /** Unique identifier for the icon */
  name: string;
  /** Visual style variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * File JPG icon configuration in Ant Design outlined style.
 * Used to represent JPG image files in file management UIs.
 */
declare const fileJpgOutlinedIcon: AntDesignIconConfig;

export default fileJpgOutlinedIcon;