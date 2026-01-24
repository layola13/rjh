/**
 * Audio muted icon component definition
 * Represents a muted audio/microphone icon in outlined theme
 */
interface IconAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data for rendering shapes */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttributes;
  /** Nested child elements */
  children?: IconChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: IconAttributes;
    /** Child elements (defs, paths, etc.) */
    children: IconChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Audio muted icon definition
 * Displays a microphone with a slash through it, indicating muted audio state
 */
declare const audioMutedIcon: IconDefinition;

export default audioMutedIcon;