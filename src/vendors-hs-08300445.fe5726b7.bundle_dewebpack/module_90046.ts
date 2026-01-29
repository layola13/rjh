import { useRef, useEffect } from 'react';

type TriggerOpenFn = (open: boolean) => void;
type GetElementsFn = () => Array<HTMLElement | null>;

interface ClickOutsideState {
  open: boolean;
  triggerOpen: TriggerOpenFn;
}

/**
 * Custom hook that triggers a callback when clicking outside of specified elements
 * @param getElements - Function that returns array of elements to monitor
 * @param open - Current open state
 * @param triggerOpen - Callback to update open state
 */
export default function useClickOutside(
  getElements: GetElementsFn,
  open: boolean,
  triggerOpen: TriggerOpenFn
): void {
  const stateRef = useRef<ClickOutsideState | null>(null);
  
  stateRef.current = {
    open,
    triggerOpen
  };

  useEffect(() => {
    function handleMouseDown(event: MouseEvent): void {
      let target = event.target as Node;

      // Handle Shadow DOM
      if ((target as HTMLElement).shadowRoot && event.composed) {
        const composedPath = event.composedPath();
        target = (composedPath[0] as Node) || target;
      }

      if (!stateRef.current?.open) {
        return;
      }

      const elements = getElements().filter((element): element is HTMLElement => 
        element !== null
      );

      const clickedOutside = elements.every((element) => 
        !element.contains(target) && element !== target
      );

      if (clickedOutside) {
        stateRef.current.triggerOpen(false);
      }
    }

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}