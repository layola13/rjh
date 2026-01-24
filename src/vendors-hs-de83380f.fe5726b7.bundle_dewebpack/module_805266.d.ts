/**
 * Icon definition for Edit icon in TwoTone theme
 * @module EditTwoTone
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element representing a path
 */
interface SvgChild {
  /** Element tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary color for the main icon fill
   * @param secondaryColor - Secondary color for accent/highlight fills
   * @returns The complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: 'edit';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Edit icon in TwoTone theme
 * Represents a pencil/edit action with two-tone coloring
 */
declare const editTwoToneIcon: IconConfig;

export default editTwoToneIcon;