/**
 * Module: module_onclick
 * Original ID: onclick
 * 
 * Event handler module for delete button click operations.
 */

/**
 * Interface representing an object with delete button click handling capability
 */
interface IDeleteButtonHandler {
  /**
   * Internal handler for delete button click events
   * Handles the logic when a delete button is clicked
   * @internal
   */
  _deleteBtnClkHandler(): void;
}

/**
 * OnClick handler function for delete operations
 * Invokes the internal delete button click handler
 * 
 * @param this - Context object containing the delete button handler
 * @returns void
 */
declare function onClickHandler(this: IDeleteButtonHandler): void;

/**
 * Module exports for onclick functionality
 */
declare module 'module_onclick' {
  export { IDeleteButtonHandler, onClickHandler };
  export default onClickHandler;
}