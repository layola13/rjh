/**
 * Alignment and motion state machine hook for component transitions
 * @module AlignMotionHook
 */

/**
 * State phases for the alignment and motion sequence
 */
type AlignMotionState = 'measure' | 'alignPre' | 'align' | 'motion' | 'stable' | null;

/**
 * Callback function executed after state transition completes
 */
type TransitionCallback = () => void;

/**
 * Function to trigger the next state in the transition sequence
 * @param callback - Optional callback executed after transition
 */
type NextStepFunction = (callback?: TransitionCallback) => void;

/**
 * Return type of the useAlignMotion hook
 * @returns A tuple containing:
 *   - Current state in the alignment/motion sequence
 *   - Function to trigger the next step in the sequence
 */
type UseAlignMotionResult = readonly [
  state: AlignMotionState,
  nextStep: NextStepFunction
];

/**
 * Custom hook managing alignment and motion state transitions
 * 
 * This hook orchestrates a state machine with the following sequence:
 * measure → alignPre → align → motion → stable
 * 
 * @param triggerValue - Value that triggers a reset to 'measure' state when changed
 * @param onMeasure - Callback invoked when entering 'measure' state
 * @returns Tuple of [currentState, nextStepFunction]
 * 
 * @example
 *