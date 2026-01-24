/**
 * 3D plane panel control module
 * Provides a planar surface for arranging 3D GUI controls
 */

import { Vector3, TmpVectors } from 'core/Misc/observable';
import { Container3D } from './container3D';
import { VolumeBasedPanel } from './volumeBasedPanel';
import { Control3D } from './control3D';

/**
 * Represents a planar panel in 3D space for hosting GUI controls.
 * The panel arranges child controls on a flat surface with configurable orientation.
 */
export declare class PlanePanel extends VolumeBasedPanel {
  /**
   * Creates an instance of PlanePanel.
   */
  constructor();

  /**
   * Maps a grid node to a specific position on the plane panel.
   * Positions the control and orients it according to the panel's orientation setting.
   * 
   * @param control - The 3D control to be positioned on the grid
   * @param position - The target position vector for the control
   */
  protected _mapGridNode(control: Control3D, position: Vector3): void;

  /**
   * The orientation mode of the panel.
   * Determines how controls face relative to the origin or forward direction.
   * 
   * Possible values:
   * - Container3D.FACEORIGIN_ORIENTATION: Controls face toward the origin
   * - Container3D.FACEFORWARD_ORIENTATION: Controls face forward (positive Z)
   * - Container3D.FACEFORWARDREVERSED_ORIENTATION: Controls face backward (negative Z)
   * - Container3D.FACEORIGINREVERSED_ORIENTATION: Controls face away from origin
   */
  orientation: number;
}