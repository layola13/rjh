/**
 * Step state management module for controlling multi-step processes
 * @module SkipStep
 */

/**
 * Step state constants
 */
export enum StepState {
  STEP_NONE = 'STEP_NONE',
  STEP_PREPARE = 'STEP_PREPARE',
  STEP_PREPARED = 'STEP_PREPARED',
  STEP_START = 'STEP_START',
  STEP_ACTIVE = 'STEP_ACTIVE',
  STEP_ACTIVATED = 'STEP_ACTIVATED'
}

/**
 * Indicates that the current step should be skipped
 */
export const SkipStep: false;

/**
 * Indicates that the current step should be executed
 */
export const DoStep: true;

/**
 * Type representing step execution decision
 */
export type StepAction = typeof SkipStep | typeof DoStep;

/**
 * Type representing step execution result
 * Can be synchronous (boolean) or asynchronous (Promise)
 */
export type StepResult = StepAction | Promise<StepAction>;

/**
 * Callback function to determine step execution logic
 * @param currentState - The current step state
 * @returns Decision whether to execute or skip the step
 */
export type StepCallback = (currentState: StepState) => StepResult;

/**
 * Return type of the useStepManager hook
 * @tuple [startStep, currentState]
 */
export type UseStepManagerReturn = readonly [
  /**
   * Function to initiate the step sequence
   */
  () => void,
  /**
   * Current step state
   */
  StepState
];

/**
 * Checks if the given step state is in an active state
 * @param state - The step state to check
 * @returns True if the state is STEP_ACTIVE or STEP_ACTIVATED
 */
export function isActive(state: StepState): boolean;

/**
 * Custom React hook for managing multi-step process flow
 * 
 * @param dependency - Dependency value that triggers re-evaluation
 * @param isShortFlow - If true, uses shortened flow (PREPARE -> PREPARED), otherwise full flow
 * @param stepCallback - Callback invoked at each step to determine execution logic
 * 
 * @returns Tuple containing:
 *   - startStep: Function to begin the step sequence
 *   - currentState: Current step state
 * 
 * @example
 *