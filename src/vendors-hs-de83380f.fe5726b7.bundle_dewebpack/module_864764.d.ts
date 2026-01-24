/**
 * Robot icon component definition for Ant Design Icons
 * @module RobotFilledIcon
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  viewBox?: string;
  focusable?: string;
  d?: string;
}

/**
 * Icon tree node structure
 */
interface IconNode {
  tag: string;
  attrs: SVGAttributes;
  children?: IconNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * Icon theme variant
   */
  theme: 'filled' | 'outlined' | 'twotone';
  
  /**
   * SVG icon tree structure
   */
  icon: IconNode;
}

/**
 * Robot filled icon definition
 * Represents a robot character with a display screen
 */
declare const RobotFilledIcon: IconDefinition;

export default RobotFilledIcon;