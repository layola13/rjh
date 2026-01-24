/**
 * OpenAI icon component definition (Ant Design Icons style)
 * @module OpenAIFilledIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG path rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * OpenAI filled icon definition
 * Used for rendering the OpenAI logo in filled style
 */
declare const OpenAIFilledIcon: IconDefinition;

export default OpenAIFilledIcon;