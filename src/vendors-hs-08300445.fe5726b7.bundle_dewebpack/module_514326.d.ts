/**
 * React child mapping utilities for managing transitions and animations.
 * Provides functions to extract and merge React child element mappings by key.
 * 
 * @module ChildMappingUtils
 */

import { ReactNode, ReactElement } from 'react';

/**
 * Mapping of React element keys to their corresponding elements.
 * Used to track child components during transition states.
 */
export type ChildMapping = Record<string, ReactElement>;

/**
 * Extracts a mapping of React children indexed by their keys.
 * 
 * This function converts a ReactNode (which may be a single element, array, or fragment)
 * into a flat object where keys are the React element keys and values are the elements themselves.
 * 
 * @param children - React children to process (single element, array, fragment, or null/undefined)
 * @returns Object mapping element keys to elements, or the original input if falsy
 * 
 * @example
 *