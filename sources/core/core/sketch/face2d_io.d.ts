/**
 * Face2d_IO Module
 * 
 * This module provides serialization/deserialization functionality for 2D face entities
 * and the Face2d entity class representing a 2D face with outer and inner loops.
 */

import { Entity, Entity_IO } from './Entity';
import { EntityEventType } from './EntityEvent';
import { Util } from '../utils/Util';
import { EntityField } from './decorators';
import { Point2d } from './Point2d';
import { Curve2d } from './Curve2d';
import { Wire2d } from './Wire2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';

/**
 * Bounding box representation
 */
export interface BoundingBox {
  /** Left x coordinate */
  x: number;
  /** Right x coordinate */
  x2: number;
  /** Top y coordinate */
  y: number;
  /** Bottom y coordinate */
  y2: number;
}

/**
 * Serialization options for entity dump/load operations
 */
export interface SerializationOptions {
  [key: string]: unknown;
}

/**
 * Dumped entity data structure
 */
export interface DumpData {
  id: string;
  outerLoop?: string;
  innerLoops?: string[];
  [key: string]: unknown;
}

/**
 * Serialization context for entity loading
 */
export interface LoadContext {
  [key: string]: unknown;
}

/**
 * IO handler for Face2d entity serialization and deserialization
 * Extends Entity_IO to provide custom dump/load logic for Face2d entities
 */
export class Face2d_IO extends Entity_IO {
  private static _Face2d_IO_instance: Face2d_IO | null = null;

  /**
   * Gets the singleton instance of Face2d_IO
   * @returns The Face2d_IO singleton instance
   */
  public static instance(): Face2d_IO {
    if (!Face2d_IO._Face2d_IO_instance) {
      Face2d_IO._Face2d_IO_instance = new Face2d_IO();
    }
    return Face2d_IO._Face2d_IO_instance;
  }

  /**
   * Serializes a Face2d entity to a dump format
   * @param entity - The Face2d entity to serialize
   * @param callback - Optional callback invoked after dumping
   * @param includeMetadata - Whether to include metadata in the dump
   * @param options - Additional serialization options
   * @returns Array containing the serialized data
   */
  public dump(
    entity: Face2d,
    callback?: (dumpData: unknown[], entity: Face2d) => void,
    includeMetadata: boolean = true,
    options: SerializationOptions = {}
  ): unknown[] {
    const dumpData = super.dump(entity, undefined, includeMetadata, options);
    const entityData = dumpData[0] as DumpData;

    // Serialize outer loop reference
    if (entity.__outerLoop) {
      entityData.outerLoop = entity.__outerLoop.id;
    }

    // Serialize inner loops references
    const innerLoopIds = Object.keys(entity.__innerLoops ?? {});
    if (innerLoopIds.length > 0) {
      entityData.innerLoops = innerLoopIds;
    }

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  /**
   * Deserializes a Face2d entity from dump data
   * @param entity - The target Face2d entity to populate
   * @param data - The serialized data to load from
   * @param context - Loading context with entity references
   */
  public load(
    entity: Face2d,
    data: DumpData,
    context: LoadContext = {}
  ): void {
    super.load(entity, data, context);

    // Deserialize outer loop (support legacy typo "outterLoop")
    entity.__outerLoop = Entity.loadFromDumpById(
      data.outerLoop ?? (data as any).outterLoop,
      context
    ) as Wire2d | null;

    // Deserialize inner loops
    const innerLoops: Record<string, Wire2d> = {};
    if (data.innerLoops) {
      data.innerLoops.forEach((loopId: string) => {
        const loop = Entity.loadFromDumpById(loopId, context) as Wire2d | null;
        if (loop) {
          innerLoops[loop.id] = loop;
        }
      });
    }
    entity.__innerLoops = innerLoops;
  }
}

/**
 * Represents a 2D face entity with an outer boundary loop and optional inner loops (holes)
 * 
 * A Face2d consists of:
 * - An outer loop (Wire2d) defining the boundary
 * - Zero or more inner loops (Wire2d) defining holes
 * 
 * The outer loop should be counter-clockwise, inner loops clockwise.
 */
export class Face2d extends Entity {
  /** Internal storage for outer loop */
  public __outerLoop: Wire2d | null = null;
  
  /** Internal storage for inner loops (holes) */
  public __innerLoops: Record<string, Wire2d> = {};

