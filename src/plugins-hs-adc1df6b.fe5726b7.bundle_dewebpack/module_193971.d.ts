/**
 * Represents the possible states of a process or operation.
 * Includes loading states, completion states, and special condition flags.
 */
declare enum ProcessState {
  /**
   * Indicates that the process is currently in progress
   */
  LOADING = "LOADING",
  
  /**
   * Indicates that the process has finished successfully
   */
  COMPLETE = "COMPLETE",
  
  /**
   * Indicates that the process completed with warnings
   */
  WARNING = "WARNING",
  
  /**
   * Indicates a high frequency of creation operations
   * May be used to trigger rate limiting or throttling
   */
  HighFrequencyCreation = "HighFrequencyCreation"
}

export default ProcessState;