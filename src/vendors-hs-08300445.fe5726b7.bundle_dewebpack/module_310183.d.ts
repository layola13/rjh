/**
 * Layout state management and timeout lock hooks for React components
 * @module LayoutStateHooks
 */

import { Dispatch, SetStateAction } from 'react';

/**
 * State update function that receives the previous state and returns the next state
 * @template T - The type of the state
 */
export type StateUpdater<T> = (prevState: T) => T;

/**
 * Hook that manages layout state with batched updates
 * 
 * This hook provides a way to batch multiple state updates together and
 * execute them asynchronously to optimize performance and avoid unnecessary re-renders.
 * 
 * @template T - The type of the state value
 * @param initialState - The initial state value
 * @returns A tuple containing:
 *   - [0]: The current state value (readonly ref)
 *   - [1]: A function to queue state updates
 * 
 * @example
 *