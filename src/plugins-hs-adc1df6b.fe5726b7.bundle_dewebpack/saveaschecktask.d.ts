/**
 * Signal event types for SaveAsCheckTask
 */
interface SaveAsCheckSignalData {
  /** Check if user is the owner of the design */
  'check-owner': {
    designID: string;
    adaId?: string;
    guid?: string;
  };
  /** Validate owner status */
  'isOwner': {
    designID: string;
    adaId?: string;
    guid?: string;
  };
  /** Check design type validity */
  'designTypeCheck': string;
}

/**
 * Signal payload structure
 */
interface SignalPayload<T extends keyof SaveAsCheckSignalData = keyof SaveAsCheckSignalData> {
  processType: T;
  data: SaveAsCheckSignalData[T];
}

/**
 * Task execution context
 */
interface TaskContext {
  /** Whether to perform save-as operation */
  isSaveas: boolean;
}

/**
 * Task execution result
 */
interface TaskResult {
  status: 'success';
}

/**
 * Signal class for event dispatching
 */
declare class Signal<T = unknown> {
  constructor(context: T);
  dispatch<K extends keyof SaveAsCheckSignalData>(payload: SignalPayload<K>): void;
}

/**
 * Task for checking save-as operation permissions and conditions
 * 
 * Validates:
 * - Design ownership
 * - Edit permissions
 * - Design type restrictions (public/ea designs cannot be saved as)
 */
declare class SaveAsCheckTask {
  /**
   * Signal emitter for task progress events
   */
  readonly signal: Signal<SaveAsCheckTask>;

  /**
   * Execute the save-as validation checks
   * 
   * @param context - Task context containing save-as flag
   * @param _options - Additional execution options (unused)
   * @returns Promise resolving to task result
   * 
   * @remarks
   * This method performs three validation checks:
   * 1. Owner check: Dispatches current user credentials
   * 2. Permission check: Validates if user can edit the design
   * 3. Design type check: Ensures design is not public/ea type
   */
  execute(context: TaskContext, _options?: unknown): Promise<TaskResult>;
}

export { SaveAsCheckTask };