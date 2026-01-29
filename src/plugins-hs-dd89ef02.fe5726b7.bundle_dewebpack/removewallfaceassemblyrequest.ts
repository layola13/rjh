import { HSCore } from './HSCore';

interface WallFaceAssembly {
  backgroundWalls: any[];
}

interface CustomizedModelSpec {
  content: any;
}

export class RemoveWallFaceAssemblyRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wfassembly: WallFaceAssembly | WallFaceAssembly[];
  private readonly _clearBackgroundWall: boolean;
  private _specs: CustomizedModelSpec[];

  constructor(
    wfassembly: WallFaceAssembly | WallFaceAssembly[],
    clearBackgroundWall: boolean = false
  ) {
    super();
    this._wfassembly = wfassembly;
    this._clearBackgroundWall = clearBackgroundWall;
    this._specs = [];
  }

  onCommit(): void {
    if (Array.isArray(this._wfassembly)) {
      this._wfassembly.forEach(this._removeWFA.bind(this));
    } else {
      this._removeWFA(this._wfassembly);
    }
    super.onCommit([]);
  }

  private _removeWFA(wfassembly: WallFaceAssembly): void {
    const backgroundWalls = wfassembly.backgroundWalls;
    const wallFaceAssemblyApi = new HSCore.Model.WallFaceAssemblyApi();
    wallFaceAssemblyApi.removeWallFaceAssembly(wfassembly);

    if (this._clearBackgroundWall) {
      backgroundWalls.forEach((wall) => {
        this._specs.push(HSCore.Util.Content.removeCustomizedModel(wall));
      });
    }
  }

  onUndo(): void {
    this._specs.forEach((spec) => {
      return HSCore.Util.Content.addCustomizedModel(spec);
    });
    super.onUndo([]);
  }

  onRedo(): void {
    this._specs.forEach((spec) => {
      return HSCore.Util.Content.removeCustomizedModel(spec.content);
    });
    super.onRedo([]);
  }

  canTransactField(): boolean {
    return true;
  }
}