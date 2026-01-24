/**
 * Pull Request icon component definition
 * Ant Design icon for representing pull request operations in version control systems
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Defines the viewport dimensions for the SVG */
  viewBox: string;
  /** Controls whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements array (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Ant Design icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Pull Request icon definition
 * Represents branching and merging operations in git workflows
 * @default outlined theme, 896x896 viewBox
 */
declare const pullRequestIcon: IconDefinition;

export default pullRequestIcon;