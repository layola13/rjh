interface ContentMaterialReplaceEnvironmentOptions {
  app: any;
  handler: any;
  context: any;
  contextualToolsPlugin: any;
  toolbarPlugin: any;
  catalogPlugin: any;
  menuPlugin: any;
  resizeWidgetPlugin: any;
  viewSwitchPlugin: any;
  pageheaderPlugin: any;
}

interface LeftMenuStrategy {
  name: string;
  isApplied: () => boolean;
  getItems: () => any[];
}

interface PageHeaderCompleteButton {
  getRenderItem: () => React.ReactElement;
}

interface PageHeaderData {
  envName: string;
  handleClick: () => void;
}

interface Session {
  commit: (options: { mergeRequest: boolean }) => void;
}

interface DeactivateOptions {
  closingDocument?: boolean;
}

class GizmoValidator {}

class ContentMaterialReplaceStyler {
  constructor(options: ContentMaterialReplaceEnvironmentOptions) {}
  
  _setSelectedEntity(entity: any): void {}
  
  enterStyler(): void {}
  
  exitStyler(): void {}
}

class ContentMaterialReplaceCatalog {
  init(): void {}
}

class PageHeaderComponent extends React.Component<{ data: PageHeaderData }> {}

export default class ContentMaterialReplaceEnvironment extends HSApp.Environment.CommonEnvironment {
  private _handler: any;
  private _app: any;
  private context: any;
  private _contextualToolsPlugin: any;
  private _toolbarPlugin: any;
  private _catalogPlugin: any;
  private _menuPlugin: any;
  private _resizeWidgetPlugin: any;
  private _viewSwitchPlugin: any;
  private _pageheaderPlugin: any;
  private _contentMaterialReplaceStyler: ContentMaterialReplaceStyler;
  private _selectedEntity: any;
  private __camera?: any;
  private _from3DViewMode?: boolean;
  private auxCanvas?: any;
  private canvas?: any;
  private _gizmoManager?: any;
  private _session?: Session;
  private leftmenuStrategy?: LeftMenuStrategy;

  constructor(options: ContentMaterialReplaceEnvironmentOptions) {
    super(options.app);
    this._handler = options.handler;
    this._app = options.app;
    this.context = options.context;
    this._contextualToolsPlugin = options.contextualToolsPlugin;
    this._toolbarPlugin = options.toolbarPlugin;
    this._catalogPlugin = options.catalogPlugin;
    this._menuPlugin = options.menuPlugin;
    this._resizeWidgetPlugin = options.resizeWidgetPlugin;
    this._viewSwitchPlugin = options.viewSwitchPlugin;
    this._pageheaderPlugin = options.pageheaderPlugin;
    this._contentMaterialReplaceStyler = new ContentMaterialReplaceStyler(options);
    this._selectedEntity = undefined;
    this.__camera = undefined;
    this._disableHotkey();
  }

  private get _camera(): any {
    if (!this.__camera) {
      this.__camera = HSCore.Model.Camera.create(HSCore.Model.CameraTypeEnum.OrbitView);
    }
    return this.__camera;
  }

  onActivate(): void {
    this._from3DViewMode = this._app.is3DViewActive();
    
    if (!this._from3DViewMode) {
      this._app.switchTo3DView();
    }
    
    this.auxCanvas = this._app.getAux3DView();
    this._setGizmoValidator();
    this._selectedEntity = this._handler.getSelectedEntity();
    this._app.switchToAuxView();
    
    const secondaryView = this._app.secondaryActiveView;
    if (secondaryView) {
      secondaryView.hide();
    }
    
    this._hidePropertyBar();
    this._viewSwitchPlugin.hide();
    this.auxCanvas.onSizeChange();
    this.updateCamera();
    
    const selectedEntity = this._selectedEntity;
    const entitySet = new Set<any>();
    
    if (selectedEntity) {
      entitySet.add(selectedEntity);
      
      if (selectedEntity instanceof HSCore.Model.Group) {
        selectedEntity.toFlatMemberList(true).forEach((member: any) => {
          entitySet.add(member);
        });
        selectedEntity.toFlatGroupList().forEach((group: any) => {
          entitySet.add(group);
        });
      }
      
      entitySet.add(selectedEntity.getUniqueParent());
    }
    
    this.auxCanvas.context.environmentId = "contentmaterialreplace";
    this.auxCanvas.setupCanvas({
      canCreateEntity: (entity: any) => entitySet.has(entity),
      camera: this._camera
    });
    
    this._contentMaterialReplaceStyler._setSelectedEntity(this._selectedEntity);
    this._contentMaterialReplaceStyler.enterStyler();
    this.registerCatalog();
    this._session = undefined;
    this.startSession();
    this._pageheaderPlugin.beforeEnterEnv(this.getPageHeaderCompleteBtn(), "left");
    
    this.leftmenuStrategy = {
      name: "contentMaterialReplaceEnv",
      isApplied: () => {
        return !(this._app.cmdManager.current instanceof HSCore.Command.CmdMaterialBrush);
      },
      getItems: () => []
    };
    
    this._menuPlugin.registerStrategy(this.leftmenuStrategy);
    this._contextualToolsPlugin.hideStatusBar();
  }

