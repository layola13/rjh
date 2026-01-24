/**
 * Ant Design Icon: Delete Column (Outlined)
 * 
 * This module exports an icon definition for a delete column action icon
 * in the Ant Design icon library.
 */

/**
 * SVG child element definition
 */
interface SVGChildElement {
  /** HTML tag name for the SVG element */
  tag: string;
  /** HTML attributes for the element */
  attrs: Record<string, string>;
  /** Nested child elements (optional) */
  children?: SVGChildElement[];
}

/**
 * Icon definition structure used by Ant Design Icons
 */
interface IconDefinition {
  /** Icon visual representation as SVG */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes including viewBox and accessibility properties */
    attrs: {
      /** SVG viewBox coordinate system */
      viewBox: string;
      /** Accessibility: whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: SVGChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Delete Column Icon Definition
 * 
 * An outlined icon representing the action to delete a column,
 * typically used in table or grid interfaces.
 */
declare const deleteColumnIcon: IconDefinition;

export default deleteColumnIcon;