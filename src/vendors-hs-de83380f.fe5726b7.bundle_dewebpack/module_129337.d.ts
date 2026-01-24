/**
 * Moon icon component configuration for Ant Design Icons
 * Represents a crescent moon shape, typically used for dark mode toggles
 */
interface IconNode {
  /** SVG element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: Record<string, string | number>;
  /** Child SVG elements */
  children?: IconNode[];
}

/**
 * Icon definition structure conforming to Ant Design icon specification
 */
interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
  /** Root SVG icon structure */
  icon: IconNode;
}

/**
 * Moon icon definition
 * A crescent moon icon commonly used for dark/night mode UI controls
 */
declare const MoonOutlined: IconDefinition;

export default MoonOutlined;