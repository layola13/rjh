import * as React from 'react';

interface BrowserEnvironment {
  isBrowserClient: boolean;
}

declare const browserEnv: BrowserEnvironment;

type EffectCallback = () => void | (() => void);
type DependencyList = ReadonlyArray<unknown>;

export default function useIsomorphicLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  if (browserEnv.isBrowserClient) {
    React.useLayoutEffect(effect, deps);
  } else {
    React.useEffect(effect, deps);
  }
}