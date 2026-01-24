/**
 * Safety Certificate Icon Configuration
 * 
 * Represents an outlined safety certificate icon from Ant Design icon library.
 * This icon is typically used to indicate security, certification, or verification status.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** Icon visual configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: 'safety-certificate';
  /** Icon style theme */
  theme: 'outlined';
}

/**
 * Safety Certificate icon definition
 * 
 * An outlined icon depicting a certificate with a checkmark, commonly used
 * to represent security certifications, verified status, or safety compliance.
 * 
 * @remarks
 * This icon follows Ant Design's icon specification with a 896x896 viewBox.
 * The icon consists of a certificate shield outline with a verification checkmark inside.
 * 
 * @example
 *