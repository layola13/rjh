import { SaveProcessPlugin } from './SaveProcessPlugin';
import { Signal } from './Signal';
import { Modal } from './Modal';

enum SaveErrorType {
  FAIL_BIZ_RESOURCE_NOT_FOUND = 'FAIL_BIZ_RESOURCE_NOT_FOUND',
  FAIL_BIZ_PERMISSION_DENIED = 'FAIL_BIZ_PERMISSION_DENIED',
  TIMEOUT = 'TIMEOUT',
  FAIL_BIZ_OVER_DESIGN_SIZE = 'FAIL_BIZ_OVER_DESIGN_SIZE'
}

enum LiveHintStatus {
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE',
  WARNING = 'WARNING'
}

interface SaveParams {
  showLiveHint: boolean;
  [key: string]: unknown;
}

interface SaveReturnData {
  errorType?: SaveErrorType;
  [key: string]: unknown;
}

interface SaveEventData {
  saveParams: SaveParams;
  saveReturnData?: SaveReturnData;
}

interface SaveEvent {
  data?: SaveEventData;
}

interface SaveHandler {
  signalSaveStart: Signal<SaveEvent>;
  signalSaveSucceeded: Signal<SaveEvent>;
  signalSaveFailed: Signal<SaveEvent>;
  callSave(params: SaveParams): void;
}

interface PluginOptions {
  saveHandler: SaveHandler;
}

interface LiveHintOptions {
  status: string;
  canclose: boolean;
}

interface ModalOptions {
  title: string;
  content: string;
  okButtonContent: string;
  hideCancelButton: boolean;
  enableCheckbox: boolean;
  onOk: () => void;
}

interface PluginManager {
  getPlugin(name: string): FeedbackPlugin | undefined;
}

interface FeedbackPlugin {
  showAliXiaomi?(): void;
}

interface App {
  pluginManager?: PluginManager;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, arg2?: unknown, arg3?: unknown, options?: LiveHintOptions): void;
  hide(): void;
  statusEnum: {
    warning: string;
  };
};

declare const HSApp: {
  App: {
    getApp(): App | undefined;
  };
};

class LiveHintHelper {
  static showLiveHint(status: LiveHintStatus, retryCallback?: () => void): void {
    switch (status) {
      case LiveHintStatus.LOADING:
        LiveHint.show(ResourceManager.getString('saving'), undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: false
        });
        break;
      case LiveHintStatus.COMPLETE:
        LiveHint.show(ResourceManager.getString('save_success'), undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
        break;
      case LiveHintStatus.WARNING:
        LiveHint.show(ResourceManager.getString('save_failed'), undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
        if (retryCallback) {
          retryCallback();
        }
        break;
    }
  }
}

type ErrorTypeHandler = () => void;

export default class SaveProcessPluginImpl extends SaveProcessPlugin {
  private errorTypeExecute: Record<SaveErrorType, ErrorTypeHandler>;
  private saveHandler: SaveHandler;

  constructor(options: PluginOptions) {
    super(options);

    const { saveHandler } = options;
    
    saveHandler.signalSaveStart.listen(this.signalSaveStart, this);
    saveHandler.signalSaveSucceeded.listen(this.signalSaveSucceeded, this);
    saveHandler.signalSaveFailed.listen(this.signalSaveFailed, this);
    
    this.saveHandler = saveHandler;
    
    this.errorTypeExecute = {
      [SaveErrorType.FAIL_BIZ_RESOURCE_NOT_FOUND]: () => {
        const message = ResourceManager.getString('load_design_error_deleted');
        LiveHint.show(message, undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
      },
      
      [SaveErrorType.FAIL_BIZ_PERMISSION_DENIED]: () => {
        const message = ResourceManager.getString('load_design_notAllow');
        LiveHint.show(message, undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
      },
      
      [SaveErrorType.TIMEOUT]: () => {
        const message = ResourceManager.getString('save_retry_tips');
        LiveHint.show(message, undefined, undefined, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
      },
      
      [SaveErrorType.FAIL_BIZ_OVER_DESIGN_SIZE]: () => {
        LiveHint.hide();
        setTimeout(() => {
          Modal.basic({
            title: ResourceManager.getString('save_over_design_size_title'),
            content: ResourceManager.getString('save_over_design_size_content'),
            okButtonContent: ResourceManager.getString('messageDialog_OK'),
            hideCancelButton: true,
            enableCheckbox: false,
            onOk: () => {
              Modal.close('basic');
              const app = HSApp.App.getApp();
              const feedbackPlugin = app?.pluginManager?.getPlugin('hsw.brand.ezhome.feedback.Plugin');
              feedbackPlugin?.showAliXiaomi?.();
            }
          });
        }, 500);
      }
    };
  }

  private signalSaveStart(event: SaveEvent): void {
    const saveParams = event.data?.saveParams ?? { showLiveHint: false };
    if (saveParams.showLiveHint) {
      LiveHintHelper.showLiveHint(LiveHintStatus.LOADING);
    }
  }

  private signalSaveSucceeded(event: SaveEvent): void {
    const saveParams = event.data?.saveParams ?? { showLiveHint: false };
    if (saveParams.showLiveHint) {
      LiveHintHelper.showLiveHint(LiveHintStatus.COMPLETE);
    }
  }

  private signalSaveFailed(event: SaveEvent): void {
    const eventData = event.data ?? { saveParams: { showLiveHint: false } };
    const { saveParams, saveReturnData } = eventData;
    
    if (saveParams.showLiveHint) {
      const errorType = saveReturnData?.errorType;
      
      if (errorType && this.errorTypeExecute[errorType]) {
        this.errorTypeExecute[errorType]();
      } else {
        LiveHintHelper.showLiveHint(LiveHintStatus.WARNING, () => {
          this.saveHandler.callSave(saveParams);
        });
      }
    }
  }
}