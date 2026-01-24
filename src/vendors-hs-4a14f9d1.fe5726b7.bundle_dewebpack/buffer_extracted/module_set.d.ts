/**
 * Module: module_set
 * Original ID: set
 * 
 * Warning function that alerts when attempting to set properties on the Promise constructor
 * instead of the Promise instance. This is commonly encountered when using modularized builds.
 * 
 * @remarks
 * This function is typically invoked when developers incorrectly try to set properties
 * on the Promise object directly. Users should use `.then()` to access the instance.
 * See MODULARIZE documentation in src/settings.js for more details.
 */

/**
 * Emits a warning when a property is being set on the Promise object instead of an instance.
 * 
 * @param propertyName - The name of the property being set incorrectly
 * @param warningHandler - Function to handle/display the warning message
 * 
 * @example
 *