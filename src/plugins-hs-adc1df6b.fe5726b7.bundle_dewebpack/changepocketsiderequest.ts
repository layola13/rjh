import { HSCore } from '635589';
import { updateDoorSideFaceMaterial } from '114357';

interface Pocket {
  side: string;
  parent: HSCore.Model.Window | HSCore.Model.Door | unknown;
}

interface TransactionContext {
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): ChangePocketSideRequest;
  commit(request: ChangePocketSideRequest): void;
}

interface CommandManager {
  complete(command: Command): void;
}

class ChangePocketSideRequest extends HSCore.Transaction.Request {
  private readonly _pocket: Pocket;
  private readonly _side: string;
  private readonly _beforeSide: string;

  constructor(pocket: Pocket, side: string) {
    super();
    this._pocket = pocket;
    this._side = side;
    this._beforeSide = this._pocket.side;
  }

  onCommit(): void {
    this._apply(this._side);
  }

  onUndo(): void {
    this._apply(this._beforeSide);
  }

  onRedo(): void {
    this._apply(this._side);
  }

  private _apply(side: string): void {
    this._pocket.side = side;
    const parent = this._pocket.parent;

    if (parent instanceof HSCore.Model.Window) {
      parent.buildPartsInfo();
    } else if (parent instanceof HSCore.Model.Door) {
      updateDoorSideFaceMaterial(parent, side);
    }

    parent.dirtyGeometry();

    const host = parent.getHost();
    if (host && Array.isArray(host.faceList) && host.faceList.every((face: unknown) => face instanceof HSCore.Model.Face)) {
      host.faceList.forEach((face: HSCore.Model.Face) => {
        const relevantFaceTypes = [
          HSCore.Model.WallFaceType.back,
          HSCore.Model.WallFaceType.front,
          HSCore.Model.WallFaceType.left,
          HSCore.Model.WallFaceType.right
        ];

        if (relevantFaceTypes.includes(HSCore.Util.Face.getFaceType(face))) {
          face.dirtyGeometry();
        }
      });
    }
  }
}

class Command extends HSApp.Cmd.Command {
  protected context!: TransactionContext;
  protected mgr!: CommandManager;
  private readonly _pocket: Pocket;
  private readonly _side: string;

  constructor(pocket: Pocket, side: string) {
    super();
    this._pocket = pocket;
    this._side = side;
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.ChangePocketSide,
      [this._pocket, this._side]
    );
    transactionManager.commit(request);
    this.mgr.complete(this);
  }
}

export { ChangePocketSideRequest };
export default Command;