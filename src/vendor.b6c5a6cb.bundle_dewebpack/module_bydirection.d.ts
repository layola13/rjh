/**
 * Cardinal and intercardinal direction enumeration
 */
enum Direction {
  /** North */
  N = 'N',
  /** South */
  S = 'S',
  /** East */
  E = 'E',
  /** West */
  W = 'W',
  /** Northeast */
  NE = 'NE',
  /** Northwest */
  NW = 'NW',
  /** Southeast */
  SE = 'SE',
  /** Southwest */
  SW = 'SW'
}

/**
 * Determines the cardinal or intercardinal direction based on horizontal and vertical deltas.
 * 
 * Uses a 2:1 ratio threshold to distinguish between cardinal (N/S/E/W) and 
 * intercardinal (NE/NW/SE/SW) directions.
 * 
 * @param horizontalDelta - The horizontal displacement (positive = eastward, negative = westward)
 * @param verticalDelta - The vertical displacement (positive = southward, negative = northward)
 * @returns The direction enum value representing the dominant direction
 * 
 * @example
 *