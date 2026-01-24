/**
 * Entity event types enumeration
 * Defines the types of events that can be triggered on entities
 */
export enum EntityEventType {
  /**
   * Event triggered when entity geometry changes
   */
  Geometry = "geometry",

  /**
   * Event triggered when entity position changes
   */
  Position = "position",

  /**
   * Event triggered when entity material changes
   */
  Material = "material",

  /**
   * Event triggered when entity display properties change
   */
  Display = "display",

  /**
   * Event triggered when entity preview state changes
   */
  Preview = "preview",

  /**
   * Event triggered when entity clipping changes
   */
  Clip = "clip"
}

/**
 * Frozen entity event type to prevent modifications
 */
export type FrozenEntityEventType = Readonly<typeof EntityEventType>;