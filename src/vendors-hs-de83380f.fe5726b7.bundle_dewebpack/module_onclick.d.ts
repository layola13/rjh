/**
 * Click event handler module
 * 
 * Handles click events by:
 * 1. Invoking the onClick callback from props if it exists
 * 2. Triggering focus selection if focusOnSelect is available
 * 
 * @module onClick
 */

/**
 * Props interface containing the onClick callback
 */
interface ComponentProps {
  /** Optional click event handler */
  onClick?: (event: MouseEvent | React.MouseEvent) => void;
}

/**
 * Component or element reference with props
 */
interface ComponentReference {
  /** Component props containing event handlers */
  props?: ComponentProps;
}

/**
 * Context or parent element with focus selection capability
 */
interface FocusableContext {
  /** 
   * Function to handle focus selection on a specific item
   * @param index - The index or identifier of the item to focus
   */
  focusOnSelect?: (index: number | string) => void;
}

/**
 * Click event handler that delegates to component props and handles focus
 * 
 * @param event - The click event from the DOM or React
 * @param componentRef - Reference to the component with props
 * @param context - Context containing focus selection logic
 * @param itemIndex - Index or identifier of the clicked item
 */
declare function handleClickEvent(
  event: MouseEvent | React.MouseEvent,
  componentRef: ComponentReference,
  context: FocusableContext,
  itemIndex: number | string
): void;

export { handleClickEvent, ComponentProps, ComponentReference, FocusableContext };