/**
 * HarmonyOS outlined icon definition
 * @module IconDefinition
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element configuration
 */
interface PathElement {
  /** Element tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': 'evenodd';
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG icon element structure
 */
interface IconElement {
  /** Element tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Icon definition structure for Ant Design icons
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * HarmonyOS outlined icon definition
 * Contains the complete SVG structure for rendering the HarmonyOS logo
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;