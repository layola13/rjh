import { useRef, useEffect, RefObject } from 'react';

export interface DefaultProps {
  className: string;
  percent: number;
  prefixCls: string;
  strokeColor: string;
  strokeLinecap: 'round' | 'butt' | 'square';
  strokeWidth: number;
  style: Record<string, unknown>;
  trailColor: string;
  trailWidth: number;
}

export const defaultProps: DefaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};

export const useTransitionDuration = <T extends unknown[]>(
  elements: T
): RefObject<HTMLElement>[] => {
  const elementRefs = elements.map(() => useRef<HTMLElement>(null));
  const lastUpdateTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const currentTime = Date.now();
    let hasValidElement = false;

    elementRefs.forEach((elementRef) => {
      const element = elementRef.current;
      
      if (element) {
        hasValidElement = true;
        const { style } = element;
        style.transitionDuration = '.3s, .3s, .3s, .06s';
        
        const timeSinceLastUpdate = lastUpdateTimeRef.current 
          ? currentTime - lastUpdateTimeRef.current 
          : Infinity;
        
        if (lastUpdateTimeRef.current && timeSinceLastUpdate < 100) {
          style.transitionDuration = '0s, 0s';
        }
      }
    });

    if (hasValidElement) {
      lastUpdateTimeRef.current = Date.now();
    }
  });

  return elementRefs;
};