import { HSApp } from './HSApp';
import { Handler } from './Handler';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface PluginContext {
  app: any;
}

type EditStatusType = string | number;

interface EditStatusOptions {
  [key: string]: any;
}

class EditStatusPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;
  private _editStatusManager: any;

  constructor() {
    const config: PluginConfig = {
      name: 'EditStatus plugin',
      description: 'provide design edit status plugin',
      dependencies: [
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.LeftMenu,
        HSFPConstants.PluginType.PropertyBar,
        HSFPConstants.PluginType.LayerEdit,
        HSFPConstants.PluginType.UserInfo,
        HSFPConstants.PluginType.StatusBar,
        'hsw.plugin.cameraposition.Plugin'
      ]
    };

    super(config);
    this._handler = new Handler();
  }

  onActive(context: PluginContext, options: EditStatusOptions): void {
    super.onActive?.(context, options);
    
    this._editStatusManager = HSApp.EditStatus.EditStatusManager.getInstance();
    this._handler.init(context.app, this._editStatusManager, options);
  }

  registerCustomizedHandle(eventName: string, handler: Function): void {
    this._handler.registerHandle(eventName, handler);
  }

  setModelStatus(status: EditStatusType, options?: EditStatusOptions): void {
    if (status !== this._editStatusManager.status) {
      this._editStatusManager.setStatus(status);
      this._handler.setOptions(options);
      this._handler.switchModel(status);
    }
  }

  getModelStatus(): EditStatusType {
    return this._editStatusManager.status;
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.EditStatus,
  EditStatusPlugin,
  () => Promise.resolve()
);