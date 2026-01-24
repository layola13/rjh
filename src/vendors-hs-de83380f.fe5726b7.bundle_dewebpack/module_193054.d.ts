/**
 * Audio icon component definition (filled theme)
 * Represents a microphone symbol commonly used for audio-related features
 */

/**
 * SVG attributes for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the drawable area */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon visual representation */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Audio icon definition with filled theme
 * Contains SVG path data for a microphone icon
 */
declare const AudioFilledIcon: IconDefinition;

export default AudioFilledIcon;