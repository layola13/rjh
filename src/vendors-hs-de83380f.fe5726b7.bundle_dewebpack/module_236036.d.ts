/**
 * Rest icon component definition (filled theme)
 * Represents a rest/delete icon in the Ant Design icon set
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Prevents the SVG from receiving focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface IconChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths) that compose the icon */
  children: IconChild[];
}

/**
 * Complete icon configuration
 */
interface RestIconConfig {
  /** Icon SVG structure and properties */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'rest';
  /** Visual theme variant */
  theme: 'filled';
}

/**
 * Rest icon (filled theme) - typically represents a delete or rest action
 * Contains a trash can or similar symbol at 64x64 viewport with 896x896 viewBox
 */
declare const restIcon: RestIconConfig;

export default restIcon;