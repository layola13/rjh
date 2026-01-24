/**
 * Module: module_onLoad
 * 
 * Handles initialization logic that executes when the module is loaded.
 * This module provides a callback function that triggers resource registration
 * or initialization routines.
 */

/**
 * Callback function executed when the module loads.
 * Typically used to register resources, initialize services, or set up event handlers.
 * 
 * @returns {void}
 */
export type OnLoadCallback = () => void;

/**
 * Executes the onLoad initialization routine.
 * This function is automatically invoked when the module is loaded.
 * 
 * @returns {void}
 */
export declare function onLoad(): void;