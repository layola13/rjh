/**
 * Minus Circle Icon (Outlined Theme)
 * 
 * A circular icon with a minus/subtract symbol in the center.
 * Commonly used for remove, collapse, or minimize actions.
 */

/**
 * SVG attributes interface for path elements
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
 * Root SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** Root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export object
 */
interface IconExport {
  /** Icon SVG structure and metadata */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Minus Circle Icon - Outlined variant
 * 
 * @remarks
 * This icon consists of:
 * - A circular outline (372px radius)
 * - A horizontal minus line in the center (368px width, 48px height)
 * 
 * @example
 *