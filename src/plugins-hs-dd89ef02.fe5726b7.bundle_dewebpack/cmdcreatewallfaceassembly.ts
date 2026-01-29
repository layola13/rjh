import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

export class CmdCreateWallFaceAssembly extends HSApp.Cmd.Command {
  private readonly _entity: HSCore.Model.NCPBackgroundWallBase | HSCore.Model.WallFaceAssembly;
  private readonly _defaultEvent?: MouseEvent;
  private _app: HSApp.App.Application;
  private _wfaDecorator: HSCore.Model.WallFaceAssemblyDecorator;
  private _leftMenuPlugin?: any;
  private _previewCtrl?: MiniImagePreviewCtrl;
  private _tipHasShown: boolean;
  private _selectionMgr: HSApp.Selection.SelectionManager;
  private _signalHook: HSCore.Util.SignalHook;
  private _hostFace: HSCore.Model.Face;
  private _hiddenEntities: HSCore.Model.Entity[];
  private _freezeEntities: HSCore.Model.Entity[];
  public assemblyUnits: (HSCore.Model.WallFaceAssembly | HSCore.Model.Entity)[];

  constructor(
    entity: HSCore.Model.NCPBackgroundWallBase | HSCore.Model.WallFaceAssembly,
    defaultEvent?: MouseEvent
  ) {
    super();
    this._entity = entity;
    this._defaultEvent = defaultEvent;
    this._hostFace = this._getHostedFace();
    this._tipHasShown = false;
    this._selectionMgr = HSApp.Selection.Manager;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.assemblyUnits = [];
    this._hiddenEntities = [];
    this._freezeEntities = [];
    this._wfaDecorator = new HSCore.Model.WallFaceAssemblyDecorator();
    this._app = HSApp.App.getApp();
    this._leftMenuPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu);
  }

  private _getHostedFace(): HSCore.Model.Face {
    const sourceEntity = this._entity instanceof HSCore.Model.WallFaceAssembly
      ? this._entity.backgroundWalls[0]
      : this._entity;
    return HSCore.Util.Content.getHostedFace(sourceEntity);
  }

  public showLiveHint(hintKey: string): void {
    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.ContentManipulation);
    if (storage.get(hintKey)) {
      return;
    }

    if (hintKey === 'plugin_wallface_assembly_livehint_click_again_deselect') {
      if (this._tipHasShown) {
        return;
      }
      this._tipHasShown = true;
    }

    LiveHint.show(
      ResourceManager.getString(hintKey),
      5000,
      () => {
        LiveHint.hide();
        storage.set(hintKey, true);
      },
      {
        append: ResourceManager.getString('mixpaint_livehint_connect_faces_append'),
        canclose: true
      }
    );
  }

  private _destroyTitlePreview(): void {
    if (this._previewCtrl) {
      this._previewCtrl.destroy();
      this._previewCtrl = undefined;
    }
  }

  private _createTitlePreview(options: { event?: MouseEvent; title?: string }): boolean {
    if (!this._previewCtrl) {
      this._previewCtrl = new MiniImagePreviewCtrl(options);
      this._previewCtrl.init();
    }

    if (this._previewCtrl && options?.event) {
      this._previewCtrl.title = options.title;
      const position = {
        x: options.event.clientX,
        y: options.event.clientY
      };
      return this._previewCtrl.render(position);
    }

    return false;
  }

  public doAssemble(units?: (HSCore.Model.WallFaceAssembly | HSCore.Model.Entity)[]): boolean {
    const assemblyUnits = units ?? [...this.assemblyUnits, this._entity];
    const transManager = this._app.transManager;
    const requestData = [this._hostFace, assemblyUnits];
    const result = transManager.commit(
      transManager.createRequest(HSFPConstants.RequestType.CreateWallFaceAssembly, requestData)
    );

    this._onComplete();
    this._selectionMgr.select(result, {
      selectionType: HSApp.View.GizmoSelectionType.Select
    });

    return true;
  }

  private _onPopulateRightMenuItems(signal: { data: { defaultItems: any[]; customizedItems: any[] } }): void {
    const menuData = signal.data;
    menuData.defaultItems.length = 0;
    menuData.customizedItems.length = 0;

    menuData.customizedItems.push(
      {
        label: ResourceManager.getString('setting_ok'),
        src: 'confirm',
        id: 'confirm_select_faces',
        unusable: !this.assemblyUnits.length,
        showHotKey: false,
        onClick: () => {
          this.doAssemble();
        }
      },
      {
        label: ResourceManager.getString('cancel'),
        src: 'cancel',
        id: 'cancel_select_faces',
        showHotKey: false,
        onClick: () => {
          this._onCancel();
        }
      },
      {
        label: ResourceManager.getString('plugin_wallface_assembly_group_all_wall_contents'),
        src: 'hs_mian_zhengqiangzuhe',
        id: 'group_all',
        showHotKey: false,
        onClick: () => {
          const allValidUnits = this._getAllValidUnitsOnWall();
          this.doAssemble(allValidUnits);
        }
      }
    );
  }

  private _onViewModeChange(signal: { data?: { newViewMode?: HSApp.View.ViewModeEnum } }): void {
    if (signal.data?.newViewMode !== HSApp.View.ViewModeEnum.Elevation) {
      this._onCancel();
    }
  }

  private _selectWallFaceAssemblyUnit(entity: HSCore.Model.Entity | HSCore.Model.WallFaceAssembly): void {
    if (entity instanceof HSCore.Model.WallFaceAssembly) {
      const entitiesToSelect = [...entity.associatedContents, entity];
      this._selectionMgr.select(entitiesToSelect, {
        selectionType: HSApp.View.GizmoSelectionType.Select
      });
    } else {
      this._selectionMgr.select(entity, {
        selectionType: HSApp.View.GizmoSelectionType.Select
      });
    }
  }

  private _deSelectWallFaceAssemblyUnit(entity: HSCore.Model.Entity | HSCore.Model.WallFaceAssembly): void {
    if (entity instanceof HSCore.Model.WallFaceAssembly) {
      const entitiesToDeselect = [...entity.associatedContents, entity];
      this._selectionMgr.unselect(entitiesToDeselect);
    } else {
      this._selectionMgr.unselect(entity);
    }
  }

  private _enterElevationMode(): void {
    const connectedFaces = HSCore.Util.SameLineFace.getSameLineConnectedFaces(this._hostFace);

    this._app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.Elevation, {
      faces: connectedFaces
    });

    connectedFaces.forEach((face) => {
      Object.values(face.contents).forEach((content) => {
        if (!(content instanceof HSCore.Model.NCPBackgroundWallBase)) {
          content.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
          this._hiddenEntities.push(content);
        }
      });

      face.openings.forEach((opening) => {
        if (!this._wfaDecorator.isValidChild(opening)) {
          opening.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
          this._freezeEntities.push(opening);
        }
      });

      face.parametricOpenings.forEach((parametricOpening) => {
        if (!this._wfaDecorator.isValidChild(parametricOpening)) {
          parametricOpening.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable);
          this._freezeEntities.push(parametricOpening);
        }
      });
    });

    this._selectionMgr.unselectAll();
    this._selectWallFaceAssemblyUnit(this._entity);
    this._signalHook.listen(this._app.signalPrimaryViewModeChanged, this._onViewModeChange);
  }

  private _exitElevationMode(): void {
    this._hiddenEntities.forEach((entity) => {
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    });

    this._freezeEntities.forEach((entity) => {
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable);
    });

    if (this._app.primaryViewMode === HSApp.View.ViewModeEnum.Elevation) {
      this._app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView, undefined);
    }
  }

  public onExecute(): void {
    if (
      this._entity instanceof HSCore.Model.NCPBackgroundWallBase ||
      this._entity instanceof HSCore.Model.WallFaceAssembly
    ) {
      this._enterElevationMode();

      if (this._leftMenuPlugin) {
        this._signalHook.listen(
          this._leftMenuPlugin.signalPopulateCustomizedItems,
          this._onPopulateRightMenuItems
        );
        this._leftMenuPlugin.showLeftMenuBar({
          x: this._defaultEvent?.clientX,
          y: this._defaultEvent?.clientY
        });
      }
    } else {
      this.mgr.cancel(this);
    }
  }

  private _isValidEntity(entity: HSCore.Model.Entity): boolean {
    return (
      entity !== this._entity &&
      (entity instanceof HSCore.Model.WallFaceAssembly || this._wfaDecorator.isValidChild(entity))
    );
  }

  private _getAllValidUnitsOnWall(): HSCore.Model.Entity[] {
    const validUnits: HSCore.Model.Entity[] = [];

    if (this._hostFace) {
      HSApp.Util.WallFaceAssembly.getAllValidChildrenOnSameLineConnectedFaces(this._hostFace).forEach((child) => {
        validUnits.push(HSApp.Util.WallFaceAssembly.getRootContent(child));
      });
    }

    return Array.from(new Set(validUnits));
  }

  public onReceive(eventType: string, eventData: any): boolean {
    const event = eventData.event;
    const rootContent = HSApp.Util.WallFaceAssembly.getRootContent(eventData.entity);

    switch (eventType) {
      case 'mousemove':
        if (this._isValidEntity(rootContent) && !this.assemblyUnits.includes(rootContent)) {
          eventData.title = ResourceManager.getString('plugin_wallface_assembly_livehint_connect_models_tip');
          this._createTitlePreview(eventData);
        } else {
          this._destroyTitlePreview();
        }
        return true;

      case 'click':
        if (this._isValidEntity(rootContent)) {
          this._onClick(rootContent);
          this._destroyTitlePreview();
        }

        if (this._leftMenuPlugin) {
          this._leftMenuPlugin.showLeftMenuBar({
            x: event.clientX,
            y: event.clientY
          });
        }
        return true;

      case 'keydown':
        if (eventData?.keyCode === 27) {
          this._onCancel();
        }
        return true;

      default:
        return super.onReceive(eventType, eventData);
    }
  }

  private _onClick(entity: HSCore.Model.Entity | HSCore.Model.WallFaceAssembly): void {
    const existingIndex = this.assemblyUnits.indexOf(entity);

    if (existingIndex >= 0) {
      this.assemblyUnits.splice(existingIndex, 1);
      this._deSelectWallFaceAssemblyUnit(entity);
    } else {
      this._selectWallFaceAssemblyUnit(entity);
      this.assemblyUnits.push(entity);
      this.showLiveHint('plugin_wallface_assembly_livehint_click_again_deselect');
    }
  }

  private _onComplete(): void {
    this.mgr.complete();
  }

  private _onCancel(): void {
    this.mgr.cancel();
  }

  public onCleanup(): void {
    this._selectionMgr.unselectAll();

    if (this._leftMenuPlugin) {
      this._leftMenuPlugin.hideLeftMenu();
    }

    this._signalHook.unlistenAll();
    this._destroyTitlePreview();
    this._exitElevationMode();

    this._hiddenEntities = [];
    this._freezeEntities = [];

    super.onCleanup();
  }

  public getDescription(): string {
    return '创建墙面组合';
  }

  public canSuspend(): boolean {
    return false;
  }
}