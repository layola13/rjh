/**
 * VCheckbox Component Module
 * 
 * Provides checkbox components for Vuetify framework.
 * Includes standard checkbox with full features and a simplified version.
 */

import VCheckbox from './VCheckbox';
import VSimpleCheckbox from './VSimpleCheckbox';

/**
 * Standard checkbox component with full Vuetify features
 * Supports v-model binding, validation, labels, and theming
 */
export { VCheckbox };

/**
 * Simplified checkbox component with minimal features
 * Lightweight alternative for basic checkbox needs
 */
export { VSimpleCheckbox };

/**
 * Default export containing all checkbox subcomponents
 * Used for Vuetify plugin registration
 */
export default {
  /**
   * Map of Vuetify checkbox subcomponents
   * Registered automatically when importing the module
   */
  $_vuetify_subcomponents: {
    VCheckbox,
    VSimpleCheckbox
  }
};