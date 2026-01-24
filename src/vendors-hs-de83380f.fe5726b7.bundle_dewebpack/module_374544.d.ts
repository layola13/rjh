/**
 * Linux icon component definition for Ant Design Icons
 * @module LinuxOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface LinuxIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'linux';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Linux logo icon in outlined style
 * Features the Tux penguin mascot design
 * 
 * @remarks
 * This icon is part of the Ant Design icon library and represents
 * the Linux operating system. It uses a single path element with
 * detailed coordinates to render the iconic Tux penguin.
 * 
 * @example
 *