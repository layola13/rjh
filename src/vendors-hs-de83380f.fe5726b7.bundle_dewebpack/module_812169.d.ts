/**
 * Ant Design Icon: Skin (Outlined)
 * 
 * Represents a skin/theme icon component definition compatible with Ant Design's icon system.
 * This icon is typically used for theme switching or appearance customization features.
 */

/**
 * SVG attributes interface for the icon's root element
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG path elements
 */
interface PathAttributes {
  /** The SVG path data string defining the shape */
  d: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChildElement {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes applied to this element */
  attrs: PathAttributes;
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** The icon's SVG structure */
  icon: {
    /** The root SVG tag */
    tag: string;
    /** Attributes for the SVG element */
    attrs: SvgAttributes;
    /** Child elements (paths, groups, etc.) */
    children: SvgChildElement[];
  };
  /** The icon's identifier name */
  name: string;
  /** The icon's visual theme variant */
  theme: string;
}

/**
 * Skin icon definition (outlined theme)
 * 
 * This icon represents a clothing/skin item and is commonly used for:
 * - Theme customization interfaces
 * - Appearance settings
 * - Skin selection in applications
 */
declare const SkinOutlined: IconDefinition;

export default SkinOutlined;