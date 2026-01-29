import { CanvasMaskEnv } from 'HSApp/Environment';
import { EntityFlagEnum, ContentFlagEnum } from 'HSCore/Model';

interface OpeningStylerEnvOptions {
  app: any;
  handler: OpeningStylerHandler;
  contextualToolsPlugin: ContextualToolsPlugin;
  propertyBarPlugin: PropertyBarPlugin;
  catalogPlugin: CatalogPlugin;
  leftMenuPlugin: MenuPlugin;
  resizeWidgetPlugin: ResizeWidgetPlugin;
  viewSwitchPlugin: ViewSwitchPlugin;
  pageheaderPlugin: PageHeaderPlugin;
  toolbarPlugin: ToolbarPlugin;
}

interface OpeningStylerHandler {
  getTemplateEntity(): any;
  applyStyle(entities: any[], options: { entire: boolean }): void;
  exitStyler(): void;
}

interface ContextualToolsPlugin {
  hideStatusBar(): void;
  showStatusBar(): void;
}

interface PropertyBarPlugin {
  hide(): void;
  show(): void;
}

interface CatalogPlugin {
  toggleCatalog(visible: boolean): void;
}

interface MenuPlugin {
  disableLeftMenu(): void;
  enableLeftMenu(): void;
}

interface ResizeWidgetPlugin {
  animateHide(animate: boolean): void;
  animateShow(animate: boolean): void;
}

interface ViewSwitchPlugin {
  hide(): void;
  show(): void;
}

interface PageHeaderPlugin {
  beforeEnterEnv(config: any, position: string): void;
  afterOuterEnv(): void;
}

interface MaskOptions {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
}

interface StylerOptions {
  app: any;
  handler: OpeningStylerHandler;
  toolbarPlugin: ToolbarPlugin;
  displayList: Map<string, any>;
}

interface ToolbarPlugin {
  // Define toolbar plugin interface as needed
}

interface PageHeaderButton {
  envName: string;
  handleClick: () => void;
}

const MASK_BOUNDS = {
  X: -20000,
  Y: -20000,
  WIDTH: 40000,
  HEIGHT: 40000,
};

const MASK_STYLE = {
  FILL: '#e1e3e4',
  OPACITY: 0.7,
};

export class OpeningStylerEnv extends CanvasMaskEnv {
  private readonly _handler: OpeningStylerHandler;
  private readonly _contextualToolsPlugin: ContextualToolsPlugin;
  private readonly _propertyBarPlugin: PropertyBarPlugin;
  private readonly _catalogPlugin: CatalogPlugin;
  private readonly _menuPlugin: MenuPlugin;
  private readonly _resizeWidgetPlugin: ResizeWidgetPlugin;
  private readonly _viewSwitchPlugin: ViewSwitchPlugin;
  private readonly _pageheaderPlugin: PageHeaderPlugin;
  private readonly _freezeEntities: Set<any>;
  private readonly _hiddenOpenings: Set<any>;
  private readonly _targetOpenings: Set<any>;
  private readonly _unselectableOpenings: Set<any>;
  private readonly _hiddenContents: Set<any>;
  private readonly _displayList: Map<string, any>;
  private readonly _styler: any;
  private readonly _maskOptions: MaskOptions;

  constructor(options: OpeningStylerEnvOptions) {
    super(options.app);

    this._handler = options.handler;
    this._contextualToolsPlugin = options.contextualToolsPlugin;
    this._propertyBarPlugin = options.propertyBarPlugin;
    this._catalogPlugin = options.catalogPlugin;
    this._menuPlugin = options.leftMenuPlugin;
    this._resizeWidgetPlugin = options.resizeWidgetPlugin;
    this._viewSwitchPlugin = options.viewSwitchPlugin;
    this._pageheaderPlugin = options.pageheaderPlugin;

    this._freezeEntities = new Set();
    this._hiddenOpenings = new Set();
    this._targetOpenings = new Set();
    this._unselectableOpenings = new Set();
    this._hiddenContents = new Set();
    this._displayList = new Map();

    this._styler = new (Styler as any)({
      app: this._app,
      handler: this._handler,
      toolbarPlugin: options.toolbarPlugin,
      displayList: this._displayList,
    });

    this._maskOptions = {
      type: 'rect',
      x: MASK_BOUNDS.X,
      y: MASK_BOUNDS.Y,
      width: MASK_BOUNDS.WIDTH,
      height: MASK_BOUNDS.HEIGHT,
      fill: MASK_STYLE.FILL,
      opacity: MASK_STYLE.OPACITY,
    };
  }

  public onActivate(): void {
    super.onActivate();

    this._catalogPlugin.toggleCatalog(false);
    this._viewSwitchPlugin.hide();
    this._menuPlugin.disableLeftMenu();
    this._pageheaderPlugin.beforeEnterEnv(this.getPageHeaderCompleteBtn(), 'left');
    this._hidePropertyBar();
    this._app.hotkey.disable('tab', HSFPConstants.Environment.OpeningStyler);
    this._hideLayerEditor();
    this._prepareContents();
    this._styler.enterStyler();
  }

