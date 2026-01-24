/**
 * Contacts icon component definition (outlined theme)
 * Represents a calendar with a user profile icon
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Child element in the icon structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Contacts icon definition for outlined theme
 * Displays a calendar interface with a user avatar icon in the center
 */
declare const contactsIcon: IconDefinition;

export default contactsIcon;