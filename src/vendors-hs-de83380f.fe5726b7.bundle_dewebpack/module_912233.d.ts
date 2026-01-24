/**
 * Sound icon component definition for Ant Design Icons
 * @module SoundTwoTone
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color */
  fill?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Icon tag type */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements of the icon */
  children: SvgChild[];
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /**
   * Generate icon SVG structure
   * @param primaryColor - Primary color for the icon outline
   * @param secondaryColor - Secondary color for the icon fill (twotone effect)
   * @returns Icon definition object containing SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Sound (Speaker) icon in twotone theme
 * Represents audio/sound volume control
 */
declare const SoundTwoToneIcon: IconConfig;

export default SoundTwoToneIcon;