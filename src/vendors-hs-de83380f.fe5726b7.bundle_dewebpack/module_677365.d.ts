/**
 * Behance Square outlined icon definition
 * 
 * @remarks
 * This module exports the SVG icon configuration for the Behance Square icon
 * in the outlined theme variant. It contains the SVG path data and metadata
 * needed to render the icon.
 * 
 * @packageDocumentation
 */

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the coordinate system */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** HTML/SVG tag name for the root element */
  tag: string;
  /** Root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon object with metadata
 */
interface Icon {
  /** SVG icon configuration */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Behance Square icon definition in outlined theme
 * 
 * @remarks
 * This icon represents the Behance social media platform logo in a square format.
 * The icon uses a single path element to define the complete shape including:
 * - Square border frame
 * - Behance 'B' letter
 * - Behance 'e' letter with accent
 * 
 * @example
 *