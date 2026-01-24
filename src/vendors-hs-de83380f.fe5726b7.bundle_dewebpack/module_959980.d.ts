/**
 * Ant Design Icon: Cloud Server (Outlined)
 * Represents a cloud server infrastructure icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element child node
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Root SVG element attributes
 */
interface SVGAttributes {
  /** SVG viewport coordinates and dimensions */
  viewBox: string;
  /** Accessibility attribute to control focus behavior */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root element tag name */
    tag: string;
    /** Root SVG attributes */
    attrs: SVGAttributes;
    /** Child SVG elements (paths, shapes, etc.) */
    children: SVGChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Cloud Server Icon Definition
 * 
 * A cloud server icon showing a server cabinet within a cloud shape.
 * Commonly used in cloud computing, hosting, and infrastructure UIs.
 * 
 * @remarks
 * This icon uses the "outlined" theme with three path elements:
 * - Main server cabinet body
 * - Server indicator lights/buttons
 * - Surrounding cloud shape
 */
declare const CloudServerIcon: IconDefinition;

export default CloudServerIcon;