/**
 * Signature filled icon definition
 * Ant Design Icons - Signature icon with filled theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon export object
 */
interface SignatureFilledIcon {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'signature';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Signature filled icon - represents digital signature or handwriting functionality
 * @remarks Used in forms, document signing, and authentication interfaces
 */
declare const signatureFilledIcon: SignatureFilledIcon;

export default signatureFilledIcon;