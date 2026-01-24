/**
 * Light content module providing content wrapping and grouping functionality
 * for 3D scene objects with spatial properties and categorization.
 */

import type { Logger } from 'HSCore';
import type { Vector2, Box2 } from 'three';

/**
 * Represents spatial position in 3D space
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents size dimensions in 3D space
 */
export interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a point in 2D space (outline vertex)
 */
export interface OutlinePoint {
  x: number;
  y: number;
}

/**
 * Base content interface with spatial and metadata properties
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
 * Virtual group content type
 */
export interface IGroupContent extends IContent {
  // Marker interface for Group type checking
}

/**
 * Visitor pattern interface for content traversal
 */
export interface IContentVisitor<TContext = unknown, TOptions = unknown> {
  visit(
    content: LightContent,
    context?: TContext,
    options?: TOptions
  ): unknown[] | null;
}

/**
 * Result of visitor accept operation
 */
export interface VisitorResult<TLights = unknown> {
  content: LightContent;
  lights: TLights;
}

/**
 * Wrapper class for light content with spatial calculations and visitor pattern support.
 * Provides methods for accessing position, rotation, size, outline, and directional vectors.
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
   * @param content - The underlying content object with spatial properties
   * @param contentType - Optional content type override (defaults to content.contentType)
   */
  constructor(content: IContent, contentType?: string);

  /**
   * Gets the content type identifier
   */
  contentType(): string;

  /**
   * Gets the wrapped content objects (base implementation returns single content)
   */
  getContents(): IContent[];

  /**
   * Gets the content categories from metadata
   */
  getCategories(): string[] | undefined;

  /**
   * Gets the host object from the wrapped content
   */
  getHost(): unknown;

  /**
   * Normalized forward vector pointing to the front (relative to rotation)
   */
  get frontForwardVec(): Vector2;

  /**
   * Normalized forward vector pointing to the left (90° from front)
   */
  get leftForwardVec(): Vector2;

  /**
   * Normalized forward vector pointing to the right (-90° from front)
   */
  get rightForwardVec(): Vector2;

  /**
   * Normalized forward vector pointing to the back (180° from front)
   */
  get backForwardVec(): Vector2;

  /**
   * Accepts visitors and applies them to this content
   * @param visitors - Array of visitor objects to apply
   * @param context - Optional context passed to visitors
   * @param options - Optional options passed to visitors
   * @returns Visitor result with content and lights, or null if no matches
   */
  accept<TContext = unknown, TOptions = unknown, TLights = unknown>(
    visitors: IContentVisitor<TContext, TOptions>[],
    context?: TContext,
    options?: TOptions
  ): VisitorResult<TLights> | null;

  /**
   * Gets the calculated 3D position
   */
  getPosition(): Position3D | undefined;

  /**
   * Gets the calculated 2D outline points
   */
  getOutline(): OutlinePoint[] | undefined;

  /**
   * Gets the rotation angle in degrees
   */
  getRotation(): number | undefined;

  /**
   * Gets the calculated 3D size
   */
  getSize(): Size3D | undefined;

  /**
   * Calculates position, size, rotation, and outline from the wrapped content
   * @internal
   */
  protected _calculateOutline(): void;
}

/**
 * Extended LightContent that groups multiple child contents.
 * Calculates aggregate outline and spatial properties for virtual groups.
 */
export declare class LightContentGroup extends LightContent {
  protected _children: LightContent[];

  /**
   * Creates a new LightContentGroup instance
   * @param content - The parent/group content object
   * @param children - Array of child LightContent instances (defaults to empty array)
   * @param contentType - Optional content type override
   */
  constructor(
    content: IContent,
    children?: LightContent[],
    contentType?: string
  );

  /**
   * Gets all contents including parent and flattened children contents
   */
  getContents(): IContent[];

  /**
   * Gets the direct child LightContent instances
   */
  getChildren(): LightContent[];

  /**
   * Calculates aggregate outline for virtual groups by computing bounding box
   * from all child outlines, respecting rotation transformations
   * @internal
   */
  protected _calculateOutlineForVirtualGroup(): void;
}