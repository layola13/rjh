/**
 * Vertical Left Icon Component
 * An outlined icon showing a vertical left arrow symbol
 */

/** SVG path attributes interface */
interface SvgPathAttributes {
  /** SVG path data string */
  d: string;
}

/** SVG element attributes interface */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/** SVG child element definition */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/** Icon configuration structure */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements array */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: 'vertical-left';
  /** Icon visual theme style */
  theme: 'outlined';
}

/**
 * Vertical Left Icon Definition
 * Represents a vertical layout control icon with left alignment
 */
declare const verticalLeftIcon: IconDefinition;

export default verticalLeftIcon;