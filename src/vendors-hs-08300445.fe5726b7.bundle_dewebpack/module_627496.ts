import { useEffect, useRef } from 'react';

type StepPhase = 'measure' | 'alignPre' | 'align' | 'motion' | 'stable' | null;

const STEP_QUEUE: readonly StepPhase[] = [
  'measure',
  'alignPre',
  'align',
  null,
  'motion'
] as const;

interface UseStepQueueReturn {
  currentPhase: StepPhase;
  nextStep: (callback?: () => void) => void;
}

/**
 * Custom hook to manage step-based animation queue
 * @param shouldMeasure - Trigger to restart the measurement phase
 * @param onMeasure - Callback executed during measure phase
 * @returns Tuple of current phase and step advancement function
 */
export default function useStepQueue(
  shouldMeasure: unknown,
  onMeasure: () => void
): [StepPhase, (callback?: () => void) => void] {
  const [currentPhase, setCurrentPhase] = useState<StepPhase>(null);
  const rafIdRef = useRef<number | undefined>();

  function updatePhase(nextPhase: StepPhase): void {
    setCurrentPhase(nextPhase);
  }

  function cancelPendingRaf(): void {
    if (rafIdRef.current !== undefined) {
      cancelAnimationFrame(rafIdRef.current);
    }
  }

  // Reset to measure phase when trigger changes
  useEffect(() => {
    updatePhase('measure');
  }, [shouldMeasure]);

  // Process step queue progression
  useEffect(() => {
    if (currentPhase === 'measure') {
      onMeasure();
    }

    if (currentPhase) {
      rafIdRef.current = requestAnimationFrame(async () => {
        const currentIndex = STEP_QUEUE.indexOf(currentPhase);
        const nextPhase = STEP_QUEUE[currentIndex + 1];
        
        if (nextPhase !== undefined && currentIndex !== -1) {
          updatePhase(nextPhase);
        }
      });
    }
  }, [currentPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelPendingRaf();
    };
  }, []);

  const nextStep = (callback?: () => void): void => {
    cancelPendingRaf();
    
    rafIdRef.current = requestAnimationFrame(() => {
      updatePhase((prevPhase) => {
        switch (prevPhase) {
          case 'align':
            return 'motion';
          case 'motion':
            return 'stable';
          default:
            return prevPhase;
        }
      });
      
      callback?.();
    });
  };

  return [currentPhase, nextStep];
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  const stateRef = useRef<T>(initialValue);
  const settersRef = useRef<Set<(value: T) => void>>(new Set());

  const setState = (newValue: T): void => {
    stateRef.current = newValue;
    settersRef.current.forEach(setter => setter(newValue));
  };

  return [stateRef.current, setState];
}

function requestAnimationFrame(callback: () => void | Promise<void>): number {
  return window.requestAnimationFrame(() => {
    void Promise.resolve(callback());
  });
}

function cancelAnimationFrame(id: number): void {
  window.cancelAnimationFrame(id);
}