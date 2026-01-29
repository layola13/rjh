import { HSApp } from './518193';

interface TaskContext {
  doRoomClosedCheck: boolean;
}

interface TaskResult {
  status: 'success' | 'error' | 'cancel';
  data?: {
    doRoomClosedCheck: boolean;
  };
  message?: string;
}

interface PersistencePlugin {
  checkRoomClosed(checkWalls: boolean): boolean;
}

interface PluginManager {
  getPlugin(pluginId: string): PersistencePlugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface LiveHintOptions {
  canclose: boolean;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, duration: number, position: unknown, options: LiveHintOptions): void;
};

const PLUGIN_ID = 'hsw.plugin.persistence.Plugin';
const LIVE_HINT_DURATION = 5000;

/**
 * Task that checks if the room is closed before proceeding
 */
export class RoomClosedCheckTask {
  /**
   * Executes the room closed check
   * @param context - Task execution context
   * @param additionalData - Additional task data (unused)
   * @returns Promise resolving to task result
   */
  execute(context: TaskContext, additionalData?: unknown): Promise<TaskResult> {
    if (!context.doRoomClosedCheck) {
      return Promise.resolve({
        status: 'success',
        data: {
          doRoomClosedCheck: context.doRoomClosedCheck
        }
      });
    }

    const persistencePlugin = HSApp.App.getApp().pluginManager.getPlugin(PLUGIN_ID);

    if (!persistencePlugin) {
      return Promise.reject({
        status: 'error',
        message: `${PLUGIN_ID} not exist`
      });
    }

    if (persistencePlugin.checkRoomClosed(true)) {
      return Promise.resolve({
        status: 'success',
        data: {
          doRoomClosedCheck: context.doRoomClosedCheck
        }
      });
    }

    const warningMessage = ResourceManager.getString('plugin_persistence_check_wall_closed_livehint_negative');
    LiveHint.show(warningMessage, LIVE_HINT_DURATION, undefined, {
      canclose: true
    });

    return Promise.reject({
      status: 'cancel'
    });
  }
}