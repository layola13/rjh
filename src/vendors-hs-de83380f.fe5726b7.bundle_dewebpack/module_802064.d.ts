/**
 * Cloud Sync icon definition for Ant Design Icons
 * @module CloudSyncOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Cloud Sync outlined icon definition
 * Represents cloud synchronization functionality with bidirectional arrows
 */
declare const CloudSyncOutlinedIcon: IconDefinition;

export default CloudSyncOutlinedIcon;