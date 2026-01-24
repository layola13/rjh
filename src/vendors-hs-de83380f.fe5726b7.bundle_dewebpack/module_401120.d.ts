/**
 * Bilibili icon component definition for Ant Design Icons
 * Represents the Bilibili brand logo as an outlined SVG icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG path element configuration
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG fill rule for path rendering */
  'fill-rule': 'evenodd';
  /** SVG viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Accessibility attribute controlling focus behavior */
  focusable: 'false' | 'true';
}

/**
 * SVG icon structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: PathElement[];
}

/**
 * Complete icon component configuration
 */
interface BilibiliIcon {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'bilibili';
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Bilibili icon definition exported as default
 * 
 * This icon represents the Bilibili brand logo in outlined style.
 * Compatible with Ant Design Icons system.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896 (standard Ant Design icon dimensions)
 * - Theme: outlined (single color stroke-based rendering)
 * - Fill rule: evenodd (determines path filling for overlapping regions)
 */
declare const bilibiliIcon: BilibiliIcon;

export default bilibiliIcon;