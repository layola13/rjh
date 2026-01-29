import { useLayoutEffect, useEffect } from 'react';

export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' && 
  window.document !== undefined && 
  window.document.createElement !== undefined
    ? useLayoutEffect
    : useEffect;