/**
 * Enum-like object containing special board type identifiers.
 * Used to distinguish between fake doors and seal boards in the application.
 */
export const A = {
  /**
   * Identifier for fake door board type.
   * Fake doors are non-functional decorative elements that appear as doors.
   */
  FakeDoor: 61,

  /**
   * Identifier for seal board type.
   * Seal boards are used to close off or seal specific areas.
   */
  SealBoard: 62
} as const;

/**
 * Type representing the board type identifiers.
 */
export type BoardType = typeof A[keyof typeof A];

/**
 * Type-safe keys for board types.
 */
export type BoardTypeKey = keyof typeof A;