import { useRef, useEffect } from 'react';
import useForceUpdate from './useForceUpdate';

interface ErrorState {
  errors: string[];
  visible: boolean;
}

export default function useErrorSync(
  errors: string[],
  onVisibilityChange: (visible: boolean) => void,
  immediate: boolean = false
): [boolean, string[]] {
  const stateRef = useRef<ErrorState>({
    errors: errors,
    visible: !!errors.length
  });

  const forceUpdate = useForceUpdate();

  const syncErrors = (): void => {
    const previousVisible = stateRef.current.visible;
    const currentVisible = !!errors.length;
    const previousErrors = stateRef.current.errors;

    stateRef.current.errors = errors;
    stateRef.current.visible = currentVisible;

    if (previousVisible !== currentVisible) {
      onVisibilityChange(currentVisible);
    } else {
      const errorsChanged =
        previousErrors.length !== errors.length ||
        previousErrors.some((error, index) => error !== errors[index]);

      if (errorsChanged) {
        forceUpdate();
      }
    }
  };

  useEffect(() => {
    if (!immediate) {
      const timeoutId = setTimeout(syncErrors, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [errors]);

  if (immediate) {
    syncErrors();
  }

  return [stateRef.current.visible, stateRef.current.errors];
}