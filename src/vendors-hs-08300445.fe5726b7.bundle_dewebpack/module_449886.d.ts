/**
 * React Redux context hook
 * Provides access to the Redux store context in functional components
 */

import { useContext } from 'react';
import { ReactReduxContext } from './ReactReduxContext';
import type { ReactReduxContextValue } from './types';

/**
 * A hook to access the Redux store context.
 * 
 * @returns The Redux context value containing the store and subscription
 * @throws {Error} If used outside of a Redux Provider
 * 
 * @example
 *