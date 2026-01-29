import { HSCore } from './635589';

interface TaskContext {
  [key: string]: unknown;
}

interface TaskResult {
  status: string;
  data?: {
    readonly: boolean;
  };
}

interface DesignMetadata {
  get(key: string): unknown;
}

interface App {
  designMetadata: DesignMetadata;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface AdskUser {
  adaId?: string;
  guid?: string;
}

interface LiveHintOptions {
  status: number;
  canclose: boolean;
}

interface LiveHint {
  show(message: string, duration: number, target: null, options: LiveHintOptions): void;
  statusEnum: {
    warning: number;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const adskUser: AdskUser;
declare const LiveHint: LiveHint;
declare const ResourceManager: ResourceManager;

const LIVE_HINT_DURATION = 10000;

export class ReadonlyCheckTask {
  /**
   * Execute readonly check task
   * @param context - Task execution context
   * @param data - Task data
   * @returns Promise resolving to task result
   */
  execute(context: TaskContext, data: unknown): Promise<TaskResult> {
    const app = HSApp.App.getApp();
    const currentUserId = adskUser.adaId || adskUser.guid;
    const readonlyStatus = HSCore.Doc.DocumentStatus.Readonly;

    if (
      app.designMetadata.get('documentStatus') === readonlyStatus &&
      app.designMetadata.get('userId') !== currentUserId
    ) {
      const errorMessage = ResourceManager.getString('save_readonly_design_error');
      LiveHint.show(errorMessage, LIVE_HINT_DURATION, null, {
        status: LiveHint.statusEnum.warning,
        canclose: true
      });

      return Promise.reject({
        status: 'cancel'
      });
    }

    return Promise.resolve({
      status: 'success',
      data: {
        readonly: false
      }
    });
  }
}