/**
 * Icon component configuration for a two-tone audio/microphone icon
 * @module AudioIconDefinition
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon function parameters
 */
interface IconColors {
  /** Primary color for the icon */
  primaryColor: string;
  /** Secondary color for the icon (used in two-tone theme) */
  secondaryColor: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths
   * @returns SVG node structure
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Audio/Microphone icon definition with two-tone theme
 * Represents a microphone symbol commonly used for audio recording or voice input
 */
declare const AudioIconDefinition: IconDefinition;

export default AudioIconDefinition;