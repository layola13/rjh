/**
 * Represents a coordinate axis enumeration.
 * Defines the three primary axes in 3D space.
 * @enum {string}
 */
export enum Axis {
  /** The X-axis (horizontal) */
  X = "x",
  /** The Y-axis (vertical) */
  Y = "y",
  /** The Z-axis (depth) */
  Z = "z"
}

/**
 * Type representing all possible axis values.
 */
export type AxisValue = Axis.X | Axis.Y | Axis.Z;

/**
 * Type representing the axis keys.
 */
export type AxisKey = keyof typeof Axis;

/**
 * Default export of the Axis enumeration.
 * This object is frozen and immutable.
 */
export const A: Readonly<typeof Axis> = Object.freeze(Axis);

export default A;