/**
 * HitResult enum represents different types of hit test results in a window/frame system.
 * Used for determining which component was hit during interaction or collision detection.
 */
export enum HitResult {
  /** No component was hit */
  None = 0,
  
  /** Bar component (e.g., window frame bar or mullion) */
  Bar = 1,
  
  /** Glass pane component */
  Glass = 2,
  
  /** All components */
  All = 3,
  
  /** Control component (e.g., window handle or lock) */
  Control = 4,
  
  /** Sash component (movable window frame) */
  Sash = 5,
  
  /** Bead component (glazing bead that holds glass) */
  Bead = 6,
  
  /** Glass hole/opening component */
  GlassHole = 7
}