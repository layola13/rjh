/**
 * Unlock icon component definition for Ant Design icon system.
 * Represents an unlocked padlock symbol in outlined theme.
 */

/**
 * SVG attributes for the root element.
 */
interface SvgAttributes {
  /** The viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG path elements.
 */
interface PathAttributes {
  /** The path data defining the shape to be drawn */
  d: string;
}

/**
 * Represents a child element within the SVG structure.
 */
interface SvgChildElement {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes applied to the element */
  attrs: PathAttributes;
}

/**
 * Icon structure defining the complete SVG representation.
 */
interface IconDefinition {
  /** The root SVG element tag */
  tag: string;
  /** Attributes for the SVG element */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes) that compose the icon */
  children: SvgChildElement[];
}

/**
 * Complete icon export structure for Ant Design icon library.
 */
interface UnlockIconExport {
  /** The SVG icon definition */
  icon: IconDefinition;
  /** The semantic name of the icon */
  name: string;
  /** The visual theme/style variant */
  theme: string;
}

/**
 * Default export: Unlock icon in outlined theme.
 * Used to represent unlocked state, security settings, or permission access.
 */
declare const unlockIcon: UnlockIconExport;

export default unlockIcon;