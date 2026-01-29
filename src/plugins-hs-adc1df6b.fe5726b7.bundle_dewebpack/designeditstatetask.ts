import { HSApp } from './518193';

interface TaskResult {
  status: 'success' | 'cancel';
}

/**
 * DesignEditStateTask
 * Checks if the current edit status is in EDIT mode
 */
export class DesignEditStateTask {
  constructor() {}

  /**
   * Executes the task to check edit status
   * @param t - First parameter (unused in current implementation)
   * @param n - Second parameter (unused in current implementation)
   * @returns Promise resolving to task result with status
   */
  async execute(t: unknown, n: unknown): Promise<TaskResult> {
    const currentStatus = HSApp.EditStatus.EditStatusManager.getInstance().status;
    
    if (currentStatus !== HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT) {
      return { status: 'success' };
    }
    
    return { status: 'cancel' };
  }
}