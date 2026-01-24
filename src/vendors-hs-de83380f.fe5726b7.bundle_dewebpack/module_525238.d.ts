/**
 * Ant Design Icon: Holder (Outlined)
 * 
 * A drag handle icon component configuration for displaying six dots in a 2x3 grid pattern.
 * Commonly used to indicate draggable areas in user interfaces.
 */

/**
 * SVG attributes for the icon's root element
 */
interface IconSVGAttributes {
  /** The viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG path elements
 */
interface PathAttributes {
  /** The SVG path data defining the shape */
  d: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface IconChild {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes to apply to the element */
  attrs: PathAttributes;
}

/**
 * Configuration structure for the icon's SVG element
 */
interface IconConfig {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes to apply to the SVG element */
  attrs: IconSVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition structure
 */
interface HolderIconDefinition {
  /** The SVG icon configuration */
  icon: IconConfig;
  /** The icon's identifier name */
  name: string;
  /** The icon's visual theme variant */
  theme: string;
}

/**
 * Holder icon definition - represents a drag handle with six dots
 * 
 * @remarks
 * This icon is typically used in sortable lists, drag-and-drop interfaces,
 * and other contexts where users need a visual affordance for dragging elements.
 * 
 * The icon consists of six circular dots arranged in a 2x3 grid pattern,
 * positioned at coordinates that create a balanced, centered appearance.
 */
declare const holderIcon: HolderIconDefinition;

export default holderIcon;