import { HSApp } from './HSApp';

export class CmdDeleteRoofRegion extends HSApp.ExtraordinarySketch2d.Cmd.CmdExBase {
  private roofRegion: RoofRegion;

  constructor(roofRegion: RoofRegion) {
    super();
    this.roofRegion = roofRegion;
  }

  protected doRequest(): void {
    const transManager = this.context.transManager;
    const session = transManager.startSession();
    const roof = this.roofRegion.roof;

    if (roof) {
      const deleteRoofRequest = transManager.createRequest(
        HSFPConstants.RequestType.DeleteRoof,
        [roof]
      );
      transManager.commit(deleteRoofRequest);
    }

    const deleteRegionRequest = transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.DeleteRoofRegion,
      [this.roofRegion]
    );
    transManager.commit(deleteRegionRequest);
    session.commit();
  }

  public onExecute(): void {
    this.context.selectionManager.unselectAll();
    this.doRequest();
    this.mgr?.complete(this);
  }

  public getDescription(): string {
    return "删除 屋顶绘制区域";
  }
}

interface RoofRegion {
  roof?: Roof;
}

interface Roof {
  // Define roof properties as needed
}