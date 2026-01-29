import { getRoomLists } from './roomUtils';
import { OperationId, BaseOperation } from './operations';

interface ExecuteParams {
  isQuestionTone: number;
  reply?: string;
}

type FinishStatus = 'success' | 'fail';

interface PluginManager {
  getPlugin(pluginType: string): PersistencePlugin;
}

interface PersistencePlugin {
  signalSaveCancel: Signal;
  save(param1: boolean, param2: boolean, param3: boolean): Promise<void>;
}

interface Signal {
  listen(callback: () => void): void;
  unlisten(callback: () => void): void;
}

interface App {
  pluginManager: PluginManager;
}

declare const HSFPConstants: {
  PluginType: {
    Persistence: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class OpSaveDesign extends BaseOperation {
  private app!: App;

  static getId(): string {
    return OperationId.SaveDesign;
  }

  onExecute(params: ExecuteParams): void {
    if (params.isQuestionTone === 1) {
      this.onFinish('success', params.reply ?? '', params);
      return;
    }

    const roomLists = getRoomLists();
    if (roomLists.length === 0) {
      this.onFinish(
        'fail',
        ResourceManager.getString('homegpt_layout_room_empty_rooms'),
        params
      );
      return;
    }

    const persistencePlugin = this.app.pluginManager.getPlugin(
      HSFPConstants.PluginType.Persistence
    );

    const handleSaveCancel = (): void => {
      persistencePlugin.signalSaveCancel.unlisten(handleSaveCancel);
      this.onFinish(
        'fail',
        ResourceManager.getString('homegpt_save_room_cancel'),
        params
      );
    };

    persistencePlugin.signalSaveCancel.listen(handleSaveCancel);

    persistencePlugin
      .save(false, true, true)
      .then(() => {
        persistencePlugin.signalSaveCancel.unlisten(handleSaveCancel);
        this.onFinish(
          'success',
          ResourceManager.getString('userStrings_saveStext'),
          params
        );
      })
      .catch(() => {
        persistencePlugin.signalSaveCancel.unlisten(handleSaveCancel);
        this.onFinish(
          'fail',
          ResourceManager.getString('userStrings_saveEtext'),
          params
        );
      });
  }

  private onFinish(status: FinishStatus, message: string, params: ExecuteParams): void {
    // Implementation to be provided by BaseOperation or overridden
  }
}