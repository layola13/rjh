/**
 * Group module - Provides grouping functionality for entities in the scene.
 * Allows multiple entities to be treated as a single logical unit.
 */

import { Content, Content_IO } from './Content';
import { Entity } from './Entity';
import { Vector3 } from './Vector3';
import { EntityField } from './decorators';

/**
 * Flag enumeration specific to Group entities.
 * These flags control group-specific behaviors beyond base entity flags.
 */
export const GroupFlagEnum = {
  /** First flag value reserved for group operations */
  firstFlag: 256,
  /** Flag to disable bounding box calculations */
  boundingOff: 256
} as const;

export type GroupFlagEnum = typeof GroupFlagEnum[keyof typeof GroupFlagEnum];

/**
 * Point in 2D space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Point in 3D space
 */
export interface Point3D extends Point2D {
  z: number;
}

/**
 * Metadata structure for Group configuration
 */
export interface GroupMetadata {
  /** If true, prevents ungrouping of this group */
  ungroupable?: boolean;
  [key: string]: unknown;
}

/**
 * Serialization/deserialization handler for Group entities.
 * Handles persistence of group membership and member entity data.
 */
export declare class Group_IO extends Content_IO {
  /**
   * Serialize a group and optionally its members to a dump format.
   * @param entity - The group entity to dump
   * @param callback - Optional callback invoked after dump
   * @param recursive - Whether to recursively dump member entities
   * @param options - Additional dump options
   * @returns Array of serialized entity data
   */
  dump(
    entity: Group,
    callback?: (dump: unknown[], entity: Group) => void,
    recursive?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize group data and restore member references.
   * @param entity - The group entity to populate
   * @param data - Serialized group data containing member IDs
   * @param context - Deserialization context for resolving entity references
   */
  load(
    entity: Group,
    data: { members?: string[] },
    context: unknown
  ): void;

  /**
   * Get singleton instance of Group_IO
   */
  static instance(): Group_IO;
}

/**
 * Rotation axis identifier for 3D transformations
 */
export type RotationAxis = 'XRotation' | 'YRotation' | 'ZRotation';

/**
 * Delta values for position changes
 */
export interface PositionDelta {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Group entity - Container for managing multiple entities as a cohesive unit.
 * Supports transformation, selection, and hierarchical operations on member entities.
 */
export declare class Group extends Content {
  /**
   * Internal storage for group members
   * @private
   */
  private __members: Entity[];

  /**
   * Internal X coordinate (computed from members)
   * @private
   */
  private __x: number;

  /**
   * Internal Y coordinate (computed from members)
   * @private
   */
  private __y: number;

  /**
   * Internal Z coordinate (computed from members)
   * @private
   */
  private __z: number;

  /**
   * Outline points defining the group's 2D bounding box in model space
   */
  outline: Point2D[];

  /**
   * Length along X axis (width)
   */
  XLength: number;

  /**
   * Length along Y axis (depth)
   */
  YLength: number;

  /**
   * Length along Z axis (height)
   */
  ZLength: number;

  /**
   * Creates a new Group instance.
   * @param name - Optional name for the group
   * @param metadata - Optional metadata configuration
   */
  constructor(name?: string, metadata?: GroupMetadata);

  /**
   * Factory method to create and optionally initialize a Group.
   * @param metadata - Metadata for initialization
   * @returns Newly created Group instance
   */
  static create(metadata?: GroupMetadata): Group;

  /**
   * Collection of entities belonging to this group.
   * Setting this property triggers member synchronization.
   */
  members: Entity[];

  /**
   * Whether this group cannot be ungrouped.
   */
  readonly ungroupable: boolean;

  /**
   * Get metadata keys that should be filtered during serialization.
   * @returns Set of metadata keys
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Handle field value changes and propagate to members when needed.
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * Add an entity to this group (alias for addItem).
   * @param entity - Entity to add
   */
  add(entity: Entity): void;

  /**
   * Add an entity to this group's members.
   * @param entity - Entity to add
   */
  addItem(entity: Entity): void;

  /**
   * Remove an entity from this group (alias for removeItem).
   * @param entity - Entity to remove
   */
  remove(entity: Entity): void;

  /**
   * Remove an entity from this group's members.
   * @param entity - Entity to remove
   */
  removeItem(entity: Entity): void;

  /**
   * Replace parent relationship for this group and its members.
   * @param newParent - New parent entity (null to remove parent)
   */
  replaceParent(newParent: Entity | null): void;

  /**
   * Iterate over non-removed members.
   * @param callback - Function called for each member
   * @param thisArg - Value to use as 'this' in callback
   */
  forEachMember(callback: (member: Entity) => void, thisArg?: unknown): void;

  /**
   * Check if an entity is a member of this group.
   * @param entity - Entity to check
   * @param recursive - Whether to check nested groups
   * @returns True if entity is a member
   */
  hasMember(entity: Entity, recursive?: boolean): boolean;

