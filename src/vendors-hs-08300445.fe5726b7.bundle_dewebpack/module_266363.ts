import { useRef, useEffect, useMemo } from 'react';
import { useEvent } from './useEvent';
import { useState } from './useState';
import { useMountedState } from './useMountedState';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useStepQueue, SkipStep, DoStep, isActive } from './useStepQueue';

const STATUS_NONE = 'none';
const STATUS_APPEAR = 'appear';
const STATUS_ENTER = 'enter';
const STATUS_LEAVE = 'leave';

const STEP_PREPARE = 'prepare';
const STEP_START = 'start';
const STEP_ACTIVE = 'active';
const STEP_PREPARED = 'prepared';

type MotionStatus = typeof STATUS_NONE | typeof STATUS_APPEAR | typeof STATUS_ENTER | typeof STATUS_LEAVE;
type StepType = typeof STEP_PREPARE | typeof STEP_START | typeof STEP_ACTIVE | typeof STEP_PREPARED;

interface MotionEndEvent {
  deadline?: boolean;
  target?: Element;
}

interface PrepareFunction {
  (element: Element): void | Promise<void>;
}

interface StartFunction {
  (element: Element, event: MotionEndEvent | null): void | React.CSSProperties;
}

interface ActiveFunction {
  (element: Element, event: MotionEndEvent | null): void | React.CSSProperties;
}

interface EndFunction {
  (element: Element, event: MotionEndEvent): void | boolean;
}

interface VisibleChangedFunction {
  (visible: boolean): void;
}

interface MotionOptions {
  motionEnter?: boolean;
  motionAppear?: boolean;
  motionLeave?: boolean;
  motionDeadline?: number;
  motionLeaveImmediately?: boolean;
  onAppearPrepare?: PrepareFunction;
  onEnterPrepare?: PrepareFunction;
  onLeavePrepare?: PrepareFunction;
  onAppearStart?: StartFunction;
  onEnterStart?: StartFunction;
  onLeaveStart?: StartFunction;
  onAppearActive?: ActiveFunction;
  onEnterActive?: ActiveFunction;
  onLeaveActive?: ActiveFunction;
  onAppearEnd?: EndFunction;
  onEnterEnd?: EndFunction;
  onLeaveEnd?: EndFunction;
  onVisibleChanged?: VisibleChangedFunction;
}

interface StepHandlers {
  [STEP_PREPARE]?: PrepareFunction;
  [STEP_START]?: StartFunction;
  [STEP_ACTIVE]?: ActiveFunction;
}

type UseMotionResult = [
  MotionStatus,
  StepType,
  React.CSSProperties | null,
  boolean
];

