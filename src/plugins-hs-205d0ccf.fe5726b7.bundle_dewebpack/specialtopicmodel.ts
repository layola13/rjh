import { Action } from './Action';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface SpecialTopicParams {
  poolId: string;
  coverUrl: string;
}

interface SpecialTopicAttributes {
  COVER: string;
}

interface ShowSpecialTopicOptions {
  poolId: string;
  attributes: SpecialTopicAttributes;
}

interface Plugin {
  signalStatusChanged: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface App {
  pluginManager: PluginManager;
}

export class SpecialTopicModel extends Action {
  private _signalHook: HSCore.Util.SignalHook;
  private _app: App;

  constructor() {
    super();
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._app = HSApp.App.getApp();
  }

  onExecute(params: SpecialTopicParams): void {
    super.onExecute([]);

    const welcomePlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Welcome);
    if (welcomePlugin) {
      this._signalHook.listen(welcomePlugin.signalStatusChanged, () => this._onChanged(params));
    }

    const designTemplatesPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.DesignTemplates);
    if (designTemplatesPlugin) {
      this._signalHook.listen(designTemplatesPlugin.signalStatusChanged, () => this._onChanged(params));
    }

    const underlayImgPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.UnderlayImg);
    if (underlayImgPlugin) {
      this._signalHook.listen(underlayImgPlugin.signalStatusChanged, () => this._onChanged(params));
    }

    const wallAutoBuilderPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.WallAutoBuilder);
    if (wallAutoBuilderPlugin) {
      this._signalHook.listen(wallAutoBuilderPlugin.signalStatusChanged, () => this._onChanged(params));
    }
  }

  private _onChanged(params: SpecialTopicParams): void {
    HSApp.Catalog.Manager.showSpecialTopic({
      poolId: params.poolId,
      attributes: {
        COVER: params.coverUrl
      }
    });
    this.onDestroy();
  }

  onDestroy(): void {
    super.onDestroy([]);
    this._removeWindowUrlParams();
    this._signalHook.dispose();
  }

  private _removeWindowUrlParams(): void {
    const updatedUrl = HSApp.Util.Url.replaceParamsInUrl({
      actionType: '',
      poolId: '',
      coverUrl: ''
    });

    HSApp.Util.Url.addWindowHistoryState('actionType', '', updatedUrl);
    HSApp.Util.Url.addWindowHistoryState('poolId', '', updatedUrl);
    HSApp.Util.Url.addWindowHistoryState('coverUrl', '', updatedUrl);
  }
}