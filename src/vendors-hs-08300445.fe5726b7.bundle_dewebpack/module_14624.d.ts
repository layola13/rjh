/**
 * Popup module export
 * 
 * This module re-exports the Popup component and provides a default export.
 * It serves as the main entry point for the Popup functionality.
 */

import PopupManager from './PopupManager';
import Popup from './Popup';

/**
 * Named export for the Popup component
 */
export { Popup };

/**
 * Default export pointing to the PopupManager
 */
export default PopupManager;

/**
 * Type definitions for the module exports
 */
export type { PopupManager, Popup };