import { DataBuilder } from './DataBuilder';

interface App {
  cmdManager: CommandManager;
  transManager: TransactionManager;
}

interface Context {
  app: App;
}

interface CommandManager {
  register(commands: Array<[string, unknown]>): void;
}

interface TransactionManager {
  register(requests: Array<[string, unknown]>): void;
}

interface LeftMenuPlugin {
  registerStrategy(strategy: unknown): void;
}

interface InitConfig {
  context: Context;
  dependencies: {
    [key: string]: LeftMenuPlugin;
  };
}

declare const HSApp: {
  Sketch2d: {
    Cmd: {
      CmdDrawLines: unknown;
      CmdDrawRegularPolygon: unknown;
      CmdDrawCircle: unknown;
      CmdDrawRectangle: unknown;
      CmdDelete: unknown;
      CmdMovePoint: unknown;
      CmdMoveCurve: unknown;
      CmdMoveFaces: unknown;
      CmdChangeArcSagitta: unknown;
      CmdChangeCircleRadius: unknown;
      CmdConvertLineToArc: unknown;
      CmdOffsetTool: unknown;
      CmdCopyFaces: unknown;
      CmdAxialArray: unknown;
      CmdLinearArray: unknown;
      CmdDrawFillet: unknown;
      CmdAddGuideLines: unknown;
      CmdClearGuideLines: unknown;
    };
    Request: {
      ChangeArcSagittaRequest: unknown;
      ChangeCircleRadiusRequest: unknown;
      ConvertLineToArcRequest: unknown;
      CopyFacesRequest: unknown;
      DeleteFaceRequest: unknown;
      DeletePointReuqest: unknown;
      DeleteCurveRequest: unknown;
      DrawLinesRequest: unknown;
      DrawRectangleRequest: unknown;
      DrawCircleRequest: unknown;
      DrawRegularPolygonRequest: unknown;
      MoveCurveRequest: unknown;
      MovePointRequest: unknown;
      MoveFacesRequest: unknown;
      OffsetPathRequest: unknown;
      ArrayRequest: unknown;
      AxialArrayRequest: unknown;
      LinearArrayRequest: unknown;
      FilletRequest: unknown;
      AddGuideLineRequest: unknown;
      DeleteGuideLineRequest: unknown;
    };
  };
  ExtraordinarySketch2d: {
    Cmd: {
      CmdMoveFaces: unknown;
      CmdMoveCurve: unknown;
      CmdMovePoint: unknown;
      CmdConvertLineToArc: unknown;
      CmdDelete: unknown;
      CmdChangeCircleRadius: unknown;
      CmdChangeArcSagitta: unknown;
      CmdDrawFillet: unknown;
    };
    Request: {
      MoveFacesRequest: unknown;
      MoveCurveRequest: unknown;
      MovePointRequest: unknown;
      ConvertLineToArcRequest: unknown;
      DeleteRequest: unknown;
      ChangeCircleRadiusRequest: unknown;
      ChangeArcSagittaRequest: unknown;
      DrawFilletRequest: unknown;
    };
  };
};

declare const HSFPConstants: {
  PluginType: {
    LeftMenu: string;
  };
  CommandType: {
    Sketch2d: {
      DrawLines: string;
      DrawRectangle: string;
      DrawRegularPolygon: string;
      DrawCircle: string;
      Delete: string;
      MovePoint: string;
      MoveCurve: string;
      MoveFaces: string;
      ChangeCircleRadius: string;
      ChangeArcSagitta: string;
      ConvertLineToArc: string;
      OffsetTool: string;
      CopyFaces: string;
      AxialArray: string;
      LinearArray: string;
      DrawFillet: string;
      AddGuideLines: string;
      ClearGuideLines: string;
    };
    ExtraordinarySketch2d: {
      ConvertLineToArc: string;
      MoveFaces: string;
      MoveCurve: string;
      MovePoint: string;
      Delete: string;
      ChangeCircleRadius: string;
      ChangeArcSagitta: string;
      DrawFillet: string;
    };
  };
  RequestType: {
    Sketch2d: {
      DrawRectangle: string;
      DrawLines: string;
      DrawRegularPolygon: string;
      DrawCircle: string;
      DeletePoint: string;
      DeleteCurve: string;
      DeleteFace: string;
      MovePoint: string;
      MoveCurve: string;
      MoveFaces: string;
      ChangeCircleRadius: string;
      ChangeArcSagitta: string;
      ConvertLineToArc: string;
      CopyFaces: string;
      OffsetPath: string;
      Array: string;
      AxialArray: string;
      LinearArray: string;
      DrawFillet: string;
      AddGuideLine: string;
      DeleteGuideLine: string;
    };
    ExtraordinarySketch2d: {
      MoveFaces: string;
      MoveCurve: string;
      MovePoint: string;
      ConvertLineToArc: string;
      Delete: string;
      ChangeCircleRadius: string;
      ChangeArcSagitta: string;
      DrawFillet: string;
    };
  };
};

export class Handler {
  private leftMenuPlugin?: LeftMenuPlugin;
  private app?: App;
  private context?: Context;

