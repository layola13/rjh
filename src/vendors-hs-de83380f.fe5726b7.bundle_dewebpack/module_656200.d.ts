/**
 * SVG icon definition for the "meh" (neutral face) outlined icon
 * Represents a circular face with neutral expression and straight mouth
 */
interface IconAttrs {
  /** SVG viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape to be drawn */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG structure and content */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Meh (neutral face) icon - outlined theme
 * 
 * A circular emoji-style icon depicting a neutral facial expression
 * with two dots for eyes and a straight horizontal line for the mouth.
 * 
 * @remarks
 * This icon is typically used to represent:
 * - Neutral or indifferent emotions
 * - Lack of strong opinion
 * - Mediocre ratings or feedback
 * 
 * @example
 *