/**
 * Twitter Circle Icon (Filled)
 * 
 * A filled circular Twitter/X icon component definition for Ant Design icon system.
 * This icon represents the Twitter logo enclosed in a circle with a filled background.
 * 
 * @module TwitterCircleFilled
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML/SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SVGAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SVGChild[];
  };
  /** Icon identifier name */
  name: 'twitter-circle';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Twitter Circle Filled Icon
 * 
 * Default export containing the complete icon definition with SVG markup,
 * representing a filled Twitter logo in a circular container.
 */
declare const twitterCircleFilledIcon: IconDefinition;

export default twitterCircleFilledIcon;