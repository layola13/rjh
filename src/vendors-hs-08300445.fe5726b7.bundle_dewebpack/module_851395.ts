import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Checks if the code is running in a browser environment that supports layout effects
 */
function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

/**
 * Uses useLayoutEffect in browser environments, useEffect in SSR
 */
const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;

/**
 * Custom hook that runs an effect only on updates (skips the initial mount)
 * @param effect - Function to run on updates, receives a boolean indicating if it's the first render
 * @param dependencies - Dependency array for the effect
 */
function useLayoutUpdateEffect(
  effect: (isFirstRender: boolean) => void | (() => void),
  dependencies?: React.DependencyList
): void {
  const isFirstRenderRef = useRef<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    return effect(isFirstRenderRef.current);
  }, dependencies);

  useIsomorphicLayoutEffect(() => {
    isFirstRenderRef.current = false;
    return () => {
      isFirstRenderRef.current = true;
    };
  }, []);
}

/**
 * Runs an effect only after the first render (skips initial mount)
 * @param effect - Function to run on updates
 * @param dependencies - Dependency array for the effect
 */
function useUpdateEffect(
  effect: () => void | (() => void),
  dependencies?: React.DependencyList
): void {
  useLayoutUpdateEffect((isFirstRender: boolean) => {
    if (!isFirstRender) {
      return effect();
    }
  }, dependencies);
}

export { useLayoutUpdateEffect, useUpdateEffect };
export default useLayoutUpdateEffect;