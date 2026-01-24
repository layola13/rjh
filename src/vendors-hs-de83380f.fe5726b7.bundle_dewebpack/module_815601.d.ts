/**
 * Medicine Box Icon (Filled Theme)
 * 
 * A filled style icon representing a medicine box with a plus symbol.
 * Part of an icon library, typically used in medical or healthcare-related UI components.
 * 
 * @module MedicineBoxFilled
 */

/**
 * SVG attributes interface for defining element properties
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element representing a path
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme/style */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Medicine Box filled icon definition
 * 
 * Represents a medicine box with a prominent plus symbol in the center.
 * Dimensions: 896x896 viewBox (64-960 coordinate space)
 */
declare const medicineBoxFilledIcon: IconDefinition;

export default medicineBoxFilledIcon;