/**
 * Factory for creating simple line shapes used in mullion tools.
 * Implements singleton pattern for global access.
 */
export declare class SimpleLineCreator {
  /**
   * Singleton instance accessor.
   * Lazily creates the instance on first access.
   */
  static get Instance(): SimpleLineCreator;

  /**
   * Base size constant used for shape calculations.
   * @default 800
   */
  readonly sizeConst: number;

  /**
   * Map of tool types to their corresponding shape factory functions.
   */
  private readonly slines: Record<ToolType, () => SimpleShape>;

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor();

  /**
   * Creates a simple line shape based on the specified tool type.
   * @param toolType - The type of mullion tool shape to create
   * @returns A new instance of the corresponding simple shape
   */
  create(toolType: ToolType): SimpleShape;

  /**
   * Creates an inner arc shape.
   * @returns A new SimpleInnerArc instance with the configured size constant
   */
  createInnerArc(): SimpleInnerArc;

  /**
   * Creates a half hexagon shape.
   * @returns A new SimpleHalfHexagon instance with the configured size constant
   */
  createHalfHexagon(): SimpleHalfHexagon;

  /**
   * Creates a wave shape composed of two mirrored arcs.
   * The wave uses a scaling factor of 1.25 and arc angles of ±π/6.
   * @returns A new SimpleWave instance with calculated arc paths
   */
  createWave(): SimpleWave;
}

/**
 * Enum defining available mullion tool types.
 */
export declare enum ToolType {
  mullion_inner_arc = 'mullion_inner_arc',
  mullion_half_hexagon = 'mullion_half_hexagon',
  mullion_wave = 'mullion_wave'
}

/**
 * Base type for simple shape objects.
 */
export declare type SimpleShape = SimpleInnerArc | SimpleHalfHexagon | SimpleWave;

/**
 * Represents an inner arc shape.
 */
export declare class SimpleInnerArc {
  constructor(sizeConst: number);
}

/**
 * Represents a half hexagon shape.
 */
export declare class SimpleHalfHexagon {
  constructor(sizeConst: number);
}

/**
 * Represents a wave shape composed of arc paths.
 */
export declare class SimpleWave {
  constructor(paths: ArcPath[]);
}

/**
 * Represents an arc path definition.
 */
export interface ArcPath {
  /** Center point of the arc */
  center: Point;
  /** Radius of the arc */
  radius: number;
  /** Start angle in radians */
  startAngle: number;
  /** End angle in radians */
  endAngle: number;
  /** Whether the arc is drawn counterclockwise */
  counterclockwise: boolean;
}

/**
 * Represents a 2D point.
 */
export interface Point {
  x: number;
  y: number;
}