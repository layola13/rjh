/**
 * React motion hook for managing enter/leave/appear animations
 * Handles animation lifecycle states and transitions
 */

import { useRef, useEffect, useMemo } from 'react';

/**
 * Animation status constants
 */
export const enum AnimationStatus {
  /** No animation */
  STATUS_NONE = 'none',
  /** Initial appear animation */
  STATUS_APPEAR = 'appear',
  /** Enter animation */
  STATUS_ENTER = 'enter',
  /** Leave animation */
  STATUS_LEAVE = 'leave'
}

/**
 * Animation step constants
 */
export const enum AnimationStep {
  /** Preparation phase before animation */
  STEP_PREPARE = 'prepare',
  /** Prepared and ready to start */
  STEP_PREPARED = 'prepared',
  /** Animation start phase */
  STEP_START = 'start',
  /** Active animation phase */
  STEP_ACTIVE = 'active'
}

/**
 * Step execution control
 */
export const enum StepAction {
  /** Skip this step */
  SkipStep = 'skip',
  /** Execute this step */
  DoStep = 'do'
}

/**
 * Animation event object
 */
interface AnimationEvent {
  /** Target element of the animation */
  target?: Element;
  /** Whether animation ended due to deadline timeout */
  deadline?: boolean;
}

/**
 * Prepare function that returns animation configuration
 */
type PrepareFunction = (element: Element) => Record<string, unknown> | void;

/**
 * Start/Active callback that returns animation configuration
 */
type AnimationCallback = (element: Element, event: AnimationEvent | null) => Record<string, unknown> | void;

/**
 * End callback that can cancel animation completion
 */
type EndCallback = (element: Element, event: AnimationEvent) => boolean | void;

/**
 * Visibility change callback
 */
type VisibilityCallback = (visible: boolean) => void;

/**
 * Motion hook configuration options
 */
interface MotionOptions {
  /** Enable enter animation (default: true) */
  motionEnter?: boolean;
  /** Enable appear animation (default: true) */
  motionAppear?: boolean;
  /** Enable leave animation (default: true) */
  motionLeave?: boolean;
  /** Animation deadline in milliseconds */
  motionDeadline?: number;
  /** Trigger leave animation immediately without waiting */
  motionLeaveImmediately?: boolean;
  
  /** Prepare callback for appear animation */
  onAppearPrepare?: PrepareFunction;
  /** Prepare callback for enter animation */
  onEnterPrepare?: PrepareFunction;
  /** Prepare callback for leave animation */
  onLeavePrepare?: PrepareFunction;
  
  /** Start callback for appear animation */
  onAppearStart?: AnimationCallback;
  /** Start callback for enter animation */
  onEnterStart?: AnimationCallback;
  /** Start callback for leave animation */
  onLeaveStart?: AnimationCallback;
  
  /** Active callback for appear animation */
  onAppearActive?: AnimationCallback;
  /** Active callback for enter animation */
  onEnterActive?: AnimationCallback;
  /** Active callback for leave animation */
  onLeaveActive?: AnimationCallback;
  
  /** End callback for appear animation */
  onAppearEnd?: EndCallback;
  /** End callback for enter animation */
  onEnterEnd?: EndCallback;
  /** End callback for leave animation */
  onLeaveEnd?: EndCallback;
  
  /** Visibility change callback */
  onVisibleChanged?: VisibilityCallback;
}

/**
 * Step callback map for a specific animation status
 */
type StepCallbacks = Partial<Record<AnimationStep, PrepareFunction | AnimationCallback>>;

/**
 * Motion hook return type
 * @returns [status, step, style, visible]
 */
type MotionHookResult = [
  AnimationStatus,
  AnimationStep,
  Record<string, unknown> | null,
  boolean
];

/**
 * Custom hook for managing complex animation lifecycles
 * Handles appear/enter/leave animations with prepare, start, active, and end phases
 * 
 * @param forceRender - Whether to force render during animation
 * @param visible - Current visibility state
 * @param getElement - Function to get the target DOM element
 * @param options - Animation configuration options
 * @returns Animation status, current step, inline styles, and visibility state
 */
