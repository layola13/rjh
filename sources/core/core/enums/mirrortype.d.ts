/**
 * Animation type enumeration
 * Defines the types of animations that can be applied
 */
export enum AnimationType {
  /** Rotation animation */
  rotation = "rotation",
  /** Translation (movement) animation */
  translation = "translation"
}

/**
 * Mirror type enumeration
 * Defines the axis along which mirroring can be applied
 */
export enum MirrorType {
  /** Horizontal mirroring (flip along X-axis) */
  Horizontal = "horizontal",
  /** Vertical mirroring (flip along Y-axis) */
  Vertical = "vertical"
}