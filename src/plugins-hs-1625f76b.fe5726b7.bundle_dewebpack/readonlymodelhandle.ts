import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { callModelChange } from './callModelChange';
import { lockState } from './lockState';
import { ModelHandle } from './ModelHandle';

interface InitParams {
  designId: string;
  operator?: string;
}

interface ReloadCallbacks {
  reloadDesign: () => void;
}

interface InitResult {
  cancel: boolean;
  pageHeaderText: string;
}

interface LockStateParams {
  designId: string;
  lock: boolean;
}

interface LockStateResponse {
  state: HSApp.EditStatus.ENUM_EDIT_MODEL;
  operator?: string;
  management?: string;
}

interface ModelChangeParams {
  title: string;
  content: string;
  okButtonContent: string;
  cancelButtonContent?: string;
}

interface ModelChangeResult {
  state: 'ok' | 'cancel';
}

interface ChangeToEditResult {
  state: 'change' | 'keep' | 'newDesign';
}

interface UserChangeEvent {
  designId: string;
}

export class ReadonlyModelHandle extends ModelHandle {
  private signalHook: HSCore.Util.SignalHook;
  private canChangeToEdit: boolean;
  private designId?: string;
  private reloadDesign?: () => void;
  private isHeartbeat: boolean = true;
  private ignoreHeartbeat: boolean = false;

  constructor() {
    super();
    this.canChangeToEdit = false;
    this.signalHook = new HSCore.Util.SignalHook();
    this.onUserChange = this.onUserChange.bind(this);
  }

  init(params: InitParams, callbacks: ReloadCallbacks): InitResult {
    this.canChangeToEdit = false;
    this.designId = params.designId;
    this.reloadDesign = callbacks.reloadDesign;

    if (params.operator) {
      this.signalHook.unlistenAll();
      this.signalHook.listen(HSApp.App.getApp().signalDocumentOpened, () => {
        setTimeout(() => {
          const title = ResourceManager.getString('plugin_collaborate_edit_to_readonly_title')
            .replace(/{editor}/g, params.operator!);
          LiveHint.show(title, undefined, undefined, {
            status: LiveHint.statusEnum.canops,
            canclose: true
          });
        }, 500);
        this.signalHook.unlistenAll();
      });
    } else {
      this.signalHook.unlistenAll();
      this.signalHook.listen(HSApp.App.getApp().signalDocumentOpened, () => {
        setTimeout(() => {
          const title = ResourceManager.getString('plugin_collaborate_edit_to_viewer_title');
          LiveHint.show(title, undefined, undefined, {
            status: LiveHint.statusEnum.canops,
            canclose: true
          });
        }, 500);
        this.signalHook.unlistenAll();
      });
    }

    return {
      cancel: false,
      pageHeaderText: params.operator
        ? ResourceManager.getString('plugin_collaborate_edit_design_lock')
        : ResourceManager.getString('pageHeader_readonly_btn')
    };
  }

  onUserChange(event: UserChangeEvent): void {
    this.ignoreHeartbeat = true;
    
    lockState({
      designId: event.designId,
      lock: false
    }).then((response: LockStateResponse) => {
      if (response.state === HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT) {
        const title = ResourceManager.getString('plugin_collaborate_edit_model_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_edit');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_edit_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_keep');

        callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        }).then((result: ModelChangeResult) => {
          if (result.state === 'ok') {
            this.reloadDesign?.call(this);
          }
          this.ignoreHeartbeat = false;
        });
      } else if (response.state === HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY) {
        this.readonlyTitle(response).then(() => {
          this.ignoreHeartbeat = false;
        });
      }
    });
  }

  private async readonlyTitle(response: LockStateResponse): Promise<ModelChangeResult> {
    if (!response.operator) {
      const title = ResourceManager.getString('plugin_collaborate_edit_apply_permission');
      const content = ResourceManager.getString('plugin_collaborate_edit_to_readonly_error')
        .replace(/{admin}/g, response.management || '');
      const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_know');

      return callModelChange({
        title,
        content,
        okButtonContent
      });
    }

    const title = ResourceManager.getString('plugin_collaborate_edit_design_lock_title');
    const content = ResourceManager.getString('plugin_collaborate_edit_to_edit_error')
      .replace(/{editor}/g, response.operator || '');
    const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_know');

    return callModelChange({
      title,
      content,
      okButtonContent
    });
  }

  initChangeToMap(): Record<HSApp.EditStatus.ENUM_EDIT_MODEL, (response: LockStateResponse) => Promise<ChangeToEditResult>> {
    this.canChangeToEdit = false;

    return {
      [HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT]: async (response: LockStateResponse): Promise<ChangeToEditResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_model_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_edit');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_edit_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_keep');

        return callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        }).then((result: ModelChangeResult) => {
          if (result.state === 'ok') {
            return lockState({
              designId: response.designId,
              lock: true
            }).then((lockResponse: LockStateResponse) => {
              if (lockResponse.state === HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT) {
                return { state: 'change' as const };
              } else if (lockResponse.state === HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY) {
                return this.readonlyTitle(lockResponse).then(() => ({
                  state: 'keep' as const
                }));
              } else {
                return { state: 'keep' as const };
              }
            });
          } else if (result.state === 'cancel') {
            this.canChangeToEdit = true;
            return { state: 'keep' as const };
          } else {
            return { state: 'change' as const };
          }
        });
      },

      [HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER]: async (response: LockStateResponse): Promise<ChangeToEditResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_viewer')
          .replace(/{admin}/g, response.management || '');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_goto_readonly');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        return callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent
        }).then((result: ModelChangeResult) => {
          if (result.state === 'ok') {
            return { state: 'change' as const };
          } else if (result.state === 'cancel') {
            return { state: 'newDesign' as const };
          } else {
            return { state: 'change' as const };
          }
        });
      },

      [HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION]: async (response: LockStateResponse): Promise<ChangeToEditResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_no_permission')
          .replace(/{admin}/g, response.management || '');
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        return callModelChange({
          title,
          content,
          okButtonContent
        }).then(() => ({
          state: 'newDesign' as const
        }));
      }
    };
  }
}