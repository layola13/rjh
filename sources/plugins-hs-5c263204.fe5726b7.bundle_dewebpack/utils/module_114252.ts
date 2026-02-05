// @ts-nocheck
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import GizmoHandler from './GizmoHandler';
import CmdChangeComponentPosition from './commands/CmdChangeComponentPosition';
import CmdChangeDrawerPosition from './commands/CmdChangeDrawerPosition';
import ChangeComponentPositionRequest from './requests/ChangeComponentPositionRequest';
import ChangeDrawerPositionRequest from './requests/ChangeDrawerPositionRequest';
import PointMarker from './PointMarker';
import { CutMoldingDimension } from './CutMoldingDimension';
import { ThreedmeasureAxis } from './ThreedmeasureAxis';

type LinearDimension2D = HSApp.View.SVG.LinearDimension;
type LinearDimension3D = HSApp.View.T3d.LinearDimension;
type CommandManager = HSApp.App.CommandManager;
type TransactionManager = HSApp.App.TransactionManager;
type IPlugin = HSApp.Plugin.IPlugin;

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class GizmoPlugin extends HSApp.Plugin.IPlugin {
  private _handler: GizmoHandler;
  private _app: HSApp.App.AppInstance;

  constructor() {
    const config: PluginConfig = {
      name: 'gizmo plugin',
      description: 'process gizmo plugin',
      dependencies: []
    };
    
    super(config);
    
    this._handler = new GizmoHandler();
    this._app = HSApp.App.getApp();
    this._registerCommands(this._app.cmdManager);
    this._registerRequests(this._app.transManager);
  }

  onActive(context: unknown, options: unknown): void {
    this._handler.init(context, options);
  }

  onDeactive(): void {
    this._handler.uninit();
  }

  private _registerCommands(commandManager: CommandManager): void {
    const { CommandType } = HSFPConstants;
    
    commandManager.register([
      [CommandType.CmdChangeComponentPosition, CmdChangeComponentPosition],
      [CommandType.CmdChangeDrawerPosition, CmdChangeDrawerPosition]
    ]);
  }

  private _registerRequests(transactionManager: TransactionManager): void {
    const { RequestType } = HSFPConstants;
    
    transactionManager.register([
      [RequestType.ChangeComponentPositionRequest, ChangeComponentPositionRequest],
      [RequestType.ChangeDrawerPositionRequest, ChangeDrawerPositionRequest]
    ]);
  }

  create2DDimension(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): LinearDimension2D {
    const LinearDimension = HSApp.View.SVG.LinearDimension;
    return new LinearDimension(param1, param2, param3, param4);
  }

  isDimensionInput(element: unknown): boolean {
    const LinearDimension = HSApp.View.SVG.LinearDimension;
    return LinearDimension.isDimensionInput(element);
  }

  createPointMarker(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): PointMarker {
    return new PointMarker(param1, param2, param3, param4);
  }

  createLinearDimension(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown,
    param6: unknown,
    param7: unknown,
    param8: unknown
  ): LinearDimension3D {
    return new HSApp.View.T3d.LinearDimension(
      param1,
      param2,
      param3,
      param4,
      param5,
      param6,
      param7,
      param8
    );
  }

  createCoordAix(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): ThreedmeasureAxis {
    return new ThreedmeasureAxis(param1, param2, param3);
  }

  registerGizmoFactory(factory: unknown): void {
    this._handler._initSVGView(factory);
  }

  enableSVGGizmo(): void {
    this._handler.enableSVGGizmo();
  }

  disableSVGGizmo(): void {
    this._handler.disableSVGGizmo();
  }

  getCutMoldingDimensionGizmo(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): CutMoldingDimension {
    return new CutMoldingDimension(param1, param2, param3, param4);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Gizmo, GizmoPlugin);

export default GizmoPlugin;