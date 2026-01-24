/**
 * 3D stack panel control for organizing child controls in vertical or horizontal layout
 * @module StackPanel3D
 */

import { Observable } from "core/Misc/observable";
import { Container3D } from "./container3D";
import { Matrix, Vector3, TmpVectors } from "core/Maths/math.vector";
import { Mesh } from "core/Meshes/mesh";
import { BoundingInfo } from "core/Culling/boundingInfo";

/**
 * Interface for 3D controls that can be children of StackPanel3D
 */
export interface IControl3D {
  /** The mesh representing this control */
  mesh?: Mesh | null;
  
  /** Position of the control relative to parent */
  position: Vector3;
}

/**
 * Configuration options for StackPanel3D
 */
export interface StackPanel3DOptions {
  /** Whether to arrange children vertically (true) or horizontally (false) */
  isVertical?: boolean;
  
  /** Spacing between child controls */
  margin?: number;
}

/**
 * A 3D container that arranges its children in a vertical or horizontal stack
 * @extends Container3D
 */
export declare class StackPanel3D extends Container3D {
  /**
   * Whether the panel arranges children vertically
   * @remarks When changed, triggers automatic rearrangement of children
   */
  get isVertical(): boolean;
  set isVertical(value: boolean);
  
  /**
   * Spacing between consecutive children in the stack
   * @default 0.1
   */
  margin: number;
  
  /**
   * Creates a new StackPanel3D instance
   * @param isVertical - Whether to arrange children vertically (default: false for horizontal)
   */
  constructor(isVertical?: boolean);
  
  /**
   * Arranges all child controls according to stack layout rules
   * @remarks
   * - Calculates bounding boxes of all children
   * - Positions them sequentially with specified margin
   * - Centers the stack around the panel's origin
   * @internal
   */
  protected _arrangeChildren(): void;
  
  /** @internal */
  private _isVertical: boolean;
  
  /** Collection of child 3D controls */
  protected _children: IControl3D[];
}