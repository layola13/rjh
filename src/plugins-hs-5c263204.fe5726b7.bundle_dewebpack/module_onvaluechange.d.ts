/**
 * Value change handler module
 * Handles numeric value changes by delegating to the underlying number change handler
 * @module module_onValueChange
 */

/**
 * Handles value changes and propagates them to the number change listener
 * @param value - The new numeric value
 */
export function onValueChange(value: number): void;

/**
 * Alternative: If this is a callback type definition
 */
export type OnValueChangeCallback = (value: number) => void;