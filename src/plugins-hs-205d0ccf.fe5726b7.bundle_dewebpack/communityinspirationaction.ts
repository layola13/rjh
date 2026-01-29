import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Action } from './Action';
import { showSelectRoomDialog } from './DialogUtils';
import { GizmoFactory } from './GizmoFactory';

type PluginStatusData = {
  status: string;
  [key: string]: unknown;
};

type SignalData<T = unknown> = {
  data: T;
};

type ViewSettings = {
  canCreateEntity: (entity: unknown) => boolean;
  overrideViewSettings: {
    face: {
      useMixpaint: boolean;
      style: {
        getNormal: (entity: HSCore.Model.Face) => { fill: string; opacity: number };
        getHover: (entity: HSCore.Model.Face) => { fill: string; opacity: number };
        getSelected: (entity: HSCore.Model.Face) => { fill: string; opacity: number };
      };
    };
  };
};

export class CommunityInspirationAction extends Action {
  private _signalHook: HSCore.Util.SignalHook;
  private _aux2DView?: HSApp.View.SVG.AuxCanvas;
  private _app: HSApp.App;

  constructor() {
    super();
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._app = HSApp.App.getApp();
  }

  public executeCmd = async (templateId: string): Promise<boolean> => {
    const selectedFaces = this._app.selectionManager.selected(true);

    if (!selectedFaces.length || !(selectedFaces[0] instanceof HSCore.Model.Face)) {
      return false;
    }

    const roomInfo = selectedFaces[0].roomInfos?.[0];
    const floor = roomInfo?.floors?.[0];

    if (!floor) {
      return false;
    }

    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.StartUpAction.InspirationAction,
      [floor, templateId]
    );

    if (!command) {
      return false;
    }

    this._app.selectionManager.unselectAll();
    this._app.cmdManager.execute(command);
    return true;
  };

  public onExecute(): void {
    super.onExecute();

    const welcomePlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Welcome);
    if (welcomePlugin) {
      this._signalHook.listen(welcomePlugin.signalStatusChanged, this._onWelcomeStatusChanged);
    }

    const designTemplatesPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.DesignTemplates);
    if (designTemplatesPlugin) {
      this._signalHook.listen(designTemplatesPlugin.signalStatusChanged, this._onDesignTemplatesStatusChanged);
    }

    const underlayImgPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.UnderlayImg);
    if (underlayImgPlugin) {
      this._signalHook.listen(underlayImgPlugin.signalStatusChanged, this._onUnderlayImgStatusChanged);
    }

    const wallAutoBuilderPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.WallAutoBuilder);
    if (wallAutoBuilderPlugin) {
      this._signalHook.listen(wallAutoBuilderPlugin.signalStatusChanged, this._onWallAutoBuilderStatusChanged);
    }
  }

  public onDestroy(): void {
    super.onDestroy();
    this._removeWindowUrlParams();
    this._signalHook.dispose();
    this.destroyAux2DView();
  }

  private _removeWindowUrlParams(): void {
    let url = window.location.href;
    url = HSApp.Util.Url.deleteParamInUrl(url, 'actionType');
    url = HSApp.Util.Url.deleteParamInUrl(url, 'templateId');
    HSApp.Util.Url.addWindowHistoryState('CommunityInspirationAction', '', url);
  }

  private _onWelcomeStatusChanged = (signal: SignalData<PluginStatusData>): void => {
    switch (signal.data.status) {
      case 'loadDesignData':
        this._signalHook.listen(this._app.signalDocumentOpened, this._onDocumentOpened);
        break;
      case 'cancel':
        this.manager.cancel();
        break;
    }
  };

  private _onDesignTemplatesStatusChanged = (signal: SignalData<PluginStatusData>): void => {
    switch (signal.data.status) {
      case 'loadDesignDataTemplate':
        this._signalHook.listen(this._app.signalDocumentOpened, this._onDocumentOpened);
        break;
      case 'loadDesignDataTemplateError':
      case 'cancel':
        this.manager.cancel();
        break;
    }
  };

  private _onUnderlayImgStatusChanged = (signal: SignalData<PluginStatusData>): void => {
    switch (signal.data.status) {
      case 'showRecognitionStep':
        this._setImageAutoRecognitionOnce();
        break;
      case 'buildFloorplanByImg':
      case 'buildFloorplanByCadMultiLayer':
        this._showSelectRoom();
        break;
      case 'uploadImgFileCancel':
      case 'importImgError':
      case 'importImgCancel':
      case 'importCadError':
      case 'cancelImportCad':
      case 'cancelBuildFloorplan':
        this.manager.cancel();
        break;
    }
  };

  private _setImageAutoRecognitionOnce(): void {
    const underlayImgPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.UnderlayImg);
    if (underlayImgPlugin) {
      underlayImgPlugin.setImageAutoRecognitionOnce(true);
    }
  }

  private _onWallAutoBuilderStatusChanged = (signal: SignalData<PluginStatusData>): void => {
    switch (signal.data.status) {
      case 'cancelBuildFloorplan':
        this.manager.cancel();
        break;
      case 'buildFloorplan':
        this._showSelectRoom();
        break;
    }
  };

  private _onDocumentOpened = (): void => {
    this._signalHook.unlisten(this._app.signalDocumentOpened);
    this._showSelectRoom();
  };

  private _showSelectRoom(): void {
    this._app.selectionManager.unselectAll();
    showSelectRoomDialog(this, {
      disableOkButton: true,
      executeCmd: this.executeCmd
    });
    this._signalHook.listen(this._app.selectionManager.signalSelectionChanged, this._onSelectionChanged);
  }

  private _onSelectionChanged = (): void => {
    let disableOkButton = true;
    const selected = this._app.selectionManager.selected(true);

    if (selected.length && selected[0] instanceof HSCore.Model.Face) {
      disableOkButton = false;
    }

    showSelectRoomDialog(this, {
      disableOkButton,
      executeCmd: this.executeCmd
    });
  };

  public createAux2DView(container: HTMLElement): void {
    if (this._aux2DView) {
      return;
    }

    this._aux2DView = new HSApp.View.SVG.AuxCanvas(container);
    this._aux2DView.registerGizmoFactory(new GizmoFactory(this._aux2DView));

    const viewSettings: ViewSettings = {
      canCreateEntity: (entity: unknown): boolean => {
        return (
          entity instanceof HSCore.Model.Layer ||
          entity instanceof HSCore.Model.Wall ||
          entity instanceof HSCore.Model.Slab ||
          entity instanceof HSCore.Model.Face
        );
      },
      overrideViewSettings: {
        face: {
          useMixpaint: false,
          style: {
            getNormal: (entity: HSCore.Model.Face) => ({
              fill: '#D7D7D7',
              opacity: 1
            }),
            getHover: (entity: HSCore.Model.Face) => ({
              fill: '#9CB7FE',
              opacity: 0.6
            }),
            getSelected: (entity: HSCore.Model.Face) => ({
              fill: '#9CB7FE',
              opacity: 1
            })
          }
        }
      }
    };

    this._aux2DView.setupCanvas(viewSettings);
    this._aux2DView.activate();
    this._aux2DView.show();
  }

  public destroyAux2DView(): void {
    this._aux2DView?.clear();
    this._aux2DView = undefined;
  }

  public resizeAux2DView(): void {
    if (this._aux2DView) {
      this._aux2DView.onResized();
      this._aux2DView.fit();
    }
  }
}