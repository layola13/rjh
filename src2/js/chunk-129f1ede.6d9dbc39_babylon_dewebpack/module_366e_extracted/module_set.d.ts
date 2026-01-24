/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets the dirty state of the right card component.
 * This method is typically used to track unsaved changes in the UI.
 */

/**
 * Reference to a component with an is_dirty property
 */
interface RightCardRef {
  /** Indicates whether the component has unsaved changes */
  is_dirty: boolean;
}

/**
 * Component references containing the right_card element
 */
interface ComponentRefs {
  /** Reference to the right card component */
  right_card: RightCardRef;
}

/**
 * Sets the dirty state of the right card component
 * @param isDirty - Boolean flag indicating whether the component has unsaved changes
 */
declare function setRightCardDirtyState(this: { $refs: ComponentRefs }, isDirty: boolean): void;

export { RightCardRef, ComponentRefs, setRightCardDirtyState };