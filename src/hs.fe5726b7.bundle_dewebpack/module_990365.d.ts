/**
 * Autodesk User Module
 * 
 * This module re-exports the adskUser functionality from the internal
 * user management module along with constant utilities.
 * 
 * @module module_990365
 * @see module_873185 - Constant utilities module
 * @see module_377934 - Autodesk user management module
 */

/**
 * Side-effect import for module initialization
 * Module ID: 83506
 */
import './module_83506';

/**
 * Constant utility type/function
 * Imported from module 873185
 */
import type { constant } from './module_873185';

/**
 * Autodesk User type/class
 * Represents a user in the Autodesk ecosystem
 * Imported from module 377934
 */
import type { adskUser } from './module_377934';

/**
 * Default export: Autodesk User
 * 
 * Re-exports the adskUser entity which likely represents
 * user authentication, profile, or session management
 * functionality for Autodesk products.
 */
export default adskUser;

/**
 * Named export for direct access
 */
export { adskUser, constant };