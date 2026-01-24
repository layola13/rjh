/**
 * Delete icon component definition (filled theme)
 * Ant Design Icons - Delete Filled
 */

/**
 * SVG attributes interface for the root element
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
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
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Delete icon (filled theme) - Ant Design Icons
 * 
 * Represents a trash/delete action with a filled style.
 * Used for destructive actions like removing items.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896
 * - Theme: filled
 * - Name: delete
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;