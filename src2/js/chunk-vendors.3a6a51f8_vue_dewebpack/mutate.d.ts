/**
 * Vue directive for observing DOM mutations using MutationObserver API
 * @module Mutate
 */

/**
 * Configuration options for the MutationObserver
 */
export interface MutateOptions {
  /** Set to true to observe changes to attributes */
  attributes?: boolean;
  /** Set to true to observe additions and removals of child nodes */
  childList?: boolean;
  /** Set to true to extend monitoring to the entire subtree */
  subtree?: boolean;
  /** Set to true to observe changes to the character data */
  characterData?: boolean;
}

/**
 * Modifiers that can be applied to the v-mutate directive
 */
export interface MutateModifiers {
  /** If true, the observer will disconnect after the first mutation */
  once?: boolean;
  /** Shorthand for attributes option */
  attr?: boolean;
  /** Shorthand for childList option */
  child?: boolean;
  /** Shorthand for subtree option */
  sub?: boolean;
  /** Shorthand for characterData option */
  char?: boolean;
}

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
 * Value binding for the v-mutate directive
 * Can be either a handler function or an object with handler and options
 */
export type MutateValue =
  | MutateHandler
  | {
      /** The mutation handler function */
      handler: MutateHandler;
      /** Custom MutationObserver options */
      options?: MutateOptions;
    };

/**
 * Binding object passed to the directive hooks
 */
export interface MutateBinding {
  /** The value passed to the directive */
  value: MutateValue;
  /** Modifiers applied to the directive */
  modifiers?: MutateModifiers;
}

/**
 * Internal state stored on the element
 */
export interface MutateElementState {
  _mutate?: {
    /** The active MutationObserver instance */
    observer: MutationObserver;
  };
}

/**
 * Extended HTMLElement with mutate state
 */
export type MutateElement = HTMLElement & MutateElementState;

/**
 * Vue directive for observing DOM mutations
 * 
 * @example
 *