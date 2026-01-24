/**
 * Paper clip icon definition for Ant Design icon system
 * Represents a paperclip symbol commonly used for attachments
 */
interface IconAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface PaperClipIcon {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Paper clip icon exported as default
 * Used for representing attachment functionality in UI
 */
declare const paperClipIcon: PaperClipIcon;

export default paperClipIcon;