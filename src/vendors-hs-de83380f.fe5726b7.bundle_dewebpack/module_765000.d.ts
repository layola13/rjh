/**
 * Close Circle Icon Definition (Filled Theme)
 * 
 * A filled circular icon with a close (X) symbol in the center.
 * Commonly used for dismissing notifications, closing dialogs, or indicating removal actions.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element definition
 */
interface SvgPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgRootAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': 'evenodd';
  /** ViewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG icon structure definition
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgPathElement[];
}

/**
 * Icon definition interface
 * 
 * Represents a complete icon configuration including SVG structure,
 * semantic name, and visual theme variant.
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Semantic name identifier for the icon */
  name: string;
  /** Visual theme variant (filled, outlined, two-tone, etc.) */
  theme: 'filled' | 'outlined' | 'two-tone';
}

/**
 * Close Circle Icon (Filled)
 * 
 * Default export containing the complete icon definition for a filled close circle.
 * The icon depicts a solid circle with an X symbol centered inside.
 * 
 * @remarks
 * - Icon dimensions: 896x896 units (with 64px offset)
 * - Theme: Filled (solid background)
 * - Use cases: Dialog close buttons, tag removal, dismissal actions
 */
declare const closeCircleFilledIcon: IconDefinition;

export default closeCircleFilledIcon;