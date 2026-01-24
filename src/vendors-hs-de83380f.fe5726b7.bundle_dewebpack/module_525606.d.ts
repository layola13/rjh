/**
 * Signal icon component configuration (filled theme)
 * Represents a signal strength indicator with three vertical bars of varying heights
 */
interface IconNode {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: Record<string, string>;
  /** Child nodes (optional) */
  children?: IconNode[];
}

/**
 * Icon definition structure for Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Signal filled icon definition
 * Displays three vertical bars representing signal strength levels
 */
declare const SignalFilledIcon: IconDefinition;

export default SignalFilledIcon;

export {
  IconNode,
  IconDefinition
};