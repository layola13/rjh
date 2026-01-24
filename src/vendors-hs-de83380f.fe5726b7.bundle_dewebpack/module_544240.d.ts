/**
 * Interaction icon component definition (filled theme)
 * Represents an interaction or exchange symbol with bidirectional arrows
 */
interface IconAttrs {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG is focusable via keyboard navigation */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** SVG icon definition with structure and attributes */
  icon: IconDefinition;
  /** Semantic name of the icon */
  name: 'interaction';
  /** Visual theme variant */
  theme: 'filled';
}

/**
 * Interaction icon - filled theme variant
 * Displays a bidirectional exchange symbol within a square border
 */
declare const interactionIcon: IconConfig;

export default interactionIcon;