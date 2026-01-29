interface TaskCenterConfig {
  msg: string;
  data: unknown;
}

interface TaskCenterResponse {
  data: TaskCenterConfig;
}

interface MtopTaskCenter {
  getConfig(params: Record<string, unknown>): Promise<TaskCenterResponse>;
  updatetaskstatus(params: { data: { taskCode: string } }): void;
}

interface NWTK {
  mtop: {
    TaskCenter?: MtopTaskCenter;
  };
}

interface HSApp {
  Util: {
    Url: {
      getQueryStrings(): { taskcode?: string };
    };
  };
}

declare const NWTK: NWTK;
declare const HSApp: HSApp;

enum TaskCode {
  // Import actual task codes from module 372714
}

/**
 * Fetches task center configuration
 * @returns Promise resolving to config data or null if request fails
 */
export async function getConfig(): Promise<unknown | null> {
  const taskCenter = NWTK.mtop.TaskCenter;
  
  if (!taskCenter) {
    return null;
  }

  const response = await taskCenter.getConfig({});
  
  if (response.data.msg === "OK" && response.data.data) {
    return response.data.data;
  }
  
  return null;
}

/**
 * Validates if the current task code is legal
 * @returns true if task code is valid, false otherwise
 */
export function isTaskLegal(): boolean {
  const queryParams = HSApp.Util.Url.getQueryStrings();
  const taskCode = queryParams.taskcode;
  
  const validTaskCodes = Array.from(Object.values(TaskCode));
  
  if (validTaskCodes.indexOf(taskCode) !== -1) {
    return true;
  }
  
  console.error("Task illegal:", taskCode);
  return false;
}

/**
 * Uploads task status update
 * @param taskCode - The task code to update
 */
export function uploadTask(taskCode: string): void {
  NWTK.mtop.TaskCenter?.updatetaskstatus({
    data: {
      taskCode
    }
  });
}