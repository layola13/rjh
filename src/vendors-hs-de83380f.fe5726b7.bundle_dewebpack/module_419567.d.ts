/**
 * Reconciliation icon component definition (filled theme)
 * Represents a reconciliation/accounting document with calculated sections
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface ReconciliationIcon {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: "reconciliation";
  /** Icon theme variant */
  theme: "filled";
}

/**
 * Reconciliation filled icon
 * Used to represent accounting reconciliation, financial documents, or calculation sheets
 */
declare const ReconciliationFilledIcon: ReconciliationIcon;

export default ReconciliationFilledIcon;