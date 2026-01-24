/**
 * Event handler for click events on anchor elements within disabled UI state containers.
 * Prevents the default action when clicking links inside elements with the 'ui-state-disabled' class.
 * 
 * @remarks
 * This handler is typically used in UI frameworks to disable interactive elements
 * while maintaining their visual presence in the DOM.
 * 
 * @param event - The mouse event triggered by clicking the anchor element
 * @returns void
 */
declare function handleDisabledStateClick(event: MouseEvent): void;