  init(config: InitConfig): void {
    this.app = config.context.app;
    this.context = config.context;
    this.registerCommands();
    this.registerRequests();
    this.leftMenuPlugin = config.dependencies[HSFPConstants.PluginType.LeftMenu];
    this._registerLeftMenuStrategies();
    this._registerExSketch2dCmd();
    this._registerExSketch2dReq();
  }

  private _registerLeftMenuStrategies(): void {
    const strategies = DataBuilder.getInstance().getStrategies();
    strategies.forEach((strategy) => {
      this.leftMenuPlugin?.registerStrategy(strategy);
    });
  }

  registerCommands(): void {
    const cmd = HSApp.Sketch2d.Cmd;
    const drawLines = cmd.CmdDrawLines;
    const drawRegularPolygon = cmd.CmdDrawRegularPolygon;
    const drawCircle = cmd.CmdDrawCircle;
    const drawRectangle = cmd.CmdDrawRectangle;
    const deleteCmd = cmd.CmdDelete;
    const movePoint = cmd.CmdMovePoint;
    const moveCurve = cmd.CmdMoveCurve;
    const moveFaces = cmd.CmdMoveFaces;
    const changeArcSagitta = cmd.CmdChangeArcSagitta;
    const changeCircleRadius = cmd.CmdChangeCircleRadius;
    const convertLineToArc = cmd.CmdConvertLineToArc;
    const offsetTool = cmd.CmdOffsetTool;
    const copyFaces = cmd.CmdCopyFaces;
    const axialArray = cmd.CmdAxialArray;
    const linearArray = cmd.CmdLinearArray;
    const drawFillet = cmd.CmdDrawFillet;
    const addGuideLines = cmd.CmdAddGuideLines;
    const clearGuideLines = cmd.CmdClearGuideLines;

    this.app?.cmdManager.register([
      [HSFPConstants.CommandType.Sketch2d.DrawLines, drawLines],
      [HSFPConstants.CommandType.Sketch2d.DrawRectangle, drawRectangle],
      [HSFPConstants.CommandType.Sketch2d.DrawRegularPolygon, drawRegularPolygon],
      [HSFPConstants.CommandType.Sketch2d.DrawCircle, drawCircle],
      [HSFPConstants.CommandType.Sketch2d.Delete, deleteCmd],
      [HSFPConstants.CommandType.Sketch2d.MovePoint, movePoint],
      [HSFPConstants.CommandType.Sketch2d.MoveCurve, moveCurve],
      [HSFPConstants.CommandType.Sketch2d.MoveFaces, moveFaces],
      [HSFPConstants.CommandType.Sketch2d.ChangeCircleRadius, changeCircleRadius],
      [HSFPConstants.CommandType.Sketch2d.ChangeArcSagitta, changeArcSagitta],
      [HSFPConstants.CommandType.Sketch2d.ConvertLineToArc, convertLineToArc],
      [HSFPConstants.CommandType.Sketch2d.OffsetTool, offsetTool],
      [HSFPConstants.CommandType.Sketch2d.CopyFaces, copyFaces],
      [HSFPConstants.CommandType.Sketch2d.AxialArray, axialArray],
      [HSFPConstants.CommandType.Sketch2d.LinearArray, linearArray],
      [HSFPConstants.CommandType.Sketch2d.DrawFillet, drawFillet],
      [HSFPConstants.CommandType.Sketch2d.AddGuideLines, addGuideLines],
      [HSFPConstants.CommandType.Sketch2d.ClearGuideLines, clearGuideLines]
    ]);
  }