  /**
   * Check if this group contains specific content.
   * @param content - Content to search for
   * @param recursive - Whether to search nested groups
   * @returns True if content is found
   */
  hasContent(content: Content, recursive?: boolean): boolean;

  /**
   * Make a removed member visible and active again.
   * @param entity - Entity to include
   */
  include(entity: Entity): void;

  /**
   * Hide and mark a member as removed (soft delete).
   * @param entity - Entity to exclude
   */
  exclude(entity: Entity): void;

  /**
   * Rotate the group and all its members.
   * @param angleDegrees - Rotation angle in degrees
   * @param pivot - Optional pivot point (defaults to group center)
   * @param axis - Rotation axis (default: 'ZRotation')
   */
  rotate(angleDegrees: number, pivot?: Point2D, axis?: RotationAxis): void;

  /**
   * Flip the group horizontally and update member positions/rotations.
   */
  flipAll(): void;

  /**
   * Get a flat list of all member entities, recursively expanding nested groups.
   * @param excludeRemoved - Whether to exclude removed entities
   * @returns Array of all member entities
   */
  toFlatMemberList(excludeRemoved?: boolean): Entity[];

  /**
   * Get a flat list of all groups (this group and nested groups).
   * @returns Array of all group entities
   */
  toFlatGroupList(): Group[];

  /**
   * Enable flags on this group and propagate to members.
   * @param flags - Flag values to enable
   * @param recursive - Whether to apply recursively
   */
  setFlagOn(flags: number, recursive?: boolean): void;

  /**
   * Disable flags on this group and propagate to members.
   * @param flags - Flag values to disable
   * @param recursive - Whether to apply recursively
   */
  setFlagOff(flags: number, recursive?: boolean): void;

  /**
   * Get the I/O handler for serialization.
   * @returns Group_IO instance
   */
  getIO(): Group_IO;

  /**
   * Recalculate bounding box and geometric properties from members.
   */
  refreshBoundInternal(): void;

  /**
   * Move the group by a delta amount.
   * @param delta - Position change for x, y, z axes
   */
  move(delta: PositionDelta): void;

  /**
   * Resize the group and scale member positions/sizes proportionally.
   * @param newXSize - New width
   * @param newYSize - New depth
   * @param newZSize - New height
   */
  resize(newXSize: number, newYSize: number, newZSize: number): void;

  /**
   * Transform a point from model space to this group's local space.
   * @param entity - Entity whose position to transform
   * @returns Position in local space
   */
  modelSpaceToLocalSpace(entity: Entity): Vector3;

  /**
   * Transform a point from this group's local space to model space.
   * @param localPoint - Point in local space
   * @returns Position in model space
   */
  localSpaceToModelSpace(localPoint: Vector3): Vector3;

  /**
   * Check if a member's scale should change when the group is resized.
   * @param member - Member entity to check
   * @returns True if member should be scaled
   */
  isMemberScalable(member: Entity): boolean;

  /**
   * Check if a member's size should contribute to group bounds.
   * @param member - Member entity to check
   * @returns True if member size is counted
   */
  isMemberSizeCounted(member: Entity): boolean;

  /**
   * Verify if an entity can be a host (parent) for this group.
   * @param entity - Potential host entity
   * @returns True if valid host
   */
  isValidHost(entity: Entity): boolean;

  /**
   * Validate group integrity and fix common issues.
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Internal: Synchronize members array with new set of entities.
   * @param newMembers - New members to assign
   * @private
   */
  private _setMembers(newMembers: Entity[]): void;

  /**
   * Internal: Add a member to the internal collection.
   * @param entity - Entity to add
   * @returns True if successfully added
   * @private
   */
  private _addMember(entity: Entity): boolean;

  /**
   * Internal: Remove a member from the internal collection.
   * @param entity - Entity to remove
   * @returns True if successfully removed
   * @private
   */
  private _removeMember(entity: Entity): boolean;

  /**
   * Internal: Handle rotation transformation.
   * @param angleDegrees - Rotation angle in degrees
   * @param pivot - Optional pivot point
   * @param axis - Rotation axis
   * @private
   */
  private _rotate(angleDegrees: number, pivot?: Point2D, axis?: RotationAxis): void;

  /**
   * Internal: Recalculate outline points from member bounds.
   * @private
   */
  private _updateOutline(): void;

  /**
   * Internal: Invalidate cached subgraph data.
   * @private
   */
  private _invalidateSubgraph(): void;

  /**
   * Internal: Handle position coordinate changes.
   * @param axis - Changed axis ('x', 'y', or 'z')
   * @param oldValue - Previous coordinate value
   * @private
   */
  private _onXYZChanged(axis: string, oldValue: number): void;

  /**
   * Internal: Move all members by a delta.
   * @param delta - Position change
   * @private
   */
  private _move(delta: PositionDelta): void;

  /**
   * Internal: Refresh computed properties (position, size) from members.
   * @private
   */
  private _refreshProperties(): void;
}

/**
 * Export Class alias for backward compatibility
 */
export { Group as Class };