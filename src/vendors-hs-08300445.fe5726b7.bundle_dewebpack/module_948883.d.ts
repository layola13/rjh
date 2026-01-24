/**
 * SelectOptGroup component
 * A utility component that represents an option group in a select element.
 * This component renders nothing but serves as a type marker for select option groups.
 */

/**
 * SelectOptGroup component interface
 * Returns null as this is a marker component that doesn't render anything
 * 
 * @returns {null} Always returns null
 */
interface SelectOptGroupComponent {
  (): null;
  /**
   * Type marker to identify this component as a SelectOptGroup
   * Used for type checking and component identification in select elements
   */
  isSelectOptGroup: boolean;
}

/**
 * SelectOptGroup component
 * A marker component for grouping options in select elements.
 * Does not render any visual output but provides type information.
 * 
 * @example
 *