/**
 * Module: module_get
 * Original ID: get
 * 
 * Accessor method that retrieves the asyncOnLoad property from the parent class.
 * This is typically used in component lifecycle management to handle asynchronous loading operations.
 */

/**
 * Type definition for the asyncOnLoad property
 * @remarks This property is inherited from a parent class and handles asynchronous load operations
 */
export type AsyncOnLoad = () => Promise<void> | void | boolean;

/**
 * Gets the asyncOnLoad handler from the parent class
 * @returns The asyncOnLoad property value from the superclass
 */
export declare function get(): AsyncOnLoad;

export default get;