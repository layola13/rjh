import { useLayoutEffect, useEffect, useRef } from 'react';

/**
 * Determines if the code is running in a browser environment
 */
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Uses useLayoutEffect in browser environments, useEffect in SSR
 */
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Custom hook that runs an effect with knowledge of whether it's the initial mount or an update
 * @param effect - Callback function that receives a boolean indicating if it's the first render
 * @param deps - Dependency array for the effect
 */
const useLayoutUpdateEffect = (effect: (isFirstRender: boolean) => void | (() => void), deps?: React.DependencyList): void => {
  const isFirstRender = useRef<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    return effect(isFirstRender.current);
  }, deps);

  useIsomorphicLayoutEffect(() => {
    isFirstRender.current = false;
    return () => {
      isFirstRender.current = true;
    };
  }, []);
};

/**
 * Hook that only runs the effect on updates, skipping the initial mount
 * @param effect - Callback function to run on updates only
 * @param deps - Dependency array for the effect
 */
export const useLayoutUpdateEffectSkipFirst = (effect: () => void | (() => void), deps?: React.DependencyList): void => {
  useLayoutUpdateEffect((isFirstRender) => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};

export { useLayoutUpdateEffect };
export default useLayoutUpdateEffect;