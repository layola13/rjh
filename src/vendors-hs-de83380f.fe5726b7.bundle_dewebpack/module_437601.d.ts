/**
 * Twitch filled icon definition for Ant Design Icons
 * @module TwitchFilledIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule'?: string;
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Focusable state for accessibility */
  focusable?: string;
  /** Filter units type */
  filterUnits?: string;
  /** Element height */
  height?: string;
  /** Element width */
  width?: string;
  /** Element ID */
  id?: string;
  /** X coordinate */
  x?: string;
  /** Y coordinate */
  y?: string;
  /** Delta Y offset */
  dy?: string;
  /** Input source reference */
  in?: string;
  /** Result identifier */
  result?: string;
  /** Standard deviation for blur */
  stdDeviation?: string;
  /** Color matrix values */
  values?: string;
  /** SVG transform */
  transform?: string;
  /** SVG path data */
  d?: string;
  /** Filter URL reference */
  filter?: string;
}

/**
 * SVG element node structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child SVG elements */
    children: SvgElement[];
  };
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Twitch platform filled icon configuration
 * Represents the Twitch logo in filled style with shadow effects
 */
declare const TwitchFilledIcon: IconDefinition;

export default TwitchFilledIcon;