  private _disableHotkey(): void {
    const hotkey = this._app.hotkey;
    hotkey.disable("tab", HSFPConstants.Environment.ContentMaterialReplace);
    hotkey.disable("ctrl+d", HSFPConstants.Environment.ContentMaterialReplace);
    hotkey.disable("meta+d", HSFPConstants.Environment.ContentMaterialReplace);
  }

  private _setGizmoValidator(): void {
    const validator = new GizmoValidator();
    this.canvas = this._app.getAux3DView();
    this._gizmoManager = this.canvas.gizmoManager;
    this._gizmoManager.setValidator(validator);
    this._gizmoManager.updateGizmo();
  }

  private _resetGizmoValidator(): void {
    this._gizmoManager.setValidator(null);
    this._gizmoManager.updateGizmo();
  }

  startSession(): void {
    const transManager = this._app.transManager;
    this._session = transManager.startSession();
  }

  endSession(): void {
    if (this._session) {
      this._session.commit({ mergeRequest: false });
    }
    this._session = undefined;
  }

  onDeactivate(options?: DeactivateOptions): void {
    this._app.selectionManager.unselectAll();
    this.auxCanvas.context.environmentId = undefined;
    this._catalogPlugin.hideCatalog();
    this._showPropertyBar();
    this._viewSwitchPlugin.show();
    
    const secondaryView = this._app.secondaryActiveView;
    if (secondaryView) {
      secondaryView.show();
    }
    
    this._app.switchToMainView();
    
    if (!this._from3DViewMode) {
      this._app.switchTo2DView();
      this._app.getActive2DView().onResized();
    }
    
    this._contentMaterialReplaceStyler.exitStyler();
    
    if (!options?.closingDocument) {
      this.endSession();
    }
    
    this._pageheaderPlugin.afterOuterEnv();
    this._menuPlugin.unregisterStrategy(this.leftmenuStrategy);
    this._resetGizmoValidator();
    this._contextualToolsPlugin.showStatusBar();
  }

  registerCatalog(): void {
    const catalog = new ContentMaterialReplaceCatalog();
    catalog.init();
  }

  getPageHeaderCompleteBtn(): PageHeaderCompleteButton {
    const data: PageHeaderData = {
      envName: ResourceManager.getString("content_contextmenu_material_replace_done"),
      handleClick: () => {
        this._handler.exitStyler();
      }
    };
    
    return {
      getRenderItem: () => {
        return React.createElement(PageHeaderComponent, { data });
      }
    };
  }

  getEntityLayerHeight(): number {
    return this._app.floorplan.scene.getLayerAltitude(this._selectedEntity.getUniqueParent());
  }

  updateCamera(): void {
    const camera = this._camera;
    camera.target_x = this._selectedEntity.x;
    camera.target_y = this._selectedEntity.y;
    camera.target_z = this._selectedEntity.z + this.getEntityLayerHeight() + this._selectedEntity.ZSize / 2;
    
    const cameraPosition = new THREE.Vector3(camera.x, camera.y, camera.z + this.getEntityLayerHeight());
    const targetPosition = new THREE.Vector3(camera.target_x, camera.target_y, camera.target_z);
    cameraPosition.sub(targetPosition);
    
    const distance = cameraPosition.length();
    const pitchRadians = THREE.Math.degToRad(this._camera.pitch);
    const zOffset = -Math.sin(pitchRadians) * distance;
    const xyOffset = new THREE.Vector2(camera.target_x - camera.x, camera.target_y - camera.y);
    
    camera.x = camera.target_x - xyOffset.x;
    camera.y = camera.target_y - xyOffset.y;
    camera.z = zOffset + camera.target_z;
  }

  private _hidePropertyBar(): void {
    this._resizeWidgetPlugin.animateHide();
  }

  private _showPropertyBar(): void {
    this._resizeWidgetPlugin.animateShow();
  }
}