/**
 * Ant Design Icons - Merge Outlined Icon
 * 
 * SVG icon definition for a merge icon in outlined theme.
 * Typically used to represent merging operations in version control or data flow diagrams.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule'?: string;
  /** ViewBox dimensions for SVG coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** Root SVG attributes */
    attrs: SvgAttrs;
    /** Child SVG elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Merge icon definition (outlined theme)
 * 
 * Represents a merge operation with circular nodes and connecting paths.
 * ViewBox: 64 64 896 896 (standard Ant Design icon canvas)
 */
declare const MergeOutlined: IconDefinition;

export default MergeOutlined;