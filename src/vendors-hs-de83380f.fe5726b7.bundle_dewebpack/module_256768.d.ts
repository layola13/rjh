/**
 * File PDF filled icon definition for Ant Design Icons
 * @module FilePdfFilled
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface FilePdfFilledIcon {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'file-pdf';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * File PDF filled icon - represents a PDF document with filled style
 * Used in Ant Design icon system for displaying PDF file types
 */
declare const FilePdfFilled: FilePdfFilledIcon;

export default FilePdfFilled;