export default function useMotion(
  forceRender: boolean,
  visible: boolean,
  getElement: () => Element,
  options: MotionOptions
): MotionHookResult {
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

  // State: internal visibility
  const [internalVisible, setInternalVisible] = useState<boolean>();
  
  // State: current animation status
  const [status, setStatus] = useState<AnimationStatus>(AnimationStatus.STATUS_NONE);
  
  // State: inline styles for animation
  const [inlineStyle, setInlineStyle] = useState<Record<string, unknown> | null>(null);
  
  // Cached status for comparisons
  const currentStatus = status;
  
  // Ref: whether component is mounted
  const mountedRef = useRef<boolean>(false);
  
  // Ref: deadline timeout ID
  const deadlineTimeoutRef = useRef<number | null>(null);
  
  // Ref: whether animation is currently active
  const activeRef = useRef<boolean>(false);
  
  // Ref: previous visible prop value
  const prevVisibleRef = useRef<boolean | null>(null);
  
  // Ref: whether visibility has been initialized
  const visibilityInitializedRef = useRef<boolean>(false);

  /**
   * Get the target DOM element
   */
  function getTargetElement(): Element {
    return getElement();
  }

  /**
   * Reset animation to idle state
   */
  function resetAnimation(): void {
    setStatus(AnimationStatus.STATUS_NONE);
    setInlineStyle(null);
  }

  /**
   * Handle animation end event
   */
  const onAnimationEnd = useEvent((event?: AnimationEvent): void => {
    const currentStatus = status;
    
    if (currentStatus === AnimationStatus.STATUS_NONE) {
      return;
    }

    const element = getTargetElement();
    
    // Check if event is for our target element or is a deadline timeout
    if (!event || event.deadline || event.target === element) {
      const isActive = activeRef.current;
      let shouldContinue: boolean | void;

      // Call appropriate end callback based on status
      if (currentStatus === AnimationStatus.STATUS_APPEAR && isActive) {
        shouldContinue = onAppearEnd?.(element, event!);
      } else if (currentStatus === AnimationStatus.STATUS_ENTER && isActive) {
        shouldContinue = onEnterEnd?.(element, event!);
      } else if (currentStatus === AnimationStatus.STATUS_LEAVE && isActive) {
        shouldContinue = onLeaveEnd?.(element, event!);
      }

      // Reset animation unless callback explicitly returned false
      if (isActive && shouldContinue !== false) {
        resetAnimation();
      }
    }
  });

  // Stable reference to animation end handler
  const onAnimationEndStable = useStableCallback(onAnimationEnd);

  /**
   * Get step callbacks for a given animation status
   */
  const getStepCallbacks = (status: AnimationStatus): StepCallbacks => {
    switch (status) {
      case AnimationStatus.STATUS_APPEAR:
        return {
          [AnimationStep.STEP_PREPARE]: onAppearPrepare,
          [AnimationStep.STEP_START]: onAppearStart,
          [AnimationStep.STEP_ACTIVE]: onAppearActive
        };
      case AnimationStatus.STATUS_ENTER:
        return {
          [AnimationStep.STEP_PREPARE]: onEnterPrepare,
          [AnimationStep.STEP_START]: onEnterStart,
          [AnimationStep.STEP_ACTIVE]: onEnterActive
        };
      case AnimationStatus.STATUS_LEAVE:
        return {
          [AnimationStep.STEP_PREPARE]: onLeavePrepare,
          [AnimationStep.STEP_START]: onLeaveStart,
          [AnimationStep.STEP_ACTIVE]: onLeaveActive
        };
      default:
        return {};
    }
  };

  // Memoized step callbacks for current status
  const stepCallbacks = useMemo(
    () => getStepCallbacks(currentStatus),
    [currentStatus]
  );

  /**
   * Execute animation step machine
   */
  const [startStep, currentStep] = useStepQueue(
    currentStatus,
    !forceRender,
    (step: AnimationStep) => {
      // Handle prepare step
      if (step === AnimationStep.STEP_PREPARE) {
        const prepareCallback = stepCallbacks[AnimationStep.STEP_PREPARE];
        return prepareCallback ? prepareCallback(getTargetElement()) : StepAction.SkipStep;
      }

      // Execute step callback if exists
      if (step in stepCallbacks) {
        const callback = stepCallbacks[step];
        const result = callback?.(getTargetElement(), null) ?? null;
        setInlineStyle(result);
      }

      // Handle active step: start deadline timer
      if (step === AnimationStep.STEP_ACTIVE && currentStatus !== AnimationStatus.STATUS_NONE) {
        onAnimationEndStable(getTargetElement());
        
        if (motionDeadline && motionDeadline > 0) {
          clearTimeout(deadlineTimeoutRef.current!);
          deadlineTimeoutRef.current = setTimeout(() => {
            onAnimationEnd({ deadline: true });
          }, motionDeadline);
        }
      }

      // Handle prepared step: reset animation
      if (step === AnimationStep.STEP_PREPARED) {
        resetAnimation();
      }

      return StepAction.DoStep;
    }
  );

  // Update active state based on current step
  const isActive = checkIsActive(currentStep);
  activeRef.current = isActive;

  /**
   * Main effect: handle visibility changes and trigger animations
   */
  useIsomorphicLayoutEffect(() => {
    if (!mountedRef.current || prevVisibleRef.current !== visible) {
      setInternalVisible(visible);

      let nextStatus: AnimationStatus | undefined;
      const wasMounted = mountedRef.current;
      mountedRef.current = true;

      // Determine next animation status
      if (!wasMounted && visible && motionAppear) {
        nextStatus = AnimationStatus.STATUS_APPEAR;
      }
      
      if (wasMounted && visible && motionEnter) {
        nextStatus = AnimationStatus.STATUS_ENTER;
      }
      
      if (
        (wasMounted && !visible && motionLeave) ||
        (!wasMounted && motionLeaveImmediately && !visible && motionLeave)
      ) {
        nextStatus = AnimationStatus.STATUS_LEAVE;
      }

      const callbacks = getStepCallbacks(nextStatus!);

      // Start animation if status determined and either force render or has prepare callback
      if (nextStatus && (forceRender || callbacks[AnimationStep.STEP_PREPARE])) {
        setStatus(nextStatus);
        startStep();
      } else {
        setStatus(AnimationStatus.STATUS_NONE);
      }

      prevVisibleRef.current = visible;
    }
  }, [visible]);

  /**
   * Effect: cancel animation if motion flags are disabled
   */
  useEffect(() => {
    if (
      (currentStatus === AnimationStatus.STATUS_APPEAR && !motionAppear) ||
      (currentStatus === AnimationStatus.STATUS_ENTER && !motionEnter) ||
      (currentStatus === AnimationStatus.STATUS_LEAVE && !motionLeave)
    ) {
      setStatus(AnimationStatus.STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);

  /**
   * Effect: cleanup on unmount
   */
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimeout(deadlineTimeoutRef.current!);
    };
  }, []);

  /**
   * Effect: notify visibility changes
   */
  useEffect(() => {
    if (internalVisible !== undefined) {
      visibilityInitializedRef.current = true;
    }

    if (
      internalVisible !== undefined &&
      currentStatus === AnimationStatus.STATUS_NONE &&
      (visibilityInitializedRef.current || internalVisible)
    ) {
      onVisibleChanged?.(internalVisible);
      visibilityInitializedRef.current = true;
    }
  }, [internalVisible, currentStatus]);

  // Compute final inline style
  let finalStyle = inlineStyle;
  
  // Disable transitions during prepare -> start transition
  if (
    stepCallbacks[AnimationStep.STEP_PREPARE] &&
    currentStep === AnimationStep.STEP_START
  ) {
    finalStyle = {
      transition: 'none',
      ...finalStyle
    };
  }

  return [
    currentStatus,
    currentStep,
    finalStyle,
    internalVisible ?? visible
  ];
}