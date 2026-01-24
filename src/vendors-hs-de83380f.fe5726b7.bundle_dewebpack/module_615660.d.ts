/**
 * Slack Circle filled icon definition
 * @description SVG icon data structure for Ant Design's SlackCircleFilled icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Indicates whether the element can be focused */
  focusable: string;
}

/**
 * Path element attributes interface
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
  /** Root SVG element tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Slack Circle filled icon configuration
 * Represents the Slack logo within a filled circle
 */
declare const slackCircleFilledIcon: IconConfig;

export default slackCircleFilledIcon;