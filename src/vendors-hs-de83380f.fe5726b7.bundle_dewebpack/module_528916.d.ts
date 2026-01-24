/**
 * Question Circle Outlined Icon
 * An SVG icon component representing a question mark inside a circle
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes for the root element
 */
interface SvgRootAttrs {
  /** The coordinate system viewport for the SVG */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: 'svg';
    /** Root SVG element attributes */
    attrs: SvgRootAttrs;
    /** Child elements (paths) that make up the icon */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Question Circle Outlined icon definition
 * Displays a question mark symbol within a circular outline
 */
declare const QuestionCircleOutlined: IconDefinition;

export default QuestionCircleOutlined;