class ChangeDoorStoneStatusRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening;
  private readonly _isDoorStoneMaterialEnabled: boolean;
  private readonly _dirtyFloors: Set<HSCore.Model.Floor>;

  constructor(opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening, isDoorStoneMaterialEnabled: boolean) {
    super();
    this._opening = opening;
    this._isDoorStoneMaterialEnabled = isDoorStoneMaterialEnabled;
    this._dirtyFloors = new Set<HSCore.Model.Floor>();
  }

  onCommit(): void {
    this._opening.setDoorStoneMaterialStatus(this._isDoorStoneMaterialEnabled);
    
    if (this._isDoorStoneMaterialEnabled) {
      this._opening.updateFaceMixPaint(true);
    }

    if (
      this._opening instanceof HSCore.Model.Opening ||
      this._opening instanceof HSCore.Model.ParametricDoor ||
      this._opening instanceof HSCore.Model.DOpening
    ) {
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

class ChangeDoorStoneStatusCommand extends HSApp.Cmd.Command {
  entity: unknown;
  contextualToolsPlugin?: unknown;

  constructor(entity: unknown) {
    super();
    this.entity = entity;
  }

  onExecute(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening,
    isDoorStoneMaterialEnabled: boolean,
    contextualToolsPlugin: unknown
  ): void {
    this.contextualToolsPlugin = contextualToolsPlugin;
    
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeDoorStoneStatus,
      [opening, isDoorStoneMaterialEnabled, contextualToolsPlugin]
    );
    
    this.context.transManager.commit(request);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "过门石";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export { ChangeDoorStoneStatusRequest, ChangeDoorStoneStatusCommand as default };