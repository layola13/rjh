/**
 * Internal marker constant used by RC Select component to identify internal properties.
 * This marker helps distinguish between user-provided props and internally-managed props.
 * 
 * @module INTERNAL_PROPS_MARK
 * @internal
 */

/**
 * Unique string constant used to mark internal properties in RC Select component.
 * Components can use this marker to filter out or specially handle internal props
 * that should not be exposed to end users.
 * 
 * @constant
 * @type {string}
 */
export declare const INTERNAL_PROPS_MARK: "RC_SELECT_INTERNAL_PROPS_MARK";