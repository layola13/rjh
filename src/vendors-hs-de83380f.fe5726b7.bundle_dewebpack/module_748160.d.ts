/**
 * CodeSandbox circle filled icon definition
 * Ant Design icon component configuration
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
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon element configuration
 */
interface IconElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: PathElement[];
}

/**
 * Ant Design icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * CodeSandbox circle filled icon
 * Represents the CodeSandbox logo in a circular filled style
 */
declare const CodeSandboxCircleFilledIcon: IconDefinition;

export default CodeSandboxCircleFilledIcon;