/**
 * Twitter Square filled icon configuration
 * Ant Design Icons - Twitter Square Filled
 */

export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the icon should be focusable via keyboard navigation */
  focusable: string;
}

export interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

export interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

export interface IconDefinition {
  /** SVG root tag */
  tag: string;
  /** Root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

export interface AntDesignIcon {
  /** Icon SVG structure and metadata */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Twitter Square icon with filled theme
 * @remarks
 * This icon represents the Twitter/X social media platform in a square container.
 * Part of the Ant Design icon library.
 */
declare const TwitterSquareFilled: AntDesignIcon;

export default TwitterSquareFilled;