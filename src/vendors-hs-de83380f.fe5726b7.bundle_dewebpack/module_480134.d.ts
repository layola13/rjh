/**
 * SVG icon definition for the Mac Command symbol (⌘)
 * Represents the filled variant of the mac-command icon
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG should be focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * Represents a single SVG element node
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements */
  children?: SvgNode[];
}

/**
 * Icon definition structure following Ant Design icon specification
 */
interface IconDefinition {
  /** Root SVG configuration */
  icon: {
    /** Root element tag (always 'svg') */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** ViewBox coordinates for the icon canvas */
      viewBox: string;
      /** Focus behavior configuration */
      focusable: string;
    };
    /** Child SVG elements including paths and definitions */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Mac Command (⌘) icon definition
 * 
 * A filled icon representing the Mac Command key symbol, commonly used in
 * macOS interfaces to indicate keyboard shortcuts.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896 (standard Ant Design icon canvas)
 * - Theme: filled
 * - Contains 4 path elements forming the complete command symbol
 */
declare const macCommandIcon: IconDefinition;

export default macCommandIcon;