  registerRequests(): void {
    const request = HSApp.Sketch2d.Request;
    const changeArcSagittaRequest = request.ChangeArcSagittaRequest;
    const changeCircleRadiusRequest = request.ChangeCircleRadiusRequest;
    const convertLineToArcRequest = request.ConvertLineToArcRequest;
    const copyFacesRequest = request.CopyFacesRequest;
    const deleteFaceRequest = request.DeleteFaceRequest;
    const deletePointRequest = request.DeletePointReuqest;
    const deleteCurveRequest = request.DeleteCurveRequest;
    const drawLinesRequest = request.DrawLinesRequest;
    const drawRectangleRequest = request.DrawRectangleRequest;
    const drawCircleRequest = request.DrawCircleRequest;
    const drawRegularPolygonRequest = request.DrawRegularPolygonRequest;
    const moveCurveRequest = request.MoveCurveRequest;
    const movePointRequest = request.MovePointRequest;
    const moveFacesRequest = request.MoveFacesRequest;
    const offsetPathRequest = request.OffsetPathRequest;
    const arrayRequest = request.ArrayRequest;
    const axialArrayRequest = request.AxialArrayRequest;
    const linearArrayRequest = request.LinearArrayRequest;
    const filletRequest = request.FilletRequest;
    const addGuideLineRequest = request.AddGuideLineRequest;
    const deleteGuideLineRequest = request.DeleteGuideLineRequest;

    this.app?.transManager.register([
      [HSFPConstants.RequestType.Sketch2d.DrawRectangle, drawRectangleRequest],
      [HSFPConstants.RequestType.Sketch2d.DrawLines, drawLinesRequest],
      [HSFPConstants.RequestType.Sketch2d.DrawRegularPolygon, drawRegularPolygonRequest],
      [HSFPConstants.RequestType.Sketch2d.DrawCircle, drawCircleRequest],
      [HSFPConstants.RequestType.Sketch2d.DeletePoint, deletePointRequest],
      [HSFPConstants.RequestType.Sketch2d.DeleteCurve, deleteCurveRequest],
      [HSFPConstants.RequestType.Sketch2d.DeleteFace, deleteFaceRequest],
      [HSFPConstants.RequestType.Sketch2d.MovePoint, movePointRequest],
      [HSFPConstants.RequestType.Sketch2d.MoveCurve, moveCurveRequest],
      [HSFPConstants.RequestType.Sketch2d.MoveFaces, moveFacesRequest],
      [HSFPConstants.RequestType.Sketch2d.ChangeCircleRadius, changeCircleRadiusRequest],
      [HSFPConstants.RequestType.Sketch2d.ChangeArcSagitta, changeArcSagittaRequest],
      [HSFPConstants.RequestType.Sketch2d.ConvertLineToArc, convertLineToArcRequest],
      [HSFPConstants.RequestType.Sketch2d.CopyFaces, copyFacesRequest],
      [HSFPConstants.RequestType.Sketch2d.OffsetPath, offsetPathRequest],
      [HSFPConstants.RequestType.Sketch2d.Array, arrayRequest],
      [HSFPConstants.RequestType.Sketch2d.AxialArray, axialArrayRequest],
      [HSFPConstants.RequestType.Sketch2d.LinearArray, linearArrayRequest],
      [HSFPConstants.RequestType.Sketch2d.DrawFillet, filletRequest],
      [HSFPConstants.RequestType.Sketch2d.AddGuideLine, addGuideLineRequest],
      [HSFPConstants.RequestType.Sketch2d.DeleteGuideLine, deleteGuideLineRequest]
    ]);
  }

  private _registerExSketch2dCmd(): void {
    const cmd = HSApp.ExtraordinarySketch2d.Cmd;
    const moveFaces = cmd.CmdMoveFaces;
    const moveCurve = cmd.CmdMoveCurve;
    const movePoint = cmd.CmdMovePoint;
    const convertLineToArc = cmd.CmdConvertLineToArc;
    const deleteCmd = cmd.CmdDelete;
    const changeCircleRadius = cmd.CmdChangeCircleRadius;
    const changeArcSagitta = cmd.CmdChangeArcSagitta;
    const drawFillet = cmd.CmdDrawFillet;

    const commandType = HSFPConstants.CommandType.ExtraordinarySketch2d;
    const convertLineToArcType = commandType.ConvertLineToArc;
    const moveFacesType = commandType.MoveFaces;
    const moveCurveType = commandType.MoveCurve;
    const movePointType = commandType.MovePoint;
    const deleteType = commandType.Delete;
    const changeCircleRadiusType = commandType.ChangeCircleRadius;
    const changeArcSagittaType = commandType.ChangeArcSagitta;
    const drawFilletType = commandType.DrawFillet;

    this.app?.cmdManager.register([
      [convertLineToArcType, convertLineToArc],
      [moveFacesType, moveFaces],
      [moveCurveType, moveCurve],
      [movePointType, movePoint],
      [deleteType, deleteCmd],
      [changeCircleRadiusType, changeCircleRadius],
      [changeArcSagittaType, changeArcSagitta],
      [drawFilletType, drawFillet]
    ]);
  }

  private _registerExSketch2dReq(): void {
    const request = HSApp.ExtraordinarySketch2d.Request;
    const moveFacesRequest = request.MoveFacesRequest;
    const moveCurveRequest = request.MoveCurveRequest;
    const movePointRequest = request.MovePointRequest;
    const convertLineToArcRequest = request.ConvertLineToArcRequest;
    const deleteRequest = request.DeleteRequest;
    const changeCircleRadiusRequest = request.ChangeCircleRadiusRequest;
    const changeArcSagittaRequest = request.ChangeArcSagittaRequest;
    const drawFilletRequest = request.DrawFilletRequest;

    const requestType = HSFPConstants.RequestType.ExtraordinarySketch2d;
    const moveFacesType = requestType.MoveFaces;
    const moveCurveType = requestType.MoveCurve;
    const movePointType = requestType.MovePoint;
    const convertLineToArcType = requestType.ConvertLineToArc;
    const deleteType = requestType.Delete;
    const changeCircleRadiusType = requestType.ChangeCircleRadius;
    const changeArcSagittaType = requestType.ChangeArcSagitta;
    const drawFilletType = requestType.DrawFillet;

    this.app?.transManager.register([
      [convertLineToArcType, convertLineToArcRequest],
      [moveFacesType, moveFacesRequest],
      [moveCurveType, moveCurveRequest],
      [movePointType, movePointRequest],
      [deleteType, deleteRequest],
      [changeCircleRadiusType, changeCircleRadiusRequest],
      [changeArcSagittaType, changeArcSagittaRequest],
      [drawFilletType, drawFilletRequest]
    ]);
  }
}