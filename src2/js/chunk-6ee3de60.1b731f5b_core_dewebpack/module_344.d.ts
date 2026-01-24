/**
 * US English language translations map for architectural/construction UI elements.
 * 
 * Provides localized strings for building design parameters including:
 * - Dimensional properties (padding, gap, height, radius)
 * - Directional indicators (up, down, left, right)
 * - Positioning (inside, outside, ground level)
 * - Geometric measurements (arc length, chord length)
 * 
 * @module USLanguageTranslations
 */

/**
 * Immutable map of translation keys to US English display strings.
 * Used for rendering UI labels and tooltips in construction/architecture applications.
 */
export const usLang: ReadonlyMap<string, string> = new Map<string, string>([
  /** Base elevation reference point */
  ["groundLevel", "ground level"],
  
  /** Vertical spacing label with top/bottom clarification */
  ["padding", "Padding(Top/Bottom): "],
  
  /** Spacing between elements label */
  ["gap", "Gap:"],
  
  /** Surface finish/orientation status */
  ["faced", "Faced"],
  
  /** Upward direction indicator */
  ["up", "Up"],
  
  /** Downward direction indicator */
  ["down", "Down"],
  
  /** Left direction indicator */
  ["left", "Left"],
  
  /** Right direction indicator */
  ["right", "Right"],
  
  /** Bidirectional indicator */
  ["both", "Both"],
  
  /** Interior positioning */
  ["inside", "INSIDE"],
  
  /** Exterior positioning */
  ["outside", "OUTSIDE"],
  
  /** Delta symbol for height variation (△) */
  ["pulling_height", "△"],
  
  /** Vertical measurement of arch curve */
  ["arch_height", "arch height"],
  
  /** Circular arc radius measurement */
  ["radius", "radius"],
  
  /** Curved distance along arc perimeter */
  ["arc_length", "arc length"],
  
  /** Straight-line distance across arc endpoints */
  ["chord_length", "chord"]
]);