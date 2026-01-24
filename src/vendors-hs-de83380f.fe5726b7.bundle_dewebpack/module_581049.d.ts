/**
 * Deployment Unit Icon Component Type Definition
 * Represents an Ant Design outlined deployment unit icon
 */

/**
 * SVG Path Attributes Interface
 * Defines the structure for SVG path element attributes
 */
interface SVGPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG Path Element Interface
 * Represents a single path element within an SVG
 */
interface SVGPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SVGPathAttrs;
}

/**
 * SVG Root Attributes Interface
 * Defines attributes for the root SVG element
 */
interface SVGRootAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG Icon Structure Interface
 * Describes the complete structure of an SVG icon
 */
interface SVGIconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** Root SVG element attributes */
  attrs: SVGRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SVGPathElement[];
}

/**
 * Icon Definition Interface
 * Complete icon configuration object used by Ant Design
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SVGIconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Deployment Unit Icon
 * Default export representing the deployment unit icon in outlined theme
 */
declare const deploymentUnitIcon: IconDefinition;

export default deploymentUnitIcon;