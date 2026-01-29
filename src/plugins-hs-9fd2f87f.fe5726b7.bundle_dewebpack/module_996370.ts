import { IPlugin } from './IPlugin';
import { PluginType } from './HSFPConstants';
import EditDesignDialog from './EditDesignDialog';

interface PluginDependencies {
  [PluginType.CommonUI]: CommonUIPlugin;
  [PluginType.Persistence]: PersistencePlugin;
}

interface CommonUIPlugin {
  createDropdownMenu: (...args: unknown[]) => unknown;
  createPopupwindow: (options: PopupWindowOptions) => React.ReactElement;
}

interface PersistencePlugin {
  ensureSaved: () => Promise<boolean>;
  signalSaveProcess: {
    dispatch: (payload: SaveProcessPayload) => void;
  };
}

interface SaveProcessPayload {
  process: string;
  description: string;
  saveType: string;
  needLog: boolean;
}

interface PopupWindowOptions {
  windowname: string;
  title: string;
  contents: React.ReactElement;
  width: number;
  submitcall: () => void;
  cancelcall: () => void;
}

interface DesignMetadata {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}

interface DesignInfo {
  name: string;
  status: string;
  address: string;
  basicAttributes: Record<string, unknown>;
}

interface ShowDialogOptions {
  checkDesignInfoValidity?: boolean;
}

declare global {
  const HSApp: {
    App: {
      getApp: () => {
        designMetadata: DesignMetadata;
      };
    };
    Plugin: {
      IPlugin: typeof IPlugin;
      registerPlugin: (type: string, plugin: typeof EditDesignPlugin) => void;
    };
  };
  const HSFPConstants: {
    PluginType: {
      CommonUI: string;
      Persistence: string;
      EditDesign: string;
    };
  };
  const ResourceManager: {
    getString: (key: string) => string;
  };
  const adskUser: {
    sid: string;
  };
  const React: typeof import('react');
  const ReactDOM: typeof import('react-dom');
}

class EditDesignPlugin extends IPlugin {
  private commonUI!: CommonUIPlugin;
  private persistPlugin!: PersistencePlugin;
  private documentStatus?: unknown;
  private assetId?: unknown;
  private sid?: string;
  private activePage?: React.Component;

  constructor() {
    super({
      name: 'ezhome edit design plugin',
      description: 'ezhome edit design for floorplan',
      dependencies: [
        HSFPConstants.PluginType.CommonUI,
        HSFPConstants.PluginType.Persistence
      ]
    });
  }

  onActive(context: unknown, dependencies: PluginDependencies): void {
    super.onActive?.(context, dependencies);
    this.commonUI = dependencies[HSFPConstants.PluginType.CommonUI];
    this.persistPlugin = dependencies[HSFPConstants.PluginType.Persistence];
  }

  onDeactive(): void {
    // Override hook for cleanup
  }

  showDialog(options?: ShowDialogOptions): Promise<boolean> {
    return this.persistPlugin.ensureSaved().then((isSaved: boolean) => {
      return new Promise<boolean>((resolve, reject) => {
        if (isSaved) {
          const designMetadata = HSApp.App.getApp().designMetadata;

          const handleCancel = (): void => {
            resolve(false);
            this.persistPlugin.signalSaveProcess.dispatch({
              process: 'editDialog',
              description: '用户取消保存编辑详情',
              saveType: 'update',
              needLog: true
            });
          };

          this.documentStatus = designMetadata.get('documentStatus');
          this.assetId = designMetadata.get('designId');
          this.sid = adskUser.sid;

          const handleSave = (designInfo: DesignInfo): void => {
            designMetadata.set('designName', designInfo.name);
            designMetadata.set('documentStatus', designInfo.status);
            designMetadata.set('address', designInfo.address);
            designMetadata.set('basicAttributes', designInfo.basicAttributes);
            resolve(true);
            this.persistPlugin.signalSaveProcess.dispatch({
              process: 'editDialog',
              description: '用户点击了编辑详情保存按钮',
              saveType: 'update',
              needLog: true
            });
          };

          const dialogContent = React.createElement(EditDesignDialog, {
            assetid: this.assetId,
            documentStatus: this.documentStatus,
            dropdown: this.commonUI.createDropdownMenu,
            onSave: handleSave,
            onCancel: handleCancel,
            checkDesignInfoValidity: options?.checkDesignInfoValidity
          });

          const popupOptions: PopupWindowOptions = {
            windowname: 'editdesigndialog',
            title: ResourceManager.getString('toolBar_edit_properties'),
            contents: dialogContent,
            width: 500,
            submitcall: () => {},
            cancelcall: handleCancel
          };

          const popupWindow = this.commonUI.createPopupwindow(popupOptions);
          this.activePage = ReactDOM.render(
            popupWindow,
            document.querySelector('.popupcontainer')
          );
        }
      });
    });
  }

  hideDiglog(): void {
    // Method for hiding dialog
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.EditDesign, EditDesignPlugin);

export default EditDesignPlugin;