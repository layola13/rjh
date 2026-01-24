/**
 * Star icon component definition (filled theme)
 * Represents a filled star icon from Ant Design Icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the icon can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the star shape */
  d: string;
}

/**
 * Icon child element definition
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon component configuration
 */
interface StarFilledIcon {
  /** Icon SVG structure and metadata */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Filled star icon definition
 * Used for ratings, favorites, and highlighting important items
 */
declare const starFilledIcon: StarFilledIcon;

export default starFilledIcon;