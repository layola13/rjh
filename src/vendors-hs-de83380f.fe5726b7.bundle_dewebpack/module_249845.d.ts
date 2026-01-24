/**
 * Close Square Icon (Outlined Theme)
 * 
 * A square icon with a close/cross symbol inside.
 * Part of an icon library, typically used for dismissing or closing UI elements.
 * 
 * @module CloseSquareOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes for the root icon
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root tag name */
    tag: string;
    /** Root element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Human-readable icon name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Close Square Outlined Icon
 * 
 * Default export containing the complete icon definition.
 * Renders a square border with a centered X/cross symbol.
 */
declare const CloseSquareOutlined: IconDefinition;

export default CloseSquareOutlined;