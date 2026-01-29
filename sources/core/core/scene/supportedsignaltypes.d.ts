/**
 * Defines the types of relationships between entities in the system.
 * These relationships describe how different objects or elements are connected.
 */
export enum RelationshipType {
  /**
   * Represents a sweep path relationship, typically used in 3D modeling
   * to define the trajectory along which a shape is swept.
   */
  SweepPath = "SweepPath",

  /**
   * Indicates whether a face is visible in the current view or context.
   */
  FaceVisible = "FaceVisible",

  /**
   * Determines if content is located within a specific room or space.
   */
  IsContentInRoom = "IsContentInRoom"
}

/**
 * Enumeration of supported signal types for event-driven communication.
 * These signals are used to notify listeners about state changes in the system.
 */
export enum SupportedSignalTypes {
  /**
   * Signal emitted when an object's state becomes dirty and needs re-evaluation.
   */
  Dirty = "signalDirty",

  /**
   * Signal fired when a child element is added to a parent container.
   */
  ChildAdded = "signalChildAdded",

  /**
   * Signal fired when a child element is removed from a parent container.
   */
  ChildRemoved = "signalChildRemoved",

  /**
   * Signal emitted when the host of an object changes.
   */
  HostChanged = "signalHostChanged",

  /**
   * Signal fired when a field value is modified.
   */
  FieldChanged = "signalFieldChanged"
}