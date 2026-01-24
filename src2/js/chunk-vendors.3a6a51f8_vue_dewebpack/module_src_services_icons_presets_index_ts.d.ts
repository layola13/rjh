/**
 * Icon presets module that aggregates all available icon preset configurations.
 * This module provides a frozen object containing references to various icon libraries.
 * 
 * @module services/icons/presets
 */

import mdiSvgPreset from './mdi-svg';
import mdPreset from './md';
import mdiPreset from './mdi';
import faPreset from './fa';
import fa4Preset from './fa4';
import faSvgPreset from './fa-svg';

/**
 * Icon preset configuration interface.
 * Each preset defines how to render icons from a specific icon library.
 */
export interface IconPreset {
  /** The component or function used to render icons */
  readonly component?: unknown;
  /** Icon-specific configuration options */
  readonly props?: Record<string, unknown>;
  /** Additional preset metadata */
  [key: string]: unknown;
}

/**
 * Available icon presets mapped by library name.
 * 
 * @property {IconPreset} mdiSvg - Material Design Icons SVG preset
 * @property {IconPreset} md - Material Design preset
 * @property {IconPreset} mdi - Material Design Icons preset
 * @property {IconPreset} fa - Font Awesome 5+ preset
 * @property {IconPreset} fa4 - Font Awesome 4 preset
 * @property {IconPreset} faSvg - Font Awesome SVG preset
 */
export interface IconPresetsCollection {
  readonly mdiSvg: typeof mdiSvgPreset;
  readonly md: typeof mdPreset;
  readonly mdi: typeof mdiPreset;
  readonly fa: typeof faPreset;
  readonly fa4: typeof fa4Preset;
  readonly faSvg: typeof faSvgPreset;
}

/**
 * Frozen collection of all available icon presets.
 * Use this object to access icon library configurations.
 * 
 * @example
 *