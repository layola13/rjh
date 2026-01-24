/**
 * Module: DoubleJudge
 * Judge system for evaluating furniture placement and compatibility
 */

import { Line2d, Vector2, MathAlg, Tolerance } from './math-library';
import { EnGroupReasonType } from './enums';
import { TypeConfigs, SofaConfigs, CurtainConfigs, getEntityTypesByConfigs } from './type-configs';

/**
 * Configuration for validation rules
 */
export interface ValidationConfig {
  /** Score value for the validation */
  score: number;
  /** Whether to check if the score is valid (>= 0) */
  checkValid?: boolean;
}

/**
 * Base configuration for judge rules
 */
export interface JudgeConfig {
  /** Configuration for floor placement validation */
  onTheFloor?: ValidationConfig;
  /** Configuration for wall placement validation */
  onTheWall?: ValidationConfig;
  /** Configuration for furniture adaptation/compatibility */
  adaptation?: ValidationConfig;
}

/**
 * Entity content structure with outline and z-coordinate
 */
export interface EntityContent {
  /** Z-coordinate (height) of the entity */
  z?: number;
  /** Outline points defining the entity's boundaries */
  outline: Array<{ x: number; y: number } | undefined>;
}

/**
 * Entity being judged
 */
export interface Entity {
  /** Unique identifier */
  id: string;
  /** Entity content with position and outline data */
  content: EntityContent;
}

/**
 * Result of a judgment evaluation
 */
export interface JudgeResult {
  /** Type of judgment reason */
  type: EnGroupReasonType;
  /** Calculated score */
  score: number;
  /** IDs of entities involved in this judgment */
  ids: string[];
  /** Whether this judgment result is valid */
  valid: boolean;
}

/**
 * Configuration entry mapping entity types to judge rules
 */
export interface JudgeConfigEntry {
  /** Entity types this configuration applies to */
  types: string[] | string[][];
  /** Judge configuration rules */
  config: JudgeConfig;
}

/**
 * Base abstract judge class for evaluating furniture placement
 */
export declare class Judge {
  /** Internal configuration with merged defaults */
  protected _config: Required<JudgeConfig>;

  /**
   * Creates a new Judge instance
   * @param config - Judge configuration options
   */
  constructor(config: JudgeConfig);

  /**
   * Gets the score value, optionally negated
   * @param config - Validation configuration containing the score
   * @param isPositive - Whether to return positive score (true) or negative (false)
   * @returns The score value
   */
  protected getScore(config: ValidationConfig, isPositive?: boolean): number;

  /**
   * Validates if a score meets the validation criteria
   * @param score - The score to validate
   * @param config - Validation configuration
   * @returns True if valid (checkValid is false or score >= 0)
   */
  protected getValid(score: number, config?: ValidationConfig): boolean;
}

/**
 * Judge for evaluating single entities against environment rules
 * Handles floor and wall placement validation
 */
export declare class SingleJudge extends Judge {
  /**
   * Executes judgment on a single entity
   * @param entity - The entity to evaluate
   * @param wallCurves - Array of wall curves for collision detection
   * @returns Array of judgment results
   */
  execute(entity: Entity, wallCurves: any[]): JudgeResult[];
}

/**
 * Judge for evaluating compatibility between two entities
 * Handles adaptation/compatibility scoring
 */
export declare class DoubleJudge extends Judge {
  /**
   * Executes judgment on two entities
   * @param entityA - First entity
   * @param entityB - Second entity
   * @returns Array of judgment results
   */
  execute(entityA: Entity, entityB: Entity): JudgeResult[];
}

/**
 * Predefined judge configurations for various furniture types
 * Maps entity types to their placement and compatibility rules
 */
export declare const configs: JudgeConfigEntry[];

/**
 * Default singleton judge instance for single entity evaluation
 */
export declare const defaultJudge: SingleJudge;

/**
 * Factory function to get appropriate judge class based on entity count
 * @param entities - Array of entities to judge
 * @returns DoubleJudge if 2 entities, otherwise SingleJudge
 */
export declare function getJudgeClass(entities: Entity[]): typeof DoubleJudge | typeof SingleJudge;