/**
 * Module lifecycle management for a component or system.
 * Provides initialization, update, and cleanup functionality.
 * 
 * @module ComponentLifecycle
 */

/**
 * Initializes the component or system with given parameters.
 * Sets up initial state, binds event listeners, and prepares resources.
 * 
 * @param config - Configuration options for initialization
 * @returns Initialization result or void
 */
export declare function initialize(config?: unknown): unknown;

/**
 * Updates the component state or performs periodic maintenance tasks.
 * Called during the update cycle to refresh data or respond to changes.
 * 
 * @param deltaTime - Time elapsed since last update (optional)
 * @param data - Additional update data or context
 * @returns Update result or void
 */
export declare function update(deltaTime?: number, data?: unknown): unknown;

/**
 * Cleans up and destroys the component, releasing all resources.
 * Removes event listeners, clears references, and performs teardown operations.
 * 
 * @param force - Whether to force immediate destruction
 * @returns Cleanup result or void
 */
export declare function destroy(force?: boolean): unknown;

/**
 * Default export containing all lifecycle methods.
 */
declare const lifecycle: {
    /**
     * Initializes the component or system
     */
    initialize: typeof initialize;
    
    /**
     * Updates the component state
     */
    update: typeof update;
    
    /**
     * Destroys and cleans up the component
     */
    destroy: typeof destroy;
};

export default lifecycle;