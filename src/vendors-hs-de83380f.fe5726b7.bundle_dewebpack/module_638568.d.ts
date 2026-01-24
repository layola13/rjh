/**
 * Rollback icon component configuration
 * Provides an outlined rollback/undo arrow icon pointing left
 */
interface IconAttrs {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element configuration
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML/SVG tag name for root element */
  tag: string;
  /** Root element attributes */
  attrs: IconAttrs;
  /** Child elements */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface RollbackIconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Rollback icon definition in outlined theme
 * Displays a left-pointing arrow with return/undo semantics
 */
declare const rollbackIcon: RollbackIconDefinition;

export default rollbackIcon;