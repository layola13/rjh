/**
 * Ant Design Icon: Step Forward (Outlined)
 * 
 * This module exports the configuration for a step-forward icon,
 * commonly used for media playback controls (next track/skip forward).
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG container element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Step Forward Icon Definition
 * 
 * Represents a "next" or "skip forward" control with:
 * - A right-pointing triangle (play/forward symbol)
 * - A vertical bar on the right edge (end marker)
 * 
 * @constant
 */
const stepForwardIconDefinition: IconExport = {
  icon: {
    tag: 'svg',
    attrs: {
      viewBox: '0 0 1024 1024',
      focusable: 'false'
    },
    children: [
      {
        tag: 'path',
        attrs: {
          d: 'M676.4 528.95L293.2 829.97c-14.25 11.2-35.2 1.1-35.2-16.95V210.97c0-18.05 20.95-28.14 35.2-16.94l383.2 301.02a21.53 21.53 0 010 33.9M694 864h64a8 8 0 008-8V168a8 8 0 00-8-8h-64a8 8 0 00-8 8v688a8 8 0 008 8'
        }
      }
    ]
  },
  name: 'step-forward',
  theme: 'outlined'
};

export default stepForwardIconDefinition;