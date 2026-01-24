/**
 * CSS Motion module providing animation and transition utilities.
 * This module exports the main CSSMotion component along with CSSMotionList and Provider.
 * 
 * @module CSSMotion
 */

/**
 * CSS Motion List component for animating lists of elements.
 * Handles enter/leave animations for multiple items.
 */
export { default as CSSMotionList } from './CSSMotionList';

/**
 * Context provider for CSS Motion configuration.
 * Allows configuring motion behavior for child components.
 */
export { default as Provider } from './Provider';

/**
 * Main CSS Motion component for single element animations.
 * Provides declarative API for CSS transitions and animations.
 */
export { default } from './CSSMotion';

/**
 * Re-export default as named export for convenience.
 */
export { default as CSSMotion } from './CSSMotion';