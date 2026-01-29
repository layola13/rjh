export class ChangeDoorStoneAlignRequest extends HSCore.Transaction.Common.StateRequest {
  private _opening: HSCore.Model.Opening;
  private _dirtyFloors: Set<HSCore.Model.Floor>;

  constructor(opening: HSCore.Model.Opening) {
    super();
    this._opening = opening;
    this._dirtyFloors = new Set();
  }

  onCommit(): void {
    this._opening.toggleDoorStoneAlignSide();
    
    if (this._opening instanceof HSCore.Model.Opening) {
      this._opening.getRefreshFloors().forEach((floor: HSCore.Model.Floor) => {
        this._dirtyFloors.add(floor);
      });
    }
    
    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });
    
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });
  }

  onRedo(): void {
    super.onRedo([]);
    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });
  }

  canTransactField(): boolean {
    return true;
  }
}

export default class ChangeDoorStoneAlignCommand extends HSApp.Cmd.Command {
  private opening: HSCore.Model.Opening;

  constructor(opening: HSCore.Model.Opening) {
    super();
    this.opening = opening;
  }

  onExecute(): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeDoorStoneAlignRequest,
      [this.opening]
    );
    this.context.transManager.commit(request);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "切换垭口材质";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}