/**
 * Module: module_blur
 * Original ID: blur
 * 
 * Handles blur event with delayed execution to check if focus moved outside the component.
 * If the active element is no longer contained within this component's element,
 * triggers collapse of all expandable items.
 * 
 * @param event - The blur event object
 */
declare function handleBlur(event: FocusEvent): void;

/**
 * Type definitions for the blur module
 */
declare module 'module_blur' {
  /**
   * Context interface for the component instance
   */
  interface ComponentContext {
    /** The root DOM element wrapped in jQuery/similar library */
    element: Array<HTMLElement>;
    
    /** Reference to the document object */
    document: Array<Document>;
    
    /**
     * Delays the execution of a callback function
     * @param callback - Function to be executed after delay
     */
    _delay(callback: () => void): void;
    
    /**
     * Collapses all expandable items in the component
     * @param event - The triggering event
     */
    collapseAll(event: FocusEvent): void;
  }

  /**
   * Blur event handler that collapses all items when focus leaves the component
   * 
   * @param this - The component instance context
   * @param event - The blur event object
   * 
   * @remarks
   * This function uses a delayed check to determine if the newly focused element
   * is still within the component's DOM hierarchy. If not, it triggers a collapse
   * of all expandable items.
   * 
   * @example
   *