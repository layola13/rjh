/**
 * Icon definition for Safety Certificate (filled theme)
 * Represents a safety certificate icon with a checkmark
 */
interface IconDefinition {
  /** Icon configuration object */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Path tag name */
      tag: 'path';
      /** Path attributes */
      attrs: {
        /** SVG path data string defining the shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: 'safety-certificate';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Safety Certificate Icon Definition
 * A filled icon depicting a certificate with a checkmark indicating safety or verification
 */
declare const SafetyCertificateFilledIcon: IconDefinition;

export default SafetyCertificateFilledIcon;