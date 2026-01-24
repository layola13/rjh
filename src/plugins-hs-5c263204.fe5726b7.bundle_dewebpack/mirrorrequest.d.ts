/**
 * Mirror request transaction for floorplan operations
 * Handles mirroring of architectural elements (walls, slabs, structures, etc.) in horizontal or vertical directions
 */

import { HSCore } from './HSCore';

/**
 * Information required to perform a mirror operation
 */
export interface MirrorInfo {
  /** Translation length for the mirror operation */
  transLen: number;
  /** Additional mirror transformation parameters */
  [key: string]: any;
}

/**
 * Direction of the mirror operation
 */
export type MirrorDirection = 'horizontal' | 'vertical';

/**
 * Configuration options for creating a MirrorRequest
 */
export interface MirrorRequestOptions {
  /** The floorplan to perform mirror operation on */
  floorplan: HSCore.Model.Floorplan;
  /** Direction of the mirror (horizontal or vertical) */
  direction: MirrorDirection | HSCore.Model.MirrorType;
}

/**
 * Collection of all architectural elements that can be mirrored
 */
interface MirrorTargets {
  /** Scene layers containing architectural elements */
  layers: HSCore.Model.Layer[];
  /** Floor slabs */
  slabs: HSCore.Model.Slab[];
  /** Wall elements */
  walls: HSCore.Model.Wall[];
  /** Structural elements */
  structures: HSCore.Model.Structure[];
  /** Beam elements */
  beams: HSCore.Model.Beam[];
  /** Custom sketch models */
  sketchmodels: HSCore.Model.NCustomizedSketchModel[];
  /** Parametric opening elements */
  parametricopenings: HSCore.Model.ParametricOpening[];
  /** Face elements (unique set) */
  faces: Set<HSCore.Model.Face>;
  /** Opening elements */
  openings: HSCore.Model.Opening[];
  /** Content elements (furniture, fixtures, etc.) */
  contents: HSCore.Model.Content[];
  /** Auxiliary line elements */
  auxiliaryLines: HSCore.Model.AuxiliaryLine[];
}

/**
 * Transaction request for mirroring a floorplan
 * Extends the base StateRequest to provide undo/redo functionality
 * 
 * @example
 *