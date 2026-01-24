import { CommonOptions } from './module_22777';

/**
 * Content type filter for rule matching
 */
type ContentType = string | { isTypeOf(types: ContentType[]): boolean };

/**
 * Category identifier
 */
type Category = string;

/**
 * Light type enumeration
 */
declare enum LightTypeEnum {
  SpotLight = 'SpotLight',
  FlatLight = 'FlatLight'
}

/**
 * 3D vector with x, y, z coordinates
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D vector with x, y coordinates
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * Size dimensions
 */
interface Size {
  x: number;
  y: number;
  length: number;
  width: number;
}

/**
 * Line segment defined by two points
 */
interface Edge {
  p0: Vector3;
  p1: Vector3;
}

/**
 * Computed light result
 */
interface LightResult {
  /** Light type */
  type: LightTypeEnum;
  /** Color temperature in Kelvin */
  temperature: number;
  /** Light intensity */
  intensity: number;
  /** Position in 3D space */
  position: Vector3;
  /** Height from floor */
  height: number;
  /** IES light profile identifier */
  ies: string;
  /** Source rule type */
  ruleType?: string;
  /** Source content type */
  sourceContentType?: ContentType;
  /** Optional size dimensions */
  size?: Size;
}

/**
 * Rule configuration
 */
interface RuleConfig {
  /** Allowed content types */
  contentTypes?: ContentType[];
  /** Allowed categories */
  categories?: Category[];
}

/**
 * Render template configuration
 */
interface RenderOptions {
  /** Template identifier (e.g., 'night', 'realistic', 'nature_3') */
  templateKey: string;
}

/**
 * Content entity that can be visited by rules
 */
interface ContentEntity {
  /** Get the content type */
  contentType(): ContentType | null;
  /** Get associated categories */
  getCategories(): Category[];
  /** Get geometric outline */
  getGeometry(): Vector2[];
  /** Get room edges */
  getEdges(): Edge[];
}

/**
 * Room/space entity
 */
interface RoomEntity {
  /** Get ceiling height */
  getCeilingHeight(): number;
  /** Get physical light entities in the room */
  getPhysicalLights(): PhysicalLight[];
  /** Get associated categories */
  getCategories(): Category[];
}

/**
 * Physical light entity
 */
interface PhysicalLight {
  /** Get content type */
  contentType(): ContentType | null;
  /** Get 3D position */
  getPosition(): Vector3;
  /** Get size dimensions */
  getSize(): Size;
  /** Get 2D outline polygon */
  getOutline(): Vector2[];
}

/**
 * Result of closest edge calculation
 */
interface ClosestEdgeResult {
  /** The nearest edge, if found */
  closestEdge?: Edge;
  /** Distance to the closest edge */
  distance: number;
}

/**
 * Abstract base class for lighting rules in the rendering system.
 * Implements the Visitor pattern to process content entities and generate lighting suggestions.
 */
export default class BaseLightingRule {
  /** Allowed content types for this rule */
  private _contentTypes: ContentType[];
  
  /** Allowed categories for this rule */
  private _categories: Category[];
  
  /** Rule execution priority (higher values execute first) */
  private _priority: number;
  
  /** Rule configuration */
  private _config: RuleConfig;
  
  /** Rule type identifier */
  private _ruleType: string;

  /**
   * Creates a new lighting rule instance
   * @param config - Rule configuration
   * @param ruleType - Unique rule type identifier
   * @param priority - Execution priority (default: 10)
   */
  constructor(config: RuleConfig, ruleType: string, priority?: number);

  /**
   * Visit a content entity and compute lighting suggestions
   * @param entity - Content entity to process
   * @param room - Room context
   * @param renderOptions - Render template settings
   * @param additionalContext - Additional context data
   * @returns Array of computed light results, or null if not interested
   */
  visit(
    entity: ContentEntity,
    room: RoomEntity,
    renderOptions: RenderOptions,
    additionalContext: unknown
  ): LightResult[] | null;

  /**
   * Get rule execution priority
   * @returns Priority value
   */
  priority(): number;

  /**
   * Get rule type identifier
   * @returns Rule type string
   */
  getRuleType(): string;

  /**
   * Set allowed content types
   * @param contentTypes - Array of content types
   */
  setContentTypes(contentTypes: ContentType[]): void;

  /**
   * Set allowed categories
   * @param categories - Array of category identifiers
   */
  setCategories(categories: Category[]): void;

  /**
   * Initialize rule from configuration
   */
  init(): void;

  /**
   * Check if this rule is interested in the given entity
   * @param entity - Content entity to check
   * @returns True if rule should process this entity
   */
  protected _interested(entity: ContentEntity): boolean;

  /**
   * Check if entity belongs to specified categories
   * @param categories - Categories to check
   * @param entity - Entity to test
   * @returns True if entity is in any of the categories
   */
  protected _isInCategory(categories: Category[], entity: ContentEntity): boolean;

  /**
   * Compute lighting suggestions for the entity (must be overridden by subclasses)
   * @param entity - Content entity
   * @param room - Room context
   * @param renderOptions - Render settings
   * @param additionalContext - Additional context
   * @returns Array of light results, or null
   */
  protected _compute(
    entity: ContentEntity,
    room: RoomEntity,
    renderOptions: RenderOptions,
    additionalContext: unknown
  ): LightResult[] | null;

  /**
   * Adjust position to stay within entity bounds with offset
   * @param position - Original position
   * @param entity - Target entity
   * @param offset - Offset distance from edge
   * @returns Adjusted position, or null if adjustment failed
   */
  protected _adjustPosition(
    position: Vector2,
    entity: ContentEntity,
    offset: number
  ): Vector2 | null;

  /**
   * Validate if light result meets template-specific requirements
   * @param lightResult - Light to validate
   * @param room - Room context
   * @param renderOptions - Render settings
   * @returns True if light is valid
   */
  protected _isValid(
    lightResult: LightResult,
    room: RoomEntity,
    renderOptions: RenderOptions
  ): boolean;

  /**
   * Calculate default light height based on room ceiling
   * @param room - Room entity
   * @returns Recommended light height
   */
  protected getDefaultHeight(room: RoomEntity): number;

  /**
   * Generate default light configuration for an entity
   * @param entity - Content entity
   * @param room - Room context
   * @param renderOptions - Render settings
   * @returns Default light configuration
   */
  protected getDefaultLight(
    entity: ContentEntity,
    room: RoomEntity,
    renderOptions: RenderOptions
  ): LightResult;

  /**
   * Find the closest edge to a point in a specific direction
   * @param entity - Content entity with edges
   * @param point - Reference point
   * @param direction - Direction vector to filter edges
   * @returns Closest edge and distance
   */
  protected getClosestEdge(
    entity: ContentEntity,
    point: Vector2,
    direction: Vector2
  ): ClosestEdgeResult;
}