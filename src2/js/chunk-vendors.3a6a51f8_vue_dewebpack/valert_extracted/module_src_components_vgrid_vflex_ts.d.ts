/**
 * VFlex Component
 * 
 * A flexible grid component that provides flexbox-based layout capabilities.
 * Part of the VGrid component system.
 * 
 * @module VFlex
 */

/**
 * Creates a flex-based grid component with the specified name.
 * This component is built using the grid factory function with 'flex' configuration.
 * 
 * @remarks
 * This component automatically imports the necessary grid styles from _grid.sass
 * and utilizes the base grid functionality from the grid module.
 * 
 * @see {@link grid} for the underlying grid factory implementation
 */
declare const VFlex: ReturnType<typeof import('./grid').default>;

export default VFlex;

/**
 * Type definition for the grid factory function
 * 
 * @param name - The name identifier for the grid component (in this case, 'flex')
 * @returns A configured grid component instance
 */
export type GridFactory = (name: string) => unknown;