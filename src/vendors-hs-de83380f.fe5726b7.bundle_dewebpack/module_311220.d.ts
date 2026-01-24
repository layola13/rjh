/**
 * UserAdd icon component definition
 * Ant Design outlined user-add icon
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: 'user-add';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * UserAdd icon - Represents adding a new user
 * @remarks
 * This icon depicts a user silhouette with a plus symbol,
 * commonly used for user registration or adding contacts
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;