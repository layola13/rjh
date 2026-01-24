/**
 * Inbox icon component definition for Ant Design icon library.
 * Represents an inbox/mail tray in outlined style.
 * 
 * @module InboxOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Inbox icon in outlined theme.
 * Displays a traditional inbox/mail tray icon commonly used for messages or document collection.
 */
declare const InboxOutlinedIcon: IconDefinition;

export default InboxOutlinedIcon;