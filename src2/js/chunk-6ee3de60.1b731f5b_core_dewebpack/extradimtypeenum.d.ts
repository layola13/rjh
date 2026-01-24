/**
 * Module: ExtraDimTypeEnum
 * Defines types and data structures for frame relationships and extra dimension types
 */

import { PolyId } from './module-2'; // Assuming module 2 exports PolyId

/**
 * Enum representing extra dimension types for geometric constraints
 */
export enum ExtraDimTypeEnum {
  /** Arbitrary dimension without specific constraint */
  Arbitrary = 0,
  /** Horizontal dimension constraint */
  Horizontal = 1,
  /** Vertical dimension constraint */
  Vertical = 2,
  /** Angular dimension constraint */
  Angle = 3,
  /** Radial dimension constraint */
  Radius = 4
}

/**
 * Enum representing the type of frame relationship
 */
export enum FrameRelationEnum {
  /** Standard frame relationship */
  frame = 0,
  /** Docking relationship */
  dock = 1
}

/**
 * Dock information containing polygon IDs
 */
export interface DockInfo {
  /** ID of the dock */
  dockId: PolyId;
  /** ID of the polygon */
  polyId: PolyId;
}

/**
 * Serialized representation of dock information
 */
export interface SerializedDockInfo {
  /** Serialized dock ID */
  dockId: unknown;
  /** Serialized polygon ID */
  polyId: unknown;
}

/**
 * Serialized representation of frame relation data
 */
export interface SerializedFrameRelationData {
  /** Relationship type */
  type: FrameRelationEnum;
  /** Index of the vertex in the frame */
  vertexIndex: number;
  /** Optional dock information */
  dock?: SerializedDockInfo;
  /** Optional frame index */
  frameIdx?: number;
}

/**
 * Represents the relationship data between frames, including docking and vertex information
 */
export class FrameRelationData {
  /** Type of frame relationship */
  type: FrameRelationEnum;
  
  /** Index of the vertex associated with this relationship */
  vertexIndex: number;
  
  /** Optional docking information */
  dock?: DockInfo;
  
  /** Optional frame index */
  frameIdx?: number;

  /**
   * Creates a new FrameRelationData instance
   * @param type - The type of frame relationship
   * @param vertexIndex - The index of the vertex
   */
  constructor(type: FrameRelationEnum, vertexIndex: number) {
    this.type = type;
    this.vertexIndex = vertexIndex;
  }

  /**
   * Serializes the frame relation data to a plain object
   * @returns Serialized representation of the frame relation data
   */
  toJSON(): SerializedFrameRelationData {
    return {
      type: this.type,
      vertexIndex: this.vertexIndex,
      dock: this.dock ? {
        dockId: this.dock.dockId.toJSON(),
        polyId: this.dock.polyId.toJSON()
      } : undefined,
      frameIdx: this.frameIdx
    };
  }

  /**
   * Deserializes frame relation data from a plain object
   * @param data - Serialized frame relation data
   * @returns This instance for method chaining
   */
  deserialize(data: SerializedFrameRelationData): this {
    this.type = data.type;
    this.vertexIndex = data.vertexIndex;
    
    if (data.dock) {
      this.dock = {
        dockId: new PolyId().deserialize(data.dock.dockId),
        polyId: new PolyId().deserialize(data.dock.polyId)
      };
    }
    
    this.frameIdx = data.frameIdx;
    
    return this;
  }
}