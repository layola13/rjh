/**
 * CodeSandbox icon component definition (outlined theme)
 * Represents a 3D box/cube icon commonly used for CodeSandbox branding
 */

/**
 * SVG attributes interface for icon elements
 */
interface IconSvgAttributes {
  /** SVG viewBox coordinates defining the viewport */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface IconPathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * Child element definition for icon structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconPathAttributes;
}

/**
 * Icon definition structure matching Ant Design icon format
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: {
    /** Root element tag type */
    tag: string;
    /** SVG element attributes */
    attrs: IconSvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: IconChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * CodeSandbox outlined icon definition
 * A 3D cube icon representing the CodeSandbox platform
 */
declare const CodeSandboxOutlined: IconDefinition;

export default CodeSandboxOutlined;