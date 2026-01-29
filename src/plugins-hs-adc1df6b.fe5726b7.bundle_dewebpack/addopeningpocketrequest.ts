import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { HSApp } from './HSApp';

interface ContentMeta {
  [key: string]: unknown;
}

interface MaterialMeta {
  [key: string]: unknown;
}

type Opening = HSCore.Model.Opening | HSCore.Model.ParametricOpening;
type Host = HSCore.Model.Wall | { faceList?: HSCore.Model.Face[] };

export class AddOpeningPocketRequest extends HSCore.Transaction.Request {
  opening: Opening;
  contentMeta?: ContentMeta;
  materialMeta?: MaterialMeta;
  savedPocket?: HSCore.Model.Pocket;
  restoredPocket?: HSCore.Model.Pocket;

  constructor(opening: Opening, contentMeta?: ContentMeta, materialMeta?: MaterialMeta) {
    super();
    this.opening = opening;
    this.contentMeta = contentMeta;
    this.materialMeta = materialMeta;
  }

  onCommit(): void {
    const existingPocket = this.opening.getPocket();
    if (existingPocket) {
      this.savedPocket = existingPocket;
      this.opening.removePocket();
    }

    const pocketMaterialMeta = getPocketMaterialMeta(this.opening);

    if (this.contentMeta) {
      const pocket = HSCore.Model.Pocket.create(this.contentMeta);
      
      if (pocketMaterialMeta) {
        pocket.material = HSCore.Material.Material.create(pocketMaterialMeta);
      } else if (this.materialMeta) {
        pocket.material = HSCore.Material.Material.create(this.materialMeta);
      }
      
      this._addPocket(pocket);
    }

    this.opening.dirtyGeometry();

    const host = this.opening.getHost();
    if (host && Array.isArray(host.faceList) && host.faceList.every(face => face instanceof HSCore.Model.Face)) {
      host.faceList.forEach(face => {
        const wallFaceTypes = [
          HSCore.Model.WallFaceType.back,
          HSCore.Model.WallFaceType.front,
          HSCore.Model.WallFaceType.left,
          HSCore.Model.WallFaceType.right
        ];

        if (wallFaceTypes.includes(HSCore.Util.Face.getFaceType(face))) {
          face.dirtyGeometry();

          if (
            host instanceof HSCore.Model.Wall &&
            (this.opening instanceof HSCore.Model.Opening || this.opening instanceof HSCore.Model.ParametricOpening)
          ) {
            this.opening.linkFaces.forEach(linkFace => {
              HSCore.Util.Molding.reAddFaceMolding(linkFace);
            });
          }
        }
      });
    }
  }

  private _addPocket(pocket: HSCore.Model.Pocket): void {
    this.opening.addPocket(pocket);
    
    if (this.opening instanceof HSCore.Model.Door) {
      updateDoorSideFaceMaterial(this.opening, pocket.side);
    }
  }

  onUndo(): void {
    this.restoredPocket = this.opening.getPocket();
    this.opening.removePocket();
    
    if (this.savedPocket) {
      this._addPocket(this.savedPocket);
    }
  }

  onRedo(): void {
    this.opening.removePocket();
    
    if (this.restoredPocket) {
      this._addPocket(this.restoredPocket);
    }
  }
}

export default class AddOpeningPocketCommand extends HSApp.Cmd.Command {
  entity: Opening;
  private _addOpeningType: boolean = false;

  constructor(entity: Opening) {
    super();
    this.entity = entity;
  }

  onExecute(contentMeta?: ContentMeta, materialMeta?: MaterialMeta): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.AddOpeningPocket,
      [this.entity, contentMeta, materialMeta]
    );
    
    transactionManager.commit(request);
    
    if (contentMeta) {
      this._addOpeningType = true;
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    const action = this._addOpeningType ? '打开' : '关闭';
    return `${action}门/垭口套线`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  getMode(): string {
    if (this.entity instanceof HSCore.Model.Window) {
      return 'window';
    }
    
    if (this.entity instanceof HSCore.Model.Door) {
      return 'door';
    }
    
    return 'hole';
  }
}

function getPocketMaterialMeta(opening: Opening): MaterialMeta | null {
  // Implementation depends on HSCore utility
  return null;
}

function updateDoorSideFaceMaterial(door: HSCore.Model.Door, side: unknown): void {
  // Implementation depends on HSCore utility
}