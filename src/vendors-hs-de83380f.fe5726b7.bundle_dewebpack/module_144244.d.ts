/**
 * Exclamation Circle Filled Icon
 * 
 * A filled circle icon with an exclamation mark, typically used for warnings or important information.
 * 
 * @module ExclamationCircleFilledIcon
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
  /** Defines the coordinate system and aspect ratio for the SVG */
  viewBox: string;
  /** Indicates whether the element can receive focus */
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
 * Icon configuration structure
 */
interface IconDefinition {
  /** Root SVG element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface IconObject {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Human-readable icon name */
  name: string;
  /** Icon theme variant (filled, outlined, etc.) */
  theme: string;
}

/**
 * Exclamation Circle Filled Icon
 * 
 * A circular warning icon with an exclamation mark in the center.
 * - Circle dimensions: 896x896 viewBox
 * - Theme: Filled
 * - Use case: Warnings, alerts, important notices
 */
declare const exclamationCircleFilledIcon: IconObject;

export default exclamationCircleFilledIcon;