/**
 * Cloud Download Icon Component Definition
 * Ant Design icon for cloud download functionality
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Root SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Cloud download icon definition
 * Represents a cloud with downward arrow, commonly used for download actions
 */
declare const cloudDownloadIcon: IconDefinition;

export default cloudDownloadIcon;