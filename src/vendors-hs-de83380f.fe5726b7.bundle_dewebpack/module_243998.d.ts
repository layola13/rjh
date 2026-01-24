/**
 * Ant Design Icon: Vertical Right (Outlined)
 * A vertical right arrow icon component definition for Ant Design icon system.
 */

/**
 * SVG attributes configuration for the icon
 */
interface IconSvgAttrs {
  /** SVG viewBox coordinates defining the canvas space */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG path definitions
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Path-specific attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure defining the SVG element and its children
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconSvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** SVG icon structure and configuration */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant (outlined, filled, two-tone) */
  theme: string;
}

/**
 * Vertical Right icon definition for Ant Design icon library.
 * Displays a vertical bar with a right-pointing arrow, commonly used
 * for collapse/expand actions or navigation controls.
 */
declare const verticalRightOutlined: IconDefinition;

export default verticalRightOutlined;