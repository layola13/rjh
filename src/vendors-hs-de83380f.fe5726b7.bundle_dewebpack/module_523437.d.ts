/**
 * Fund icon component definition (filled theme)
 * Represents a financial chart or fund performance visualization
 */
interface IconAttrs {
  /** SVG viewBox coordinates defining the visible area */
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
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon metadata
 */
interface FundIconConfig {
  /** Icon SVG structure and configuration */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Fund icon (filled theme) - represents financial charts and fund performance
 * @public
 */
declare const fundFilledIcon: FundIconConfig;

export default fundFilledIcon;