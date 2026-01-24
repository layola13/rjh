/**
 * Partition icon configuration for Ant Design icon system
 * Represents a partition/split layout icon in outlined theme
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
 * Path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * Generic element attributes interface
 */
interface ElementAttrs {
  [key: string]: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttrs | PathAttrs;
  /** Nested children elements */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface PartitionIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Partition icon - outlined theme
 * Used to represent split/partition layouts or divisions
 */
declare const partitionIcon: PartitionIconConfig;

export default partitionIcon;