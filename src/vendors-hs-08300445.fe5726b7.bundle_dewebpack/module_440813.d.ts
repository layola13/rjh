/**
 * Redux dispatch hook utilities
 * Provides hooks for accessing the Redux store's dispatch function in React components
 */

import type { Dispatch, AnyAction } from 'redux';
import type { Context } from 'react';
import type { ReactReduxContextValue } from './ReactReduxContext';

/**
 * Creates a custom dispatch hook bound to a specific Redux context
 * 
 * @template S - The type of the Redux store state
 * @template A - The type of actions that can be dispatched (defaults to AnyAction)
 * @param context - The React context containing the Redux store (defaults to ReactReduxContext)
 * @returns A hook that returns the dispatch function from the store
 * 
 * @example
 *