  /**
   * Creates a new Face2d instance
   * @param id - Optional entity ID
   * @param tag - Optional entity tag for identification
   */
  constructor(id: string = '', tag?: string) {
    super(id, tag);
    this.__outerLoop = null;
    this.__innerLoops = {};
  }

  /**
   * Initializes the face with outer and inner loops
   * @param outerLoop - The outer boundary loop
   * @param innerLoops - Array of inner loops (holes)
   * @returns This Face2d instance for chaining
   */
  public init(outerLoop: Wire2d, innerLoops: Wire2d[]): this {
    this.__outerLoop = outerLoop;
    this.addChild(outerLoop);

    for (const loop of innerLoops) {
      this.__innerLoops[loop.id] = loop;
      this.addChild(loop);
    }

    return this;
  }

  /**
   * Gets the IO handler for this entity type
   * @returns The Face2d_IO singleton instance
   */
  public getIO(): Face2d_IO {
    return Face2d_IO.instance();
  }

  /**
   * Sets the outer loop of the face
   * @param loop - The new outer loop
   */
  public setOuterLoop(loop: Wire2d | null): void {
    const oldLoop = this.__outerLoop;
    if (oldLoop) {
      this.removeChild(oldLoop);
    }
    this.outerLoop = loop;
    if (loop) {
      this.addChild(loop);
    }
  }

  /**
   * Gets the points of the outer loop
   * @returns Array of points defining the outer boundary
   */
  public get points(): Point2d[] {
    return this.outerLoop ? this.outerLoop.getPath() : [];
  }

  /**
   * Handles child entity dirty events
   * @param child - The child entity that became dirty
   * @param event - The event details
   */
  protected onChildDirty(child: Entity, event?: { type: EntityEventType }): void {
    if (event?.type === EntityEventType.Geometry) {
      this.dirtyGeometry();
    }
    super.onChildDirty(child, event);
  }

  /**
   * Sets the inner loops (holes) of the face
   * @param loops - Array of inner loops
   */
  public setInnerLoops(loops: Wire2d[]): void {
    const oldLoops = this.innerLoops;
    this.innerLoops = loops;
    this.replaceChildren(oldLoops, loops);
  }

  /**
   * Gets all paths (outer and inner loops) as arrays of points
   * @returns Array of point arrays, one per loop
   */
  public getPath(): Point2d[][] {
    return this.getWires().map(wire => wire.getPath());
  }

  /**
   * Gets all wire loops (outer and inner)
   * @returns Array of Wire2d entities
   */
  public getWires(): Wire2d[] {
    if (!this.outerLoop) {
      return [];
    }
    const innerLoops = this.innerLoops;
    return [this.outerLoop, ...innerLoops];
  }

  /**
   * Gets all Point2d entities in the face
   * @returns Array of all Point2d children
   */
  public getAllPoints(): Point2d[] {
    return Array.from(Util.getChildPoint2d(this));
  }

  /**
   * Gets all Curve2d entities in the face
   * @returns Array of all Curve2d children
   */
  public getAllCurves(): Curve2d[] {
    return Array.from(Util.getChildCurves(this));
  }

  /**
   * Gets the bounding box of the face
   * @returns BoundingBox object with x, x2, y, y2 coordinates
   */
  public bounding(): BoundingBox {
    return this.getBounding();
  }

  /**
   * Gets the bounding box of the face
   * @returns BoundingBox object with x, x2, y, y2 coordinates
   */
  public getBounding(): BoundingBox {
    const bounds = this.bound;
    return {
      x: bounds.left,
      x2: bounds.left + bounds.width,
      y: bounds.top,
      y2: bounds.top + bounds.height
    };
  }

  /**
   * Refreshes the internal bounding box calculation
   */
  protected refreshBoundInternal(): void {
    if (this.outerLoop) {
      this.boundInternal = this.outerLoop.bound;
    }
  }

