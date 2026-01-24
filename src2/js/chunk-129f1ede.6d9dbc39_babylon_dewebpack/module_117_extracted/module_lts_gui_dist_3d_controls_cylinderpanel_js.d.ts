/**
 * 3D cylindrical panel control for Babylon.js GUI
 * Arranges child controls on a cylindrical surface
 */

import { Observable } from '@babylonjs/core/Misc/observable';
import { Vector3, Matrix, Axis, Space, TmpVectors } from '@babylonjs/core/Maths/math.vector';
import { VolumeBasedPanel } from './volumeBasedPanel';
import { Container3D } from './container3D';

/**
 * Represents a grid position in 2D space
 */
export interface GridPosition {
  x: number;
  y: number;
}

/**
 * Represents a grid node with a mesh and position
 */
export interface GridNode {
  mesh?: {
    lookAt(target: Vector3): void;
    rotate(axis: Vector3, angle: number, space: number): void;
  };
  position?: Vector3;
}

/**
 * A 3D panel that arranges its children on a cylindrical surface.
 * Children are mapped onto the curved surface using cylindrical coordinates.
 */
export declare class CylinderPanel extends VolumeBasedPanel {
  /**
   * The radius of the cylinder on which controls are arranged
   * @default 5
   */
  private _radius: number;

  /**
   * Gets the radius of the cylindrical surface
   */
  get radius(): number;

  /**
   * Sets the radius of the cylindrical surface
   * Triggers child rearrangement when changed
   */
  set radius(value: number);

  /**
   * Maps a grid node to a position on the cylindrical surface
   * and orients it according to the panel's orientation setting
   * 
   * @param node - The grid node to map
   * @param gridPosition - The 2D grid position to map from
   */
  protected _mapGridNode(node: GridNode, gridPosition: GridPosition): void;

  /**
   * Converts a 2D grid position to a 3D cylindrical coordinate
   * 
   * @param gridPosition - The 2D position in grid space
   * @returns The 3D position on the cylindrical surface
   */
  protected _cylindricalMapping(gridPosition: GridPosition): Vector3;

  /**
   * Triggers rearrangement of child controls
   */
  protected _arrangeChildren(): void;
}