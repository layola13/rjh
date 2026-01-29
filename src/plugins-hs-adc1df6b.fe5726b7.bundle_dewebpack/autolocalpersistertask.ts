import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface TaskExecuteParams {
  designId?: string;
  data: Record<string, unknown>;
  ext: Record<string, unknown>;
}

interface TaskExecuteResult {
  status: 'success';
}

interface FloorplanData {
  ext: Record<string, unknown>;
  [key: string]: unknown;
}

interface WorkerMessageEvent {
  data: unknown;
}

export class AutoLocalPersisterTask {
  private autoSaveStorage: HSApp.Util.Storage;

  constructor() {
    this.autoSaveStorage = new HSApp.Util.Storage('hsw.app', {
      compress: true
    });
  }

  /**
   * Execute the auto-save task
   * @param _context - Execution context (unused)
   * @param params - Task parameters containing design data
   * @returns Promise resolving to execution result
   */
  async execute(_context: unknown, params: TaskExecuteParams): Promise<TaskExecuteResult> {
    if (params.designId) {
      return Promise.resolve({ status: 'success' });
    }

    const app = HSApp.App.getApp();
    const floorplanData: FloorplanData = {
      ...params.data,
      ext: params.ext
    };

    const jsonString = app.floorplan.jsonToString(floorplanData);

    const compressedData = await new Promise<unknown>((resolve, reject) => {
      const worker = new Worker('./compression-worker.js');
      
      worker.onmessage = (event: WorkerMessageEvent) => {
        resolve(event.data);
      };
      
      worker.onerror = (error: ErrorEvent) => {
        reject(error);
      };
      
      worker.postMessage(jsonString);
    });

    const storageKey = `design.${HSCore.Doc.FloorplanMeta.magic}`;
    this.autoSaveStorage.set(storageKey, compressedData, true);

    return { status: 'success' };
  }
}