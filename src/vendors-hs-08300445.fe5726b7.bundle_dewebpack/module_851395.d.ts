/**
 * React hook that executes an effect only on updates, skipping the initial mount.
 * Uses useLayoutEffect when available (browser environment), otherwise falls back to useEffect.
 * 
 * @module useLayoutUpdateEffect
 */

import { DependencyList, EffectCallback } from 'react';

/**
 * Callback function that receives a boolean indicating if this is the first render.
 * 
 * @param isFirstRender - True if this is the initial mount, false on subsequent updates
 * @returns Optional cleanup function to be called before the next effect or on unmount
 */
type UpdateEffectCallback = (isFirstRender: boolean) => ReturnType<EffectCallback>;

/**
 * Custom hook that runs an effect on layout updates, but skips the initial mount.
 * The effect callback receives a boolean parameter indicating whether it's the first render.
 * 
 * @param effect - Function to execute on updates, receives isFirstRender boolean
 * @param dependencies - Array of dependencies that trigger the effect when changed
 * 
 * @example
 *