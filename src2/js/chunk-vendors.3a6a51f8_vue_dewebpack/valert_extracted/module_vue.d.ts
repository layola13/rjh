/**
 * Vue.js external module declaration
 * 
 * This module represents the Vue.js library as an external dependency.
 * It is expected to be provided by the runtime environment rather than bundled.
 * 
 * @module vue
 * @see https://vuejs.org/
 */

/**
 * The main Vue constructor and API surface.
 * 
 * In UMD/browser environments, this is available as the global `Vue` object.
 * In CommonJS/Node environments, it's imported via require('vue').
 * In AMD environments, it's loaded as the 'vue' module.
 */
declare const vue: typeof import('vue');

export = vue;