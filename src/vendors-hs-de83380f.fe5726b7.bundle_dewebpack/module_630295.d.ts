/**
 * Binary field icon component definition for Ant Design Icons
 * Represents a "1" character icon in outlined theme
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, unknown>;
  /** Nested child elements */
  children?: SVGChildElement[];
}

/**
 * Icon definition structure for Ant Design icon system
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SVGAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SVGChildElement[];
  };
  /** Unique icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Field Binary Icon - Outlined theme
 * 
 * An icon representing a binary field or the number "1" character,
 * commonly used in form fields or data type indicators.
 * 
 * @remarks
 * This icon follows Ant Design's icon specification with:
 * - Standard 896x896 viewBox (64-960 coordinate space)
 * - Outlined visual style
 * - Two main path elements forming the "1" glyph
 */
declare const FieldBinaryOutlined: IconDefinition;

export default FieldBinaryOutlined;