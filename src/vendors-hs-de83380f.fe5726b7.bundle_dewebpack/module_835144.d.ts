/**
 * Dropbox icon component definition for Ant Design Icons
 * @module DropboxOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data */
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
interface IconNode {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** Icon SVG node structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Dropbox outlined icon definition
 * Represents the Dropbox logo in outlined style
 */
declare const DropboxOutlinedIcon: IconDefinition;

export default DropboxOutlinedIcon;