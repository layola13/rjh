/**
 * 3D plane panel control for GUI system
 * Provides a flat panel surface for organizing 3D UI elements in a grid layout
 */

import { Vector3, TmpVectors } from "core/Misc/observable";
import { Container3D } from "../../../lts/gui/dist/3D/controls/container3D";
import { VolumeBasedPanel } from "../../../lts/gui/dist/3D/controls/volumeBasedPanel";

/**
 * Grid node mapping information
 */
interface GridNode {
  /** Associated 3D mesh */
  mesh?: any;
  /** Position in 3D space */
  position: Vector3;
}

/**
 * PlanePanel - A 2D panel in 3D space for arranging controls
 * Extends VolumeBasedPanel to provide a flat grid-based layout surface
 */
export declare class PlanePanel extends VolumeBasedPanel {
  /**
   * Maps a grid node to a specific position and orientation
   * @param node - The grid node to position
   * @param position - Target position in 3D space
   */
  protected _mapGridNode(node: GridNode, position: Vector3): void;
}

/**
 * Implementation details:
 * - Supports multiple orientation modes (FACEORIGIN, FACEFORWARD, FACEFORWARDREVERSED, FACEORIGINREVERSED)
 * - Automatically orients mesh to face the appropriate direction based on panel orientation
 * - Uses lookAt for mesh rotation calculation
 */