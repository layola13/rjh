/**
 * Light content module for managing 3D scene lighting and content objects.
 * Provides base classes for individual light content and grouped light content.
 */

import * as THREE from 'three';

/**
 * Represents the 3D position in space
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents the 3D size dimensions
 */
export interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 2D outline point
 */
export interface OutlinePoint {
  x: number;
  y: number;
}

/**
 * Content interface with basic 3D properties
 */
export interface IContent {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  rotation?: number;
  contentType?: string;
  metadata?: {
    categories?: string[];
  };
  getHost(): unknown;
}

/**
 * Visitor interface for traversing light content
 */
export interface ILightVisitor {
  visit(content: LightContent, ...args: unknown[]): unknown;
}

/**
 * Result of a visitor acceptance
 */
export interface VisitorResult {
  content: LightContent;
  lights: unknown;
}

/**
 * Base class representing a single light content object in 3D space.
 * Manages position, rotation, size, outline, and category metadata.
 */
export declare class LightContent {
  protected _contentType: string;
  protected _content: IContent;
  protected _position: Position3D | undefined;
  protected _rotation: number | undefined;
  protected _size: Size3D | undefined;
  protected _outline: OutlinePoint[] | undefined;
  protected _categories?: string[];

  /**
   * Creates a new LightContent instance
   * @param content - The content object containing 3D properties
   * @param contentType - Optional content type identifier, defaults to content.contentType
   */
  constructor(content: IContent, contentType?: string);

  /**
   * Gets the content type identifier
   * @returns The content type string
   */
  contentType(): string;

  /**
   * Gets the array of content objects
   * @returns Array containing the single content object
   */
  getContents(): IContent[];

  /**
   * Gets the categories associated with this content
   * @returns Array of category strings, or undefined if no categories
   */
  getCategories(): string[] | undefined;

  /**
   * Gets the host object for this content
   * @returns The host object
   */
  getHost(): unknown;

  /**
   * Gets the forward vector pointing to the front (negative Y direction after rotation)
   * @returns Normalized 2D vector representing front direction
   */
  get frontForwardVec(): THREE.Vector2;

  /**
   * Gets the forward vector pointing to the left (90° counter-clockwise from front)
   * @returns Normalized 2D vector representing left direction
   */
  get leftForwardVec(): THREE.Vector2;

  /**
   * Gets the forward vector pointing to the right (90° clockwise from front)
   * @returns Normalized 2D vector representing right direction
   */
  get rightForwardVec(): THREE.Vector2;

  /**
   * Gets the forward vector pointing to the back (180° from front)
   * @returns Normalized 2D vector representing back direction
   */
  get backForwardVec(): THREE.Vector2;

  /**
   * Accepts visitors and applies them to this content
   * @param visitors - Array of visitor objects implementing the visitor pattern
   * @param args - Additional arguments passed to visitor methods
   * @returns Visitor result containing content and lights, or null if no match
   */
  accept(visitors: ILightVisitor[], ...args: unknown[]): VisitorResult | null;

  /**
   * Gets the 3D position of this content
   * @returns The position object with x, y, z coordinates
   */
  getPosition(): Position3D | undefined;

  /**
   * Gets the 2D outline points of this content
   * @returns Array of outline points
   */
  getOutline(): OutlinePoint[] | undefined;

  /**
   * Gets the rotation angle in degrees
   * @returns The rotation value
   */
  getRotation(): number | undefined;

  /**
   * Gets the 3D size dimensions
   * @returns The size object with x, y, z dimensions
   */
  getSize(): Size3D | undefined;

  /**
   * Calculates and caches the position, size, rotation, and outline from the content object
   * @internal
   */
  protected _calculateOutline(): void;
}

/**
 * Group interface for virtual group detection
 */
export interface IGroup {
  // Marker interface for Group type checking
}

/**
 * Extended content interface that may be a Group
 */
export interface IGroupableContent extends IContent {
  // Content that can be used in groups
}

/**
 * Represents a group of light content objects.
 * Extends LightContent to manage multiple child content items as a single unit.
 */
export declare class LightContentGroup extends LightContent {
  protected _children: LightContent[];

  /**
   * Creates a new LightContentGroup instance
   * @param content - The parent content object
   * @param children - Array of child LightContent objects
   * @param contentType - Optional content type identifier
   */
  constructor(content: IContent, children?: LightContent[], contentType?: string);

  /**
   * Gets all content objects including parent and all descendants
   * @returns Flattened array of all content objects in the group hierarchy
   */
  getContents(): IContent[];

  /**
   * Gets the direct children of this group
   * @returns Array of child LightContent objects
   */
  getChildren(): LightContent[];

  /**
   * Calculates the outline for virtual groups by computing bounding box from children.
   * Skips calculation if content is an actual Group instance.
   * @internal
   */
  protected _calculateOutlineForVirtualGroup(): void;
}