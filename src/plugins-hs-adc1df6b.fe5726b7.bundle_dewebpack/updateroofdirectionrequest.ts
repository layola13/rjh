import { HSCore } from './HSCore';

export class UpdateRoofDirectionRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _oldLoop: any[] | undefined;
  private readonly _curve: any;
  private readonly _roof: any;

  constructor(roof: any, curve: any) {
    super();
    this._curve = curve;
    this._roof = roof;
    this._oldLoop = roof.parameters.roomLoop?.getAllCurves();
  }

  private _refreshBuilder(): void {
    const parent = this._roof.getUniqueParent();
    if (parent instanceof HSCore.Model.Layer) {
      parent.roomBuilder.build();
    }
  }

  private _applyNewLoop(): void {
    if (!this._oldLoop) {
      return;
    }

    const loopCopy = [...this._oldLoop];
    const curveIndex = loopCopy.findIndex((curve) => curve.equals(this._curve));

    if (curveIndex > 0) {
      const removed = loopCopy.splice(curveIndex, loopCopy.length - curveIndex);
      removed.reverse().forEach((curve) => loopCopy.unshift(curve));
    }

    this._roof.updateDirection(loopCopy, 0);
    this._refreshBuilder();
  }

  onCommit(): any {
    this._roof.openings.forEach((opening: any) => {
      HSCore.Util.Content.removeContent(opening);
    });

    this._roof.parametricOpenings.forEach((opening: any) => {
      HSCore.Util.Content.removeCustomizedModel(opening);
    });

    this._applyNewLoop();
    super.onCommit();
    return this._roof;
  }

  onUndo(): void {
    super.onUndo();
    if (this._oldLoop) {
      this._roof.updateDirection(this._oldLoop, 0);
      this._roof.dirtyClipGeometry();
      this._roof.dirtyFaceMaterials();
      this._refreshBuilder();
    }
  }

  onRedo(): void {
    super.onRedo();
    this._applyNewLoop();
    this._roof.dirtyClipGeometry();
    this._roof.dirtyFaceMaterials();
  }
}