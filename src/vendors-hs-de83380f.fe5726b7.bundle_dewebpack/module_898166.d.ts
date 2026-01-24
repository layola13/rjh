/**
 * Eye Invisible Icon Component Definition
 * A filled theme icon representing a hidden/invisible eye, commonly used for password visibility toggles
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG element node structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes;
  /** Optional child elements */
  children?: SvgElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child SVG elements (paths, groups, etc.) */
    children: SvgElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Eye Invisible Icon - Filled Theme
 * 
 * Represents a crossed-out eye icon used to indicate hidden content,
 * typically for password input fields or sensitive information toggles.
 * 
 * @remarks
 * This icon consists of two path elements:
 * - A diagonal line crossing through an eye shape
 * - The eye outline with visibility obstruction indicator
 * 
 * @example
 *