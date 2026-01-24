/**
 * Warning function for incorrect Promise usage
 * 
 * This function is triggered when attempting to access a property on the Promise object
 * instead of the resolved instance. It provides guidance to use .then() for proper instance access.
 * 
 * @see MODULARIZE documentation in src/settings.js for more details
 */
declare function moduleGet(): void;

export default moduleGet;