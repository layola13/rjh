import { HSCore } from './core';
import { IPlugin, Plugin } from './plugin';
import { CommandManager } from './command-manager';
import { AssignOpeningToHostCommand } from './commands/assign-opening-to-host';
import { AddOpeningToWallCommand } from './commands/add-opening-to-wall';
import { WallLayoutHandler } from './handlers/wall-layout-handler';

interface CADLayerData {
  layer: string;
  parallelLines: unknown;
  cadPoints: unknown;
}

interface ParsedLayerInfo {
  layer: string;
  walls: unknown[];
}

interface StatusChangePayload {
  status: unknown;
}

interface CADSettings {
  [key: string]: unknown;
}

class WallAutoBuilderPlugin extends IPlugin {
  public signalStatusChanged: HSCore.Util.Signal<StatusChangePayload>;
  private cmdMgr?: CommandManager;

  constructor() {
    super({
      name: 'Wall Auto builder plugin',
      description: 'auto build wall from dwg import.',
      dependencies: []
    });

    this.signalStatusChanged = new HSCore.Util.Signal<StatusChangePayload>(this);
  }

  public onActive(context: unknown, options: unknown): void {
    const app = (context as any).app;
    this.cmdMgr = app.cmdManager;
    
    this.cmdMgr.register(
      HSFPConstants.CommandType.AssignOpeningToHost,
      AssignOpeningToHostCommand
    );
    
    this.cmdMgr.register(
      HSFPConstants.CommandType.AddOpeningToWall,
      HSFPConstants.CommandType.Sequence,
      AddOpeningToWallCommand
    );
  }

  public findWallLayer(layers: CADLayerData[]): string | undefined {
    const parsedLayers: ParsedLayerInfo[] = layers
      .map((layerData) => {
        const handler = this._createHandler();
        const walls = handler.parseLayerInfo(
          layerData.parallelLines,
          layerData.cadPoints,
          layerData.layer
        );
        
        return {
          layer: layerData.layer,
          walls
        };
      })
      .filter((parsed) => parsed.walls);

    if (parsedLayers.length === 0) {
      return undefined;
    }

    let maxWallsIndex = 0;
    let maxWallsCount = 0;

    parsedLayers.forEach((parsed, index) => {
      if (parsed.walls.length > maxWallsCount) {
        maxWallsIndex = index;
        maxWallsCount = parsed.walls.length;
      }
    });

    return parsedLayers[maxWallsIndex].layer;
  }

  public buildWall(
    wallData: unknown,
    layerName: string,
    options: unknown,
    additionalParam?: unknown
  ): void {
    HSApp.App.getApp().switchTo2DView();
    this._createHandler().buildWall(wallData, layerName, options);
  }

  public buildWallWithCADSettingDialog(
    wallData: unknown,
    layerName: string,
    options: unknown,
    additionalParam: unknown,
    cadSettings: CADSettings
  ): void {
    HSApp.App.getApp().switchTo2DView();
    this._createHandler(cadSettings).buildWallWithCADSettingDialog(
      wallData,
      layerName,
      options
    );
  }

  public async buildLayout(
    layoutData: unknown,
    layerName: string,
    options: unknown,
    buildOptions: unknown,
    cadSettings?: CADSettings
  ): Promise<void> {
    HSApp.App.getApp().switchTo2DView();
    await this._createHandler(cadSettings).buildLayout(
      layoutData,
      layerName,
      options,
      buildOptions
    );
  }

  private _createHandler(settings?: CADSettings): WallLayoutHandler {
    const handler = new WallLayoutHandler();
    handler.init(settings);
    return handler;
  }

  public updateStatus(status: unknown): void {
    this.signalStatusChanged.dispatch({
      status
    });
  }
}

Plugin.registerPlugin(
  HSFPConstants.PluginType.WallAutoBuilder,
  WallAutoBuilderPlugin
);