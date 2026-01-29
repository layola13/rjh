import { useRef, useEffect } from 'react';

interface TransitionEndNames {
  transitionEndName: string;
  animationEndName: string;
}

const transitionEndNames: TransitionEndNames = {
  transitionEndName: 'transitionend',
  animationEndName: 'animationend'
};

type EventHandler = (event: Event) => void;
type SetNodeFunction = (node: HTMLElement | null) => void;
type RemoveEventFunction = () => void;

export default function useTransitionEnd(
  callback: EventHandler
): [SetNodeFunction, RemoveEventFunction] {
  const nodeRef = useRef<HTMLElement | null>(null);

  function removeEventListeners(element: HTMLElement | null): void {
    if (!element) return;
    
    element.removeEventListener(transitionEndNames.transitionEndName, callback);
    element.removeEventListener(transitionEndNames.animationEndName, callback);
  }

  useEffect(() => {
    return () => {
      removeEventListeners(nodeRef.current);
    };
  }, []);

  const setNode: SetNodeFunction = (element) => {
    if (nodeRef.current && nodeRef.current !== element) {
      removeEventListeners(nodeRef.current);
    }

    if (element && element !== nodeRef.current) {
      element.addEventListener(transitionEndNames.transitionEndName, callback);
      element.addEventListener(transitionEndNames.animationEndName, callback);
      nodeRef.current = element;
    }
  };

  return [setNode, () => removeEventListeners(nodeRef.current)];
}