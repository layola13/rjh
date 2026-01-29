interface ExecuteParams {
  isSaveas?: boolean;
}

interface ExecuteResult {
  status: 'success' | 'cancel';
  data?: {
    versionId: string | null;
    isSaveas?: boolean;
    continuer?: boolean;
  };
}

interface DesignMetadata {
  get(key: string): string | null;
}

interface App {
  designMetadata: DesignMetadata;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface MessageBoxButton {
  // Message box button configuration
}

interface MessageBox {
  show(callback: (result: number) => void): void;
}

interface MessageBoxStatic {
  create(
    message: string,
    buttons: string[],
    defaultButton: number,
    options: { title: string; disablemask: boolean }
  ): MessageBox;
}

interface ResourceManagerStatic {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const MessageBox: MessageBoxStatic;
declare const ResourceManager: ResourceManagerStatic;

export class VersionCheckTask {
  /**
   * Executes version check task
   * @param params - Execution parameters containing saveas flag
   * @param _context - Execution context (unused)
   * @returns Promise resolving to execution result with version info
   */
  execute(params: ExecuteParams, _context?: unknown): Promise<ExecuteResult> {
    const versionId = HSApp.App.getApp().designMetadata.get('versionId');

    if (!versionId || params.isSaveas) {
      return Promise.resolve({
        status: 'success',
        data: {
          versionId,
          isSaveas: params.isSaveas,
        },
      });
    }

    return new Promise<ExecuteResult>((resolve, reject) => {
      MessageBox.create(
        ResourceManager.getString('toolBar_history_message'),
        [
          ResourceManager.getString('toolBar_edit_cancel'),
          ResourceManager.getString('toolBar_history_ok'),
        ],
        1,
        {
          title: ResourceManager.getString('save_history_message'),
          disablemask: true,
        }
      ).show((result: number) => {
        if (result === 0) {
          return resolve({
            status: 'success',
            data: {
              versionId,
              isSaveas: params.isSaveas,
              continuer: true,
            },
          });
        }

        if (result === 1) {
          reject({
            status: 'cancel',
          });
        }
      });
    });
  }
}