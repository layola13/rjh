import { SignalHook } from 'HSCore.Util';
import { ApplyGeometryMaterialToPocketCommand, ApplyGeometryMaterialToPocketRequest } from './ApplyGeometryMaterialToPocket';
import { ApplyGeometryMaterialToOpeningCommand, ApplyGeometryMaterialToOpeningRequest } from './ApplyGeometryMaterialToOpening';
import { ApplyGeometryMaterialToSillRequest } from './ApplyGeometryMaterialToSill';
import { OpeningStylerEnv } from './OpeningStylerEnv';
import { StylerFactory } from './StylerFactory';

interface InitOptions {
  app: HSCore.Application;
  dependencies: Record<string, unknown>;
}

interface RightPropertyBarEvent {
  data: {
    rightPropertyItems: PropertyItemCollection;
  };
}

interface PropertyItemCollection {
  length: number;
  xInsertCollection(index: number, items: PropertyBarItem[]): void;
}

interface PropertyBarItem {
  id: string;
  label: string;
  className: string;
  isApplyToAllBtnCard: boolean;
  items: PropertyBarControl[];
}

interface PropertyBarControl {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  data: PropertyBarControlData;
}

interface PropertyBarControlData {
  className: string;
  icon: string;
  text: string;
  disabled: boolean;
  onclick: (event: unknown) => void;
}

enum PropertyBarControlTypeEnum {
  button = 'button'
}

type OpeningEntity = HSCore.Model.Door | HSCore.Model.Window;

interface Styler {
  applyStyle(target: OpeningEntity): void;
  cleanUp(): void;
}

export default class OpeningStylerPlugin {
  private _signalHook: SignalHook;
  private app!: HSCore.Application;
  private _fromEnvironmentId?: string;
  private _templateEntity?: OpeningEntity;

  constructor() {
    this._signalHook = new SignalHook(this);
  }

  init(options: InitOptions): void {
    this.app = options.app;
    const dependencies = options.dependencies;
    
    this.registerCommands();
    this.registerTransactions();
    this.registerEnvironments(dependencies);
    
    this._fromEnvironmentId = undefined;
    this._templateEntity = undefined;
  }

  getTemplateEntity(): OpeningEntity | undefined {
    return this._templateEntity;
  }

  setTemplateEntity(entity: OpeningEntity): void {
    this._templateEntity = entity;
  }

  registerCommands(): void {
    const commandManager = this.app.cmdManager;
    commandManager.register(HSFPConstants.CommandType.ApplyGeometryMaterialToPocket, ApplyGeometryMaterialToPocketCommand);
    commandManager.register(HSFPConstants.CommandType.ApplyGeometryMaterialToOpening, ApplyGeometryMaterialToOpeningCommand);
  }

  registerTransactions(): void {
    const transactionManager = this.app.transManager;
    transactionManager.register(HSFPConstants.RequestType.ApplyGeometryMaterialToPocket, ApplyGeometryMaterialToPocketRequest);
    transactionManager.register(HSFPConstants.RequestType.ApplyGeometryMaterialToSill, ApplyGeometryMaterialToSillRequest);
    transactionManager.register(HSFPConstants.RequestType.ApplyGeometryMaterialToOpening, ApplyGeometryMaterialToOpeningRequest);
  }

  registerEnvironments(dependencies: Record<string, unknown>): void {
    const contextualToolsPlugin = dependencies[HSFPConstants.PluginType.ContextualTools];
    const propertyBarPlugin = dependencies[HSFPConstants.PluginType.PropertyBar];
    const toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    const catalogPlugin = dependencies[HSFPConstants.PluginType.Catalog];
    const leftMenuPlugin = dependencies[HSFPConstants.PluginType.LeftMenu];
    const rightMenuPlugin = dependencies[HSFPConstants.PluginType.RightMenu];
    const resizeWidgetPlugin = dependencies['hsw.plugin.resizewidget.Plugin'];
    const viewSwitchPlugin = dependencies[HSFPConstants.PluginType.ViewSwitch];
    const pageHeaderPlugin = dependencies[HSFPConstants.PluginType.PageHeader];

    const openingStylerEnv = new OpeningStylerEnv({
      contextualToolsPlugin,
      propertyBarPlugin,
      toolbarPlugin,
      catalogPlugin,
      leftMenuPlugin,
      rightMenuPlugin,
      resizeWidgetPlugin,
      viewSwitchPlugin,
      pageheaderPlugin: pageHeaderPlugin,
      handler: this,
      app: this.app
    });

    this.app.registerEnvironment(HSFPConstants.Environment.OpeningStyler, openingStylerEnv);
  }

  onPopulateRightPropertyBar(event: RightPropertyBarEvent): void {
    if (!this.app.is3DViewActive()) {
      const selectedEntities = this.app.selectionManager.selected();
      
      if (selectedEntities.length === 1) {
        const selectedEntity = selectedEntities[0];
        
        if (selectedEntity instanceof HSCore.Model.Door || selectedEntity instanceof HSCore.Model.Window) {
          const rightPropertyItems = event.data.rightPropertyItems;
          const propertyBarItem = this.getRightPropertyBarItem(selectedEntity);
          rightPropertyItems.xInsertCollection(rightPropertyItems.length, propertyBarItem);
        }
      }
    }
  }

  getRightPropertyBarItem(entity: OpeningEntity): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];
    let labelKey = '';
    let iconPath = '';

    switch (entity.Class) {
      case HSConstants.ModelClass.NgDoor:
        labelKey = 'plugin_contentstyler_apply_to_other_door';
        iconPath = 'plugin/contentstyler/res/ImgContentStyler/replacedoors.svg';
        break;
      case HSConstants.ModelClass.NgWindow:
        labelKey = 'plugin_contentstyler_apply_to_other_window';
        iconPath = 'plugin/contentstyler/res/ImgContentStyler/replacewindows.svg';
        break;
    }

    items.push({
      id: 'applyContentStyleBtn',
      label: '',
      className: 'applyContent',
      isApplyToAllBtnCard: true,
      items: [{
        id: 'selectConentsToApply',
        type: PropertyBarControlTypeEnum.button,
        order: 100,
        data: {
          className: 'applyContent',
          icon: iconPath,
          text: ResourceManager.getString(labelKey),
          disabled: false,
          onclick: (event: unknown) => {
            this.app.selectionManager.unselect(entity);
            this.setTemplateEntity(entity);
            this.startStyler();
          }
        }
      }]
    });

    return items;
  }

  applyStyle(target: OpeningEntity, template: OpeningEntity): void {
    const styler: Styler | null = StylerFactory.createStyler(this._templateEntity, template);
    
    if (styler) {
      styler.applyStyle(target);
      styler.cleanUp();
    }
  }

  startStyler(): void {
    const singleRoomPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.SingleRoom);
    singleRoomPlugin?.cancelSingleRoom();

    const stylerEnvironment = StylerFactory.getStylerEnv(this._templateEntity);
    
    if (stylerEnvironment) {
      this._fromEnvironmentId = this.app.activeEnvironmentId;
      this.app.activateEnvironment(stylerEnvironment);
    }
  }

  exitStyler(): void {
    this.app.activateEnvironment(this._fromEnvironmentId);
    this._fromEnvironmentId = undefined;
  }
}