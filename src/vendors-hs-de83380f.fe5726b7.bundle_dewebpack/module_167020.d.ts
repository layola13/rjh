/**
 * SVG icon definition for a "snippets" icon in filled theme.
 * Represents a document or code snippet interface element.
 * @module IconSnippetsFilled
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes | Record<string, unknown>;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** SVG tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Snippets icon in filled theme style.
 * Displays a layered document icon commonly used for code snippets or file operations.
 */
declare const snippetsFilledIcon: IconDefinition;

export default snippetsFilledIcon;