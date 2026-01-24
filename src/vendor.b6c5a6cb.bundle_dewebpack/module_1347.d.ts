/**
 * @pixi/mixin-get-child-by-name - v5.2.4
 * 
 * Adds name property to DisplayObject and getChildByName method to Container.
 * This mixin allows retrieving child display objects by their assigned name.
 * 
 * @license MIT
 * @see http://www.opensource.org/licenses/mit-license
 */

declare module '@pixi/display' {
  /**
   * Display object with optional name property
   */
  interface DisplayObject {
    /**
     * The name of the display object instance.
     * Used for identification and retrieval via Container.getChildByName()
     * 
     * @default null
     */
    name: string | null;
  }

  /**
   * Container with child name lookup capability
   */
  interface Container {
    /**
     * Retrieves a child display object by its name property.
     * Performs a linear search through direct children only (non-recursive).
     * 
     * @param name - The name of the child to find
     * @returns The first child with matching name, or null if not found
     * 
     * @example
     *