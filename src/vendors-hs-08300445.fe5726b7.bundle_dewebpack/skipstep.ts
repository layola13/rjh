export const SkipStep = false;
export const DoStep = true;

enum StepStatus {
  STEP_NONE = 'STEP_NONE',
  STEP_PREPARE = 'STEP_PREPARE',
  STEP_PREPARED = 'STEP_PREPARED',
  STEP_START = 'STEP_START',
  STEP_ACTIVE = 'STEP_ACTIVE',
  STEP_ACTIVATED = 'STEP_ACTIVATED'
}

type StepResult = typeof SkipStep | typeof DoStep | Promise<unknown> | void;

const FULL_STEPS: StepStatus[] = [
  StepStatus.STEP_PREPARE,
  StepStatus.STEP_START,
  StepStatus.STEP_ACTIVE,
  StepStatus.STEP_ACTIVATED
];

const SKIP_STEPS: StepStatus[] = [
  StepStatus.STEP_PREPARE,
  StepStatus.STEP_PREPARED
];

export function isActive(status: StepStatus): boolean {
  return status === StepStatus.STEP_ACTIVE || status === StepStatus.STEP_ACTIVATED;
}

export default function useStepController(
  trigger: unknown,
  shouldSkip: boolean,
  stepHandler: (currentStep: StepStatus) => StepResult
): [() => void, StepStatus] {
  const [currentStep, setCurrentStep] = React.useState<StepStatus>(StepStatus.STEP_NONE);
  const [executeAsync, cancelAsync] = useAsyncExecutor();

  const steps = shouldSkip ? SKIP_STEPS : FULL_STEPS;

  React.useEffect(() => {
    if (currentStep !== StepStatus.STEP_NONE && currentStep !== StepStatus.STEP_ACTIVATED) {
      const currentIndex = steps.indexOf(currentStep);
      const nextStep = steps[currentIndex + 1];
      const result = stepHandler(currentStep);

      if (result === SkipStep) {
        setCurrentStep(nextStep, true);
      } else if (nextStep) {
        executeAsync((cancelToken) => {
          const advanceToNext = (): void => {
            if (!cancelToken.isCanceled()) {
              setCurrentStep(nextStep, true);
            }
          };

          if (result === true) {
            advanceToNext();
          } else {
            Promise.resolve(result).then(advanceToNext);
          }
        });
      }
    }
  }, [trigger, currentStep]);

  React.useEffect(() => {
    return () => {
      cancelAsync();
    };
  }, []);

  const startSteps = (): void => {
    setCurrentStep(StepStatus.STEP_PREPARE, true);
  };

  return [startSteps, currentStep];
}

function useAsyncExecutor(): [(executor: (token: CancelToken) => void) => void, () => void] {
  // Implementation placeholder - assumes this creates a cancellable async executor
  const cancelTokenRef = React.useRef<CancelToken | null>(null);

  const execute = (executor: (token: CancelToken) => void): void => {
    const token: CancelToken = { isCanceled: () => cancelTokenRef.current !== token };
    cancelTokenRef.current = token;
    executor(token);
  };

  const cancel = (): void => {
    cancelTokenRef.current = null;
  };

  return [execute, cancel];
}

interface CancelToken {
  isCanceled(): boolean;
}