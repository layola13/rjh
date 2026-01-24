/**
 * Task configuration interface
 * Module: TaskConfig
 * Original ID: 584695
 */

/**
 * Raw task configuration data from external source
 */
export interface TaskConfigData {
  /** Task description text */
  description?: string;
  /** Unique task identifier code */
  taskCode?: string;
  /** Whether to display walkthrough guide */
  showWalkthrough?: boolean;
  /** Whether to display welcome message */
  showWelcome?: boolean;
  /** Task tips and hints */
  tips?: string;
  /** Whether this task involves file upload */
  isUpload?: boolean;
}

/**
 * Task configuration class
 * Manages task metadata and display settings
 */
export declare class TaskConfig {
  /** Task description text */
  description?: string;
  
  /** Unique task identifier code */
  taskCode?: string;
  
  /** Whether to display walkthrough guide */
  showWalkthrough?: boolean;
  
  /** Whether to display welcome message */
  showWelcome?: boolean;
  
  /** Task tips and hints */
  tips?: string;
  
  /** Whether this task involves file upload */
  isUpload?: boolean;

  /**
   * Creates a new TaskConfig instance
   */
  constructor();

  /**
   * Factory method to load task configuration from data object
   * @param data - Raw task configuration data
   * @returns Initialized TaskConfig instance
   */
  static load(data: TaskConfigData): TaskConfig;
}