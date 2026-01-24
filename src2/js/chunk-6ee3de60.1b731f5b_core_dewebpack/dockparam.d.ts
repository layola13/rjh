/**
 * DockParam class for managing docking parameters with start and end values.
 * Handles parameter settings, computed values, and reversal operations.
 */
export declare class DockParam {
  /**
   * Start parameter value.
   * Default: -1 (unset)
   */
  private st: number;

  /**
   * End parameter value.
   * Default: -1 (unset)
   */
  private et: number;

  /**
   * Creates a new DockParam instance.
   * Initializes both start and end parameters to -1.
   */
  constructor();

  /**
   * Sets either the start or end parameter based on the flag.
   * @param isStart - If true, sets the start parameter; otherwise sets the end parameter
   * @param value - The numeric value to assign
   */
  setParam(isStart: boolean, value: number): void;

  /**
   * Computed start value.
   * Returns 0.5 if the start parameter is unset (-1), otherwise returns the actual start value.
   */
  get co_st(): number;

  /**
   * Computed end value.
   * Returns 0.5 if the end parameter is unset (-1), otherwise returns the actual end value.
   */
  get co_et(): number;

  /**
   * Primary parameter value (first available).
   * Returns -1 if both parameters are unset.
   * Returns start parameter if set, otherwise returns end parameter.
   */
  get a(): number;

  /**
   * Secondary parameter value (second available).
   * Returns end parameter only if both start and end are set, otherwise returns -1.
   */
  get b(): number;

  /**
   * Swaps the start and end parameter values.
   */
  reverse(): void;
}