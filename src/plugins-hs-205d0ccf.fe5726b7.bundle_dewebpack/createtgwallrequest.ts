import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export class CreateTgWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _curve: unknown;
  private readonly _wallWidth: number;
  private readonly _wallMode: unknown;
  private readonly _isBearing: boolean;

  constructor(
    curve: unknown,
    wallWidth: number,
    wallMode: unknown,
    isBearing: boolean
  ) {
    super();
    this._curve = curve;
    this._wallWidth = wallWidth;
    this._wallMode = wallMode;
    this._isBearing = isBearing;
  }

  onCommit(): void {
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    
    const wall = HSCore.Model.Wall.create(
      this._curve,
      this._wallWidth,
      activeLayer.height,
      undefined,
      undefined,
      this._isBearing,
      this._wallMode
    );
    
    HSCore.Util.TgWall.createWallJoints(wall);
    HSCore.Util.TgWall.processWallsJoints([wall]);
    activeLayer.addChild(wall);
    HSCore.Util.TgWall.updateLayer(activeLayer);
    
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "画墙操作";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}