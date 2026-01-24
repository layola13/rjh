/**
 * Toggleable Mixin Factory
 * Creates a Vue mixin for components that need toggle functionality (show/hide, open/close, etc.)
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Factory function that creates a toggleable mixin for Vue components
 * 
 * @param propName - The name of the prop that controls the toggle state (default: "value")
 * @param eventName - The name of the event to emit when toggle state changes (default: "input")
 * @returns A Vue component constructor with toggleable functionality
 * 
 * @example
 *