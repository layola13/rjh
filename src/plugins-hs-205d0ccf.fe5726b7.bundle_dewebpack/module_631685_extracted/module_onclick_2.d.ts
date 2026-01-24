/**
 * Cancels the current command in the application's command manager.
 * This function is typically called in response to a click event to abort
 * any ongoing command execution.
 * 
 * @module module_onClick
 * @remarks
 * This is a handler function that accesses the HSApp singleton to retrieve
 * the application instance and invoke the cancel operation on its command manager.
 */
export declare function onClick(): void;