export default function useMotion(
  supportMotion: boolean,
  visible: boolean,
  getElement: () => Element,
  options: MotionOptions
): UseMotionResult {
  const {
    motionEnter = true,
    motionAppear = true,
    motionLeave = true,
    motionDeadline,
    motionLeaveImmediately,
    onAppearPrepare,
    onEnterPrepare,
    onLeavePrepare,
    onAppearStart,
    onEnterStart,
    onLeaveStart,
    onAppearActive,
    onEnterActive,
    onLeaveActive,
    onAppearEnd,
    onEnterEnd,
    onLeaveEnd,
    onVisibleChanged
  } = options;

  const [asyncVisible, setAsyncVisible] = useState<boolean>();
  const [status, setStatus] = useState<MotionStatus>(STATUS_NONE);
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  const currentStatus = status;
  const mountedRef = useRef<boolean>(false);
  const deadlineTimerRef = useRef<NodeJS.Timeout | null>(null);

  function getElementSafe(): Element {
    return getElement();
  }

  const activeRef = useRef<boolean>(false);

  function resetStatus(): void {
    setStatus(STATUS_NONE);
    setStyle(null, true);
  }

  const onMotionEnd = useEvent((event?: MotionEndEvent) => {
    const currentMotionStatus = status;
    
    if (currentMotionStatus === STATUS_NONE) {
      return;
    }

    const element = getElementSafe();
    
    if (!event || event.deadline || event.target === element) {
      const isCurrentActive = activeRef.current;
      let endResult: void | boolean;

      if (currentMotionStatus === STATUS_APPEAR && isCurrentActive) {
        endResult = onAppearEnd?.(element, event!);
      } else if (currentMotionStatus === STATUS_ENTER && isCurrentActive) {
        endResult = onEnterEnd?.(element, event!);
      } else if (currentMotionStatus === STATUS_LEAVE && isCurrentActive) {
        endResult = onLeaveEnd?.(element, event!);
      }

      if (isCurrentActive && endResult !== false) {
        resetStatus();
      }
    }
  });

  const [latestOnMotionEnd] = useMountedState(onMotionEnd);

  const getStepHandlers = (motionStatus: MotionStatus): StepHandlers => {
    switch (motionStatus) {
      case STATUS_APPEAR:
        return {
          [STEP_PREPARE]: onAppearPrepare,
          [STEP_START]: onAppearStart,
          [STEP_ACTIVE]: onAppearActive
        };
      case STATUS_ENTER:
        return {
          [STEP_PREPARE]: onEnterPrepare,
          [STEP_START]: onEnterStart,
          [STEP_ACTIVE]: onEnterActive
        };
      case STATUS_LEAVE:
        return {
          [STEP_PREPARE]: onLeavePrepare,
          [STEP_START]: onLeaveStart,
          [STEP_ACTIVE]: onLeaveActive
        };
      default:
        return {};
    }
  };

  const stepHandlers = useMemo(() => getStepHandlers(currentStatus), [currentStatus]);

  const [currentStep, setCurrentStep] = useStepQueue(currentStatus, !supportMotion, (step) => {
    if (step === STEP_PREPARE) {
      const prepareHandler = stepHandlers[STEP_PREPARE];
      return prepareHandler ? prepareHandler(getElementSafe()) : SkipStep;
    }

    if (step in stepHandlers) {
      const handler = stepHandlers[step];
      const result = handler?.(getElementSafe(), null) || null;
      setStyle(result as React.CSSProperties | null);
    }

    if (step === STEP_ACTIVE && currentStatus !== STATUS_NONE) {
      latestOnMotionEnd(getElementSafe());

      if (motionDeadline && motionDeadline > 0) {
        clearTimeout(deadlineTimerRef.current!);
        deadlineTimerRef.current = setTimeout(() => {
          onMotionEnd({ deadline: true });
        }, motionDeadline);
      }
    }

    if (step === STEP_PREPARED) {
      resetStatus();
    }

    return DoStep;
  });

  const isStepActive = isActive(currentStep);
  activeRef.current = isStepActive;

  const previousVisibleRef = useRef<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!mountedRef.current || previousVisibleRef.current !== visible) {
      setAsyncVisible(visible);

      let nextStatus: MotionStatus | undefined;
      const isMounted = mountedRef.current;

      mountedRef.current = true;

      if (!isMounted && visible && motionAppear) {
        nextStatus = STATUS_APPEAR;
      }

      if (isMounted && visible && motionEnter) {
        nextStatus = STATUS_ENTER;
      }

      if ((isMounted && !visible && motionLeave) || (!isMounted && motionLeaveImmediately && !visible && motionLeave)) {
        nextStatus = STATUS_LEAVE;
      }

      const handlers = getStepHandlers(nextStatus!);

      if (nextStatus && (supportMotion || handlers[STEP_PREPARE])) {
        setStatus(nextStatus);
        setCurrentStep();
      } else {
        setStatus(STATUS_NONE);
      }

      previousVisibleRef.current = visible;
    }
  }, [visible]);

  useEffect(() => {
    if (
      (currentStatus === STATUS_APPEAR && !motionAppear) ||
      (currentStatus === STATUS_ENTER && !motionEnter) ||
      (currentStatus === STATUS_LEAVE && !motionLeave)
    ) {
      setStatus(STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimeout(deadlineTimerRef.current!);
    };
  }, []);

  const visibleChangedRef = useRef<boolean>(false);

  useEffect(() => {
    if (asyncVisible) {
      visibleChangedRef.current = true;
    }

    if (asyncVisible !== undefined && currentStatus === STATUS_NONE) {
      if ((visibleChangedRef.current || asyncVisible)) {
        onVisibleChanged?.(asyncVisible);
      }
      visibleChangedRef.current = true;
    }
  }, [asyncVisible, currentStatus]);

  let mergedStyle = style;

  if (stepHandlers[STEP_PREPARE] && currentStep === STEP_START) {
    mergedStyle = {
      transition: 'none',
      ...mergedStyle
    };
  }

  return [
    currentStatus,
    currentStep,
    mergedStyle,
    asyncVisible ?? visible
  ];
}