/**
 * SVG icon attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure interface
 */
interface SvgIcon {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (typically path elements) */
  children: SvgChild[];
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /**
   * Generate SVG icon object
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
   * @returns SVG icon structure
   */
  icon(primaryColor: string, secondaryColor: string): SvgIcon;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant (e.g., 'twotone', 'outlined', 'filled') */
  theme: string;
}

/**
 * File text icon component (twotone variant)
 * Represents a document/file with text lines
 */
declare const fileTextTwoTone: IconConfig;

export default fileTextTwoTone;