import { HSApp } from './518193';
import { HSCore } from './635589';

export class CmdCleanupAllLayer extends HSApp.Cmd.Command {
  private _transMgr: any;
  private _request: any;

  constructor(param: any) {
    super();
    this._transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(): void {
    this._request = this._transMgr.createRequest(HSFPConstants.RequestType.CleanupAllLayer);
  }

  onComplete(): void {
    this._transMgr.commit(this._request);
  }

  onCancel(): void {
    this._transMgr.abort(this._request);
  }
}

export class CleanupAllLayerRequest extends HSCore.Transaction.Common.StateRequest {
  constructor() {
    super();
  }

  doRequest(layer: any): void {
    let hasCreatedProxy = false;
    
    layer.traverse((entity: any) => {
      if (HSCore.Util.DEntityUtils.isDModel(entity) && entity.parent === layer) {
        if (!hasCreatedProxy) {
          this.tryCreateEntityProxyUndoRedoObject(entity);
          hasCreatedProxy = true;
        }
        
        const proxyObject = entity.getProxyObject();
        if (proxyObject) {
          proxyObject.removeFromFloorplan(entity);
        } else {
          HSCore.Util.Content.removeContent(entity);
        }
      }
    });
    
    layer.removeAllChildrenByTypes([
      'molding',
      'opening',
      'popening',
      'beam',
      'structure',
      'content',
      'group',
      'lightgroup',
      'wall'
    ]);
    
    HSCore.Util.TgWall.updateLayer(layer);
    HSCore.Util.Layer.dirtyLayerInfo(layer);
  }

  onCommit(): boolean {
    const app = HSApp.App.getApp();
    const outdoorLayer = app.floorplan.scene.outdoorLayer;
    
    Object.values(app.floorplan.scene.layers)
      .filter((layer: any) => layer !== outdoorLayer)
      .forEach((layer: any) => this.doRequest(layer));
    
    super.onCommit([]);
    
    return true;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '删除设计中所有墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}