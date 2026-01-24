/**
 * Color options for circle selector component
 */
export enum CircleSelectorColorType {
  /** Red color option */
  RED = "red",
  /** Blue color option */
  BLUE = "blue",
  /** Green color option */
  GREEN = "green"
}

/**
 * Property tree node data types
 */
export enum IPropertyTreeNodeType {
  /** Floating point number type */
  FLOAT = "FLOAT",
  /** Integer number type */
  INTEGER = "INTEGER",
  /** Boolean type */
  BOOLEAN = "BOOLEAN",
  /** String type */
  STRING = "STRING",
  /** Label type */
  LABEL = "label",
  /** Material type (note: original had typo "MATERIIAL") */
  MATERIAL = "MATERIIAL",
  /** Profile type */
  PROFILE = "PROFILE",
  /** Molding type with UUID identifier */
  MOLDING = "3c8b472e-f452-4bdc-a398-74c4047eddcc"
}

/**
 * Default size range constraints for dimensions
 */
export enum IDefaultSizeRange {
  /** Minimum allowed size value (0.001) */
  minSize = 0.001,
  /** Maximum allowed size value (9.999) */
  maxSize = 9.999
}

/**
 * Coordinate axis types for size dimensions
 */
export enum ISizeType {
  /** X-axis dimension */
  x = "x",
  /** Y-axis dimension */
  y = "y",
  /** Z-axis dimension */
  z = "z"
}