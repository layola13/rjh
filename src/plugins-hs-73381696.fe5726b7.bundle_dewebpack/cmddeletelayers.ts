import { HSApp } from './HSApp';

export class CmdDeleteLayers extends HSApp.Cmd.Command {
  private transMgr: any;

  constructor() {
    super();
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(): void {
    const session = this.transMgr.startSession();
    const floorplan = HSApp.App.getApp().floorplan;
    const outdoorLayer = floorplan.scene.outdoorLayer;
    const ceilingLayer = floorplan.scene.ceilingLayer;

    floorplan.scene.forEachLayer((layer: any) => {
      if (layer !== outdoorLayer && layer !== ceilingLayer && !HSApp.Util.Layer.isRootLayer(layer)) {
        const request = this.transMgr.createRequest(HSFPConstants.RequestType.DeleteLayer, [layer]);
        this.transMgr.commit(request);
      }
    });

    session.commit();
  }

  getDescription(): string {
    return "多层操作-删除所有非1层";
  }

  isInteractive(): boolean {
    return false;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }
}