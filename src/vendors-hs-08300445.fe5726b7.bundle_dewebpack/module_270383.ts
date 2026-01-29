import { useLayoutEffect, useEffect } from 'react';

/**
 * Checks if the code is running in a browser environment
 */
function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

/**
 * Returns useLayoutEffect in browser environments, useEffect in SSR environments.
 * This prevents React warnings about useLayoutEffect during server-side rendering.
 */
const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;