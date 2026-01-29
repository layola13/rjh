import { Command } from 'HSApp/Cmd/Command';
import { PocketSideType } from 'HSCore/Model/PocketSideType';
import { RequestType, LogGroupTypes } from 'HSFPConstants';

interface WindowPocketParameters {
  innerMoldingPaths: unknown[];
  outerMoldingPaths: unknown[];
  innerBodyPaths: unknown[];
  outerBodyPaths: unknown[];
  side?: PocketSideType;
  moldingPaths?: unknown[];
  moldingPathsWithNeighbours?: unknown[];
  insidePaths?: unknown[];
}

interface WindowPocket {
  parameters?: WindowPocketParameters;
}

interface TransactionManager {
  createRequest(type: RequestType, args: [WindowPocket, Partial<WindowPocketParameters>]): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

export class CmdChangeParameterPocketSide extends Command {
  private readonly _windowPocket: WindowPocket;
  private readonly _side: PocketSideType;

  constructor(windowPocket: WindowPocket, side: PocketSideType) {
    super();
    this._windowPocket = windowPocket;
    this._side = side;
  }

  onExecute(): void {
    const windowPocket = this._windowPocket;
    
    if (!windowPocket?.parameters) {
      return;
    }

    const parameters = windowPocket.parameters;
    const innerMoldingPaths = parameters.innerMoldingPaths;
    const outerMoldingPaths = parameters.outerMoldingPaths;
    const innerBodyPaths = parameters.innerBodyPaths;
    const outerBodyPaths = parameters.outerBodyPaths;

    let moldingPaths = innerMoldingPaths;
    let insidePaths = innerBodyPaths;
    const side = this._side;

    switch (side) {
      case PocketSideType.Outer:
        moldingPaths = outerMoldingPaths;
        insidePaths = outerBodyPaths;
        break;
      case PocketSideType.Both:
        moldingPaths = [...innerMoldingPaths, ...outerMoldingPaths];
        insidePaths = [...innerBodyPaths, ...outerBodyPaths];
        break;
    }

    const transManager = this.context.transManager;
    const request = transManager.createRequest(RequestType.ChangeParametricModelParameters, [
      windowPocket,
      {
        side,
        moldingPaths,
        moldingPathsWithNeighbours: moldingPaths,
        insidePaths
      }
    ]);

    transManager.commit(request);
    this.mgr.complete(this);
  }

  getDescription(): string {
    return '窗套';
  }

  getCategory(): LogGroupTypes {
    return LogGroupTypes.ContentOperation;
  }
}