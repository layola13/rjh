/**
 * Setting icon component configuration for Ant Design Icons
 * @module SettingTwoTone
 */

/**
 * Icon render function type
 * @param primaryColor - The primary color for the icon paths
 * @param secondaryColor - The secondary color for filled paths
 * @returns SVG icon configuration object
 */
type IconRenderFunction = (
  primaryColor: string,
  secondaryColor: string
) => IconDefinition;

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) configuration
 */
interface SvgChild {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure returned by the icon render function
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function that generates SVG definition
   * @param primaryColor - Primary color for main icon paths
   * @param secondaryColor - Secondary color for background/fill paths
   * @returns Complete icon definition with SVG structure
   */
  icon: IconRenderFunction;
  
  /** Icon identifier name */
  name: "setting";
  
  /** Icon theme variant */
  theme: "twotone";
}

/**
 * Setting icon configuration (TwoTone theme)
 * Represents a gear/cog settings icon with two-tone coloring
 */
declare const settingTwoTone: IconConfig;

export default settingTwoTone;