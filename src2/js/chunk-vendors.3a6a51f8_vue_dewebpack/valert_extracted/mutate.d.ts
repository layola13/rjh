/**
 * Vue directive for observing DOM mutations using MutationObserver API
 * @module Mutate
 */

/**
 * Handler function called when mutations are observed
 * @param mutations - Array of MutationRecord objects describing the mutations
 * @param observer - The MutationObserver instance that triggered the callback
 */
export type MutateHandler = (
  mutations: MutationRecord[],
  observer: MutationObserver
) => void;

/**
 * Configuration options for the MutationObserver
 */
export interface MutateOptions {
  /** Set to true to observe changes to the target's attributes */
  attributes?: boolean;
  /** Set to true to observe additions/removals of child nodes */
  childList?: boolean;
  /** Set to true to extend monitoring to entire subtree */
  subtree?: boolean;
  /** Set to true to observe changes to text content */
  characterData?: boolean;
}

/**
 * Object-based value for the mutate directive
 */
export interface MutateValue {
  /** The callback function to execute on mutations */
  handler: MutateHandler;
  /** Optional MutationObserver configuration options */
  options?: MutateOptions;
}

/**
 * Modifiers available for the mutate directive
 */
export interface MutateModifiers {
  /** Execute the handler only once, then disconnect the observer */
  once?: boolean;
  /** Observe attribute changes */
  attr?: boolean;
  /** Observe child node changes */
  child?: boolean;
  /** Observe subtree changes */
  sub?: boolean;
  /** Observe character data changes */
  char?: boolean;
}

/**
 * Internal state stored on the element
 */
interface MutateState {
  /** The MutationObserver instance */
  observer: MutationObserver;
}

/**
 * Extended HTMLElement with internal mutate state
 */
interface MutateElement extends HTMLElement {
  _mutate?: MutateState;
}

/**
 * Vue directive binding context
 */
export interface DirectiveBinding {
  /** The value passed to the directive */
  value: MutateHandler | MutateValue;
  /** Object containing modifiers */
  modifiers: MutateModifiers;
}

/**
 * Vue directive for monitoring DOM mutations
 * 
 * @example
 *