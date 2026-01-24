/**
 * Gift icon component definition (filled theme)
 * Ant Design Icons - Gift Filled
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface Icon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Gift icon (filled theme) - represents gift or present
 * Used for e-commerce, rewards, promotions, etc.
 */
declare const giftFilledIcon: Icon;

export default giftFilledIcon;