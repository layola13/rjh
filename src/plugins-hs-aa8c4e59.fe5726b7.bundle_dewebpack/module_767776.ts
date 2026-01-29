import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

interface InitOptions {
  app: unknown;
  dependencies: Map<string, unknown>;
  signalSendingStylerTemplate: HSCore.Util.Signal;
  signalTemplateDesignToLog: HSCore.Util.Signal;
}

interface StylerTemplateOptions {
  templateData: unknown;
  callback?: () => void;
}

interface RoomTemplateOptions {
  roomId: string;
  templateData: unknown;
  options?: Record<string, unknown>;
}

interface IdMapData {
  [key: string]: unknown;
}

class AutostylerHandler {
  init(options: InitOptions): void {}
  uninit(): void {}
  addEditingPanelCustomizedUI_(element: HTMLElement): void {}
  importStylerTemplate(templateData: unknown, callback?: () => void): void {}
  importStylerTemplateForSingleRoom(roomId: string, templateData: unknown, options?: Record<string, unknown>): void {}
  getMetaProcessor(): unknown {}
  onClickedAddtoStylerTemplateLibrary(data: unknown, callback?: () => void): void {}
  createPickupModel(modelData: unknown, options?: unknown): void {}
  createPickupModelByRoomId(roomId: string, options?: unknown): void {}
  getStrategyManager(): unknown {}
  mergeSameIdsForIdMap(idMap: IdMapData): IdMapData {}
  showMaterialPickUpPage(options: unknown): void {}
  saveImportTemplateToFloorplanExt(templateData: unknown, floorplanId: string): void {}
}

class AutostylerPlugin extends HSApp.Plugin.IPlugin {
  private _handler: AutostylerHandler;
  public signalSendingStylerTemplate: HSCore.Util.Signal;
  public signalTemplateDesignToLog: HSCore.Util.Signal;

  constructor() {
    super({
      name: "Autostyler plugin",
      description: "allows create & import design template for floorplan",
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.Persistence,
        HSFPConstants.PluginType.Ngmmixpaint
      ]
    });

    this.signalSendingStylerTemplate = new HSCore.Util.Signal(this);
    this.signalTemplateDesignToLog = new HSCore.Util.Signal(this);
    this._handler = new AutostylerHandler();
  }

  onActive(pluginManager: unknown, dependencies: Map<string, unknown>): void {
    this._handler.init({
      app: (pluginManager as any).app,
      dependencies,
      signalSendingStylerTemplate: this.signalSendingStylerTemplate,
      signalTemplateDesignToLog: this.signalTemplateDesignToLog
    });
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  addEditingPanelCustomizedUI(element: HTMLElement): void {
    this._handler.addEditingPanelCustomizedUI_(element);
  }

  importStylerTemplate(templateData: unknown, callback?: () => void): void {
    this._handler.importStylerTemplate(templateData, callback);
  }

  importStylerTemplateForSingleRoom(roomId: string, templateData: unknown, options?: Record<string, unknown>): void {
    this._handler.importStylerTemplateForSingleRoom(roomId, templateData, options);
  }

  getMetaProcessor(): unknown {
    return this._handler.getMetaProcessor();
  }

  createTemplateRoom(data: unknown, callback?: () => void): void {
    this._handler.onClickedAddtoStylerTemplateLibrary(data, callback);
  }

  createPickupModel(modelData: unknown, options?: unknown): void {
    this._handler.createPickupModel(modelData, options);
  }

  createPickupModelByRoomId(roomId: string, options?: unknown): void {
    this._handler.createPickupModelByRoomId(roomId, options);
  }

  getStrategyManager(): unknown {
    return this._handler.getStrategyManager();
  }

  mergeSameIdsForIdMap(idMap: IdMapData): IdMapData {
    return this._handler.mergeSameIdsForIdMap(idMap);
  }

  showMaterialPickUpPage(options: unknown): void {
    this._handler.showMaterialPickUpPage(options);
  }

  saveImportTemplateToFloorplanExt(templateData: unknown, floorplanId: string): void {
    this._handler.saveImportTemplateToFloorplanExt(templateData, floorplanId);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Autostyler, AutostylerPlugin);