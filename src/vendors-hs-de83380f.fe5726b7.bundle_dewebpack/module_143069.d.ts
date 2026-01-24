/**
 * Check Circle Icon (Filled Theme)
 * 
 * A circular icon with a checkmark inside, commonly used to indicate
 * success, completion, or confirmation states in UI components.
 * 
 * @module CheckCircleFilledIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the canvas dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name for the child element */
  tag: 'path';
  /** Attributes for the path element */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) to render */
  children: SvgChild[];
}

/**
 * Complete icon object exported by the module
 */
interface CheckCircleFilledIcon {
  /** Icon SVG structure and configuration */
  icon: IconDefinition;
  /** Human-readable icon name identifier */
  name: 'check-circle';
  /** Visual theme variant of the icon */
  theme: 'filled';
}

/**
 * Default export containing the check-circle filled icon definition
 * 
 * This icon represents a successful operation or positive confirmation.
 * The icon follows Ant Design's icon specification format.
 * 
 * @example
 *