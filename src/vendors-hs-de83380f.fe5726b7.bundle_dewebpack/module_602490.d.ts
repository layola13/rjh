/**
 * Transaction icon definition (outlined theme)
 * Ant Design Icon - Transaction symbol with refresh arrows
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG root attributes interface
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
    /** Root SVG tag */
    tag: 'svg';
    /** Root element attributes */
    attrs: SvgRootAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: 'transaction';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Transaction icon - Represents financial transactions or exchange operations
 * Theme: outlined
 * @default TransactionOutlined icon configuration
 */
declare const transactionIcon: IconDefinition;

export default transactionIcon;