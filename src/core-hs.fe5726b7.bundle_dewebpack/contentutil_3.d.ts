import type { Opening } from './Opening';
import type { Wall } from './Wall';
import type { Slab } from './Slab';
import type { Bound } from './Bound';
import type { Logger } from './Logger';

/**
 * 2D point coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * SVG path command representation
 */
interface PathCommand {
  /** Command type: M(move), L(line), C(cubic bezier), Q(quadratic bezier) */
  cmd: 'M' | 'L' | 'C' | 'Q';
  /** Command arguments as string */
  arg: string;
}

/**
 * Opening entity with profile and swing properties
 */
export interface OpeningEntity {
  profile?: string;
  swing?: number;
  metadata?: {
    contentType: ContentType;
  };
  contentType?: ContentType;
  getHost?: () => Wall | Slab | unknown;
}

/**
 * Content type enumeration checker
 */
export interface ContentType {
  isTypeOf(type: string | string[]): boolean;
}

/**
 * Utility class for content type checking and geometric operations on openings
 */
export declare const ContentUtil: {
  /**
   * Check if the entity is a wall niche
   * @param entity - The entity to check
   * @returns True if entity is a wall niche
   */
  isWallNiche(entity: unknown): entity is Opening;

  /**
   * Check if the entity is a slab hole
   * @param entity - The entity to check
   * @returns True if entity is a slab hole
   */
  isSlabHole(entity: unknown): boolean;

  /**
   * Check if the entity is a slab opening
   * @param entity - The entity to check
   * @returns True if entity is a slab opening
   */
  isSlabOpening(entity: unknown): entity is Opening;

  /**
   * Check if the entity is a wall opening
   * Validates both content type and host type
   * @param entity - The entity to check
   * @returns True if entity is a wall opening
   */
  isWallOpening(entity: unknown): entity is Opening;

  /**
   * Check if the entity is a slab niche
   * @param entity - The entity to check
   * @returns True if entity is a slab niche
   */
  isSlabNiche(entity: unknown): entity is Opening;

  /**
   * Get the centered profile of an opening
   * Parses the SVG path and translates points to center origin
   * @param entity - The opening entity with profile data
   * @returns Array of centered points, or undefined if no profile
   */
  getOpeningCenterProfile(entity: OpeningEntity): Point2D[] | undefined;

  /**
   * Check if the entity is any type of niche (wall or slab)
   * @param entity - The entity to check
   * @returns True if entity is a niche
   */
  isNiche(entity: unknown): entity is Opening;

  /**
   * Parse SVG path string into array of 2D points
   * Supports M(move), L(line), C(cubic bezier), Q(quadratic bezier) commands
   * @param pathString - SVG path data string
   * @returns Array of parsed points
   */
  parse(pathString: string | undefined): Point2D[];

  /**
   * Parse opening profile considering swing direction
   * Mirrors profile horizontally for swing values 2 and 3
   * @param entity - Opening entity with profile and swing properties
   * @returns Array of profile points
   */
  parseOpeningProfile(entity: OpeningEntity): Point2D[];

  /**
   * Validate if host-opening combination is valid for walls
   * @param host - The host entity
   * @param opening - The opening entity
   * @returns True if host is a wall and opening is a wall opening
   */
  isValidWallOpeningHost(host: unknown, opening: unknown): boolean;

  /**
   * Validate if host-opening combination is valid for slabs
   * @param host - The host entity
   * @param opening - The opening entity
   * @returns True if host is a slab and opening is a slab opening
   */
  isValidSlabOpeningHost(host: unknown, opening: unknown): boolean;

  /**
   * Check if the entity is a wainscot
   * @param entity - The entity to check
   * @returns True if entity is a wainscot
   */
  isWainscot(entity: unknown): boolean;
};