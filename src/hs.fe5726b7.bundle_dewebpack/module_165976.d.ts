/**
 * Version type enumeration for distinguishing between normal and hidden versions.
 * This object is frozen to prevent modifications at runtime.
 */
export declare const VersionType: {
  /**
   * Represents a normal/standard version type.
   * Used for regular version tracking and display.
   */
  readonly NormalVersionType: 1;
  
  /**
   * Represents a hidden version type.
   * Used for internal or draft versions that should not be publicly visible.
   */
  readonly HiddenVersionType: 2;
};

/**
 * Type alias for version type values.
 * Can be either 1 (Normal) or 2 (Hidden).
 */
export type VersionTypeValue = typeof VersionType[keyof typeof VersionType];