/**
 * WhatsApp icon definition for Ant Design Icons
 * @module WhatsAppOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG element node
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs | PathAttrs | Record<string, never>;
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Icon configuration object */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child SVG elements */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * WhatsApp outlined icon definition
 * Contains SVG path data for the WhatsApp logo in outlined style
 */
declare const whatsAppOutlinedIcon: IconDefinition;

export default whatsAppOutlinedIcon;