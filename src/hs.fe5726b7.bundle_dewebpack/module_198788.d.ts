/**
 * Mapping configuration for property name transformations.
 * Defines the correspondence between camelCase and snake_case naming conventions.
 */
export interface PropertyNameMapping {
  /** Maps camelCase 'timeCreated' to snake_case 'time_created' */
  readonly timeCreated: "time_created";
  
  /** Maps camelCase 'timeModified' to snake_case 'time_modified' */
  readonly timeModified: "time_modified";
  
  /** Property name for neighbor identifier (no transformation) */
  readonly neighborName: "neighborName";
}

/**
 * Frozen object containing property name mappings.
 * Used for consistent property name transformations across the application.
 * 
 * @example
 *