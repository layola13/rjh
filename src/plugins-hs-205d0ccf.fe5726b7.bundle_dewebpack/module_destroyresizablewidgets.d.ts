/**
 * Destroys all jQuery UI resizable widgets for snapshot elements.
 * Removes resizable functionality from elements with different directional positions.
 * 
 * @remarks
 * This function targets elements with class 'snapshotresizable' combined with
 * directional classes (top, bottom, left, right) and destroys their resizable behavior.
 * 
 * @returns void
 */
declare function destroyResizableWidgets(): void;

export { destroyResizableWidgets };