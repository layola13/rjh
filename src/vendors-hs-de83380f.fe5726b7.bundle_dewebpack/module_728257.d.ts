/**
 * Experiment icon component definition (filled theme)
 * SVG icon representing experimental/testing features
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox definition for coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
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
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface ExperimentIcon {
  /** Icon SVG structure and metadata */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Default export: Experiment icon configuration
 * Used for displaying experiment/testing related UI elements
 */
declare const experimentIcon: ExperimentIcon;

export default experimentIcon;