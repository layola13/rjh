/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  viewBox?: string;
  focusable?: string;
  [key: string]: string | undefined;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  d: string;
  [key: string]: string | undefined;
}

/**
 * SVG child element (path, circle, etc.)
 */
interface SvgChildElement {
  tag: string;
  attrs: PathAttrs | Record<string, string>;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Account Book filled icon component
 * 
 * @description A calendar-style account book icon with a "Y" symbol representing financial records
 * @example
 *