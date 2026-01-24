/**
 * Ant Design Icon: Minus Square (Filled Theme)
 * 
 * A filled square icon with a minus/horizontal line symbol, 
 * commonly used for collapsing content or removing items.
 * 
 * @module MinusSquareFilled
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested children elements (optional) */
  children?: IconChild[];
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SVGAttributes;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Complete icon descriptor with metadata
 */
interface IconDescriptor {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Minus Square Filled Icon
 * 
 * Represents a square with a minus symbol inside, using filled style.
 * Viewbox: 64 64 896 896 (standard Ant Design icon dimensions)
 */
declare const MinusSquareFilled: IconDescriptor;

export default MinusSquareFilled;