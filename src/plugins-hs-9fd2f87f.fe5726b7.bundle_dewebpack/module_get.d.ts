/**
 * Gets the room instance associated with this object.
 * 
 * @returns The room object
 * 
 * @remarks
 * This is a getter method that provides read-only access to the internal room state.
 * 
 * @module module_get
 * @originalId get
 */
declare function get<TRoom = unknown>(): TRoom;