/**
 * Sphere panel control for 3D GUI
 * Module: lts/gui/3D/controls/spherePanel
 */

import { Vector3, Matrix, Axis, Space, TmpVectors } from 'core/Misc/observable';
import { VolumeBasedPanel } from './volumeBasedPanel';
import { Container3D } from './container3D';

/**
 * Grid node mapping data structure
 */
export interface IGridNode {
  /** The 3D mesh associated with this node */
  mesh?: {
    /** Makes the mesh look at a target position */
    lookAt(target: Vector3): void;
    /** Rotates the mesh around an axis */
    rotate(axis: Vector3, angle: number, space: Space): void;
  };
  /** Position of the node in 3D space */
  position: Vector3;
}

/**
 * Grid position for spherical mapping
 */
export interface IGridPosition {
  /** X coordinate in grid space */
  x: number;
  /** Y coordinate in grid space */
  y: number;
}

/**
 * A 3D panel that arranges child controls on a spherical surface
 * 
 * @extends VolumeBasedPanel
 */
export declare class SpherePanel extends VolumeBasedPanel {
  /**
   * The radius of the sphere
   * @private
   */
  private _radius: number;

  /**
   * Gets or sets the radius of the sphere
   * When set, triggers a re-arrangement of child controls
   */
  get radius(): number;
  set radius(value: number);

  /**
   * Maps a grid node to a position on the sphere surface
   * 
   * @param node - The grid node to map
   * @param gridPosition - The position in grid coordinates
   * @protected
   */
  protected _mapGridNode(node: IGridNode, gridPosition: IGridPosition): void;

  /**
   * Converts 2D grid coordinates to 3D spherical coordinates
   * 
   * @param gridPosition - The position in grid space
   * @returns The 3D position on the sphere surface
   * @protected
   */
  protected _sphericalMapping(gridPosition: IGridPosition): Vector3;

  /**
   * Re-arranges all child controls on the sphere surface
   * @protected
   */
  protected _arrangeChildren(): void;

  /**
   * The orientation mode for child controls
   * Determines how controls face relative to the sphere
   */
  orientation: number;

  constructor();
}