  public onDeactivate(): void {
    this._catalogPlugin.toggleCatalog(true);
    this._viewSwitchPlugin.show();
    this._menuPlugin.enableLeftMenu();
    this._pageheaderPlugin.afterOuterEnv();
    this._showPropertyBar();
    this._showLayerEditor();
    this._restoreContents();
    this._styler.exitStyler();

    super.onDeactivate();
  }

  public getPageHeaderCompleteBtn(): { getRenderItem: () => any } {
    const buttonData: PageHeaderButton = {
      envName: ResourceManager.getString('plugin_contentstyler_attibutes_done'),
      handleClick: () => {
        const templateEntity = this._handler.getTemplateEntity();
        const targetEntities = this._styler.getTargetEntities();

        if (templateEntity && targetEntities.length) {
          this._handler.applyStyle(targetEntities, { entire: true });
        } else {
          LiveHint.hide();
        }

        this._handler.exitStyler();
      },
    };

    return {
      getRenderItem: () => {
        return React.createElement(PageHeaderButton as any, { data: buttonData });
      },
    };
  }

  private _hidePropertyBar(): void {
    this._contextualToolsPlugin.hideStatusBar();
    this._propertyBarPlugin.hide();
    this._resizeWidgetPlugin.animateHide(false);
  }

  private _showPropertyBar(): void {
    this._contextualToolsPlugin.showStatusBar();
    this._propertyBarPlugin.show();
    this._resizeWidgetPlugin.animateShow(false);
  }

  private _hideLayerEditor(): void {
    const layerEditPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
    if (layerEditPlugin?.canShow()) {
      layerEditPlugin.hide();
    }
  }

  private _showLayerEditor(): void {
    const layerEditPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
    if (layerEditPlugin?.canShow()) {
      layerEditPlugin.show();
    }
  }

  private _prepareContents(): void {
    this._app.floorplan.forEachWall((wall: any) => {
      if (wall.isFlagOff(EntityFlagEnum.freezed)) {
        wall.setFlagOn(EntityFlagEnum.freezed, true);
        this._freezeEntities.add(wall);
      }
    });

    this._app.floorplan.forEachOpening((opening: any) => {
      if (opening.isFlagOff(EntityFlagEnum.freezed)) {
        opening.setFlagOn(EntityFlagEnum.freezed, true);
        this._freezeEntities.add(opening);
      }

      if (opening.isFlagOn(EntityFlagEnum.hidden)) {
        opening.setFlagOff(EntityFlagEnum.hidden, false);
        this._hiddenOpenings.add(opening);
      }

      if (this._styler.isOpeningStylerContent(opening)) {
        this._replaceDisplayObject(opening);
        this._targetOpenings.add(opening);
      } else {
        if (opening.isFlagOn(EntityFlagEnum.unselectable)) {
          return;
        }
        opening.setFlagOn(EntityFlagEnum.unselectable, true);
        this._unselectableOpenings.add(opening);
      }
    });

    this._app.floorplan.forEachContent((content: any) => {
      if (!content.isFlagOn(EntityFlagEnum.hidden)) {
        content.setFlagOn(EntityFlagEnum.hidden, true);
        this._hiddenContents.add(content);
      }
    });

    const templateEntity = this._handler.getTemplateEntity();
    this._replaceDisplayObject(templateEntity, true);
  }

  private _restoreContents(): void {
    this._freezeEntities.forEach((entity: any) => {
      entity.setFlagOff(EntityFlagEnum.freezed, true);
    });

    this._hiddenOpenings.forEach((opening: any) => {
      opening.setFlagOn(EntityFlagEnum.hidden, false);
    });

    this._targetOpenings.forEach((opening: any) => {
      opening.setFlagOff(ContentFlagEnum.replace, true);
    });

    this._unselectableOpenings.forEach((opening: any) => {
      opening.setFlagOff(EntityFlagEnum.unselectable, true);
    });

    this._hiddenContents.forEach((content: any) => {
      content.setFlagOff(EntityFlagEnum.hidden, true);
    });

    const activeView = this._app.getActive2DView();
    this._displayList.forEach((displayObject: any) => {
      activeView.removeElementFromLayer(displayObject);
      displayObject.clear();
    });

    this._freezeEntities.clear();
    this._hiddenOpenings.clear();
    this._unselectableOpenings.clear();
    this._hiddenContents.clear();
    this._displayList.clear();
  }

  private _replaceDisplayObject(entity: any, isTemplate: boolean = false): void {
    const activeView = this._app.getActive2DView();
    const displayObject = new (DisplayObject as any)(
      activeView.context,
      undefined,
      activeView.displayLayers.temp,
      entity,
      { isTemplate }
    );

    displayObject.init();
    displayObject.draw();
    this._displayList.set(entity.ID, displayObject);
  }
}