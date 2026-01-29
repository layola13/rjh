import { ModelHandle } from './ModelHandle';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { callModelChange } from './callModelChange';
import { lockState } from './lockState';

interface InitOptions {
  designId: string;
}

interface UserChangeEvent {
  designId: string;
}

interface LockStateResponse {
  management?: string;
}

interface LiveHintOptions {
  status: number;
  canclose: boolean;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, param2?: unknown, param3?: unknown, options?: LiveHintOptions): void;
  statusEnum: {
    canops: number;
  };
};

export class ViewerModelHandle extends ModelHandle {
  private signalHook: HSCore.Util.SignalHook;
  private designId?: string;
  private isHeartbeat: boolean = false;
  private ignoreHeartbeat: boolean = false;

  constructor() {
    super();
    this.signalHook = new HSCore.Util.SignalHook();
    this.onUserChange = this.onUserChange.bind(this);
  }

  public init(options: InitOptions): { cancel: boolean } {
    this.designId = options.designId;
    this.signalHook.unlistenAll();
    
    this.signalHook.listen(
      HSApp.App.getApp().signalDocumentOpened,
      () => {
        setTimeout(() => {
          const message = ResourceManager.getString('plugin_collaborate_edit_to_viewer_title');
          LiveHint.show(message, undefined, undefined, {
            status: LiveHint.statusEnum.canops,
            canclose: true
          });
        }, 500);
        
        this.signalHook.unlistenAll();
      }
    );

    return { cancel: false };
  }

  public onUserChange(event: UserChangeEvent): void {
    this.ignoreHeartbeat = true;
    
    lockState({
      designId: event.designId,
      lock: false
    }).then((response: LockStateResponse) => {
      const title = ResourceManager.getString('plugin_collaborate_edit_apply_permission');
      const content = ResourceManager.getString('plugin_collaborate_edit_to_readonly_error')
        .replace(/{admin}/g, response.management || '');
      const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_know');
      
      return callModelChange({
        title,
        content,
        okButtonContent
      }).then(() => {
        this.ignoreHeartbeat = false;
      });
    });
  }
}