/**
 * Icon definition for the 'close' icon
 * Represents a close/cross symbol in outlined theme
 */
interface IconAttrs {
  /** SVG fill rule */
  'fill-rule': string;
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes for SVG
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface Icon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface CloseIconDefinition {
  /** Icon visual definition */
  icon: Icon;
  /** Icon identifier name */
  name: 'close';
  /** Icon style theme */
  theme: 'outlined';
}

/**
 * Close icon definition in outlined theme
 * Used for close buttons, dismissing dialogs, and clearing selections
 */
declare const closeIcon: CloseIconDefinition;

export default closeIcon;