  /**
   * Tests if a point is inside the face
   * A point is inside if it's within the outer loop and not within any inner loops
   * @param point - The point to test
   * @returns true if the point is inside the face
   */
  public isPointInside(point: Point2d): boolean {
    if (!this.outerLoop) {
      return false;
    }

    // Check if point is inside outer loop
    if (!HSCore.Util.Math.isPointInPolygon(point, this.outerLoop.getPath())) {
      return false;
    }

    // Check if point is inside any inner loop (hole)
    const innerLoops = this.innerLoops;
    for (let i = 0; i < innerLoops.length; i++) {
      if (HSCore.Util.Math.isPointInPolygon(point, innerLoops[i].getPath())) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if the face contains any background points
   * @returns true if any child Point2d has isbackground flag set
   */
  public hasBackgroundPoint(): boolean {
    for (const point of Util.getChildPoint2d(this)) {
      if (point.isbackground) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the face contains any background curves
   * @returns true if any child Curve2d has isbackground flag set
   */
  public hasBackgroundCurve(): boolean {
    for (const curve of Util.getChildCurves(this)) {
      if (curve.isbackground) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the entire face is marked as background
   * @returns true if all curves in the outer loop are background
   */
  public isBackground(): boolean {
    if (!this.outerLoop) {
      return false;
    }

    for (const curve of this.outerLoop.curves) {
      if (!curve.isbackground) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if the outer loop contains a full circle
   * @returns true if outer loop contains a Circle2d
   */
  public isOuterLoopContainsCircle(): boolean {
    let hasCircle = false;

    if (this.outerLoop) {
      for (const curve of this.outerLoop.curves) {
        if (curve instanceof HSCore.Model.Circle2d) {
          hasCircle = true;
          break;
        }
      }
    }

    return hasCircle;
  }

  /**
   * Checks if the outer loop contains a circular arc
   * @returns true if outer loop contains a CircleArc2d
   */
  public isOuterLoopContainsCircleArc(): boolean {
    let hasCircleArc = false;

    if (this.outerLoop) {
      for (const curve of this.outerLoop.curves) {
        if (curve instanceof HSCore.Model.CircleArc2d) {
          hasCircleArc = true;
          break;
        }
      }
    }

    return hasCircleArc;
  }

  /**
   * Creates a deep clone of this Face2d
   * @returns A new Face2d instance with cloned data
   */
  public clone(): Face2d {
    const clonedData = Util.getClonedDumpData(this);
    const clonedFace = new Face2d();
    clonedFace.load(clonedData.dumps[0], clonedData.context);
    return clonedFace;
  }

  /**
   * Verifies the integrity of the Face2d entity
   * Checks:
   * - Outer loop exists and is a child
   * - Outer loop is counter-clockwise
   * - All inner loops are children
   * - All inner loops are clockwise
   * @returns true if verification passes
   */
  public verify(): boolean {
    // Verify outer loop exists and is a child
    if (!this.outerLoop || !this.hasChild(this.outerLoop)) {
      log.error(
        `${this.tag}: invalid outerLoop.`,
        'HSCore.Verify.Error',
        true
      );
      return false;
    }

    // Warn if outer loop is clockwise (should be counter-clockwise)
    if (HSCore.Util.Math.isClockwise(this.outerLoop.getDiscretePoints())) {
      log.warning(
        `${this.tag}: outerLoop ${this.outerLoop.tag} is clockwise`,
        'HSCore.Verify.Error'
      );
    }

    const innerLoops = this.innerLoops;

    // Verify all inner loops are children
    if (innerLoops.some(loop => !this.hasChild(loop))) {
      log.error(
        `${this.tag}: innerLoop is not a child.`,
        'HSCore.Verify.Error',
        true
      );
      return false;
    }

    // Warn if any inner loop is not clockwise
    for (const loop of innerLoops) {
      if (!HSCore.Util.Math.isClockwise(loop.getDiscretePoints())) {
        log.warning(
          `${this.tag}: innerLoop ${loop.tag} is not clockwise`,
          'HSCore.Verify.Error'
        );
      }
    }

    return super.verify();
  }

  /**
   * Handles field change events
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  protected onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void {
    if (['outerLoop', 'innerLoop'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  /**
   * Outer boundary loop of the face (counter-clockwise)
   */
  @EntityField({
    partialSet(this: Face2d, value: Wire2d | null): void {
      this.__outerLoop = value;
    }
  })
  public outerLoop!: Wire2d | null;

  /**
   * Inner loops (holes) of the face (clockwise)
   */
  @EntityField({
    get(this: Face2d): Wire2d[] {
      return Object.values(this.__innerLoops);
    },
    partialSet(this: Face2d, value: Wire2d[]): void {
      this.__innerLoops = {};
      for (const loop of value) {
        this.__innerLoops[loop.id] = loop;
      }
    }
  })
  public innerLoops!: Wire2d[];
}

// Register the Face2d class with the entity system
Entity.registerClass(HSConstants.ModelClass.Face2d, Face2d);