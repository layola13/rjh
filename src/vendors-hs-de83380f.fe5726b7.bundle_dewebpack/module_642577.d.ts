/**
 * Audit icon definition for outlined theme
 * Represents an audit or document review symbol with a magnifying glass
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
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
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Audit icon - Outlined theme
 * 
 * Visual representation of a document with audit/review indicators.
 * Commonly used for audit logs, document reviews, or inspection features.
 * 
 * @remarks
 * This icon includes:
 * - Document lines representing text content
 * - Magnifying glass symbol indicating review/audit action
 * 
 * @example
 *