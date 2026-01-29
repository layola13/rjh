import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';
import { ContentUtil } from './ContentUtil';
import { EntityUtil } from './EntityUtil';

interface Entity {
  forEachChild?(callback: (child: Entity) => void, context: unknown): void;
  getUniqueParent(): Entity | null;
  instanceOf(modelClass: string): boolean;
}

interface RoomInfo {
  roomType: string;
}

interface Room {
  id: string;
  roomType?: string;
}

export class CabinetBase extends BaseObject {
  protected _matrixLocal: unknown;

  constructor(entity: Entity, param2: unknown, param3: unknown) {
    super(entity, param2, param3);

    entity.forEachChild?.((child: Entity) => {
      this.createViewModel(child);
    }, this);

    this.updateMatrix();
    this.updateWorldMatrix(true);
  }

  protected onEntityDirty(entity: Entity): void {
    this.updateMatrix();
  }

  protected updateMatrix(): void {
    this._matrixLocal = HSCore.Util.Matrix3DHandler.getMatrix4WithAnimationMat(
      this.entity,
      true
    );
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }

  protected updateRoomCustomAttrs(): RoomInfo {
    return this._getRoomInfo(this.entity);
  }

  private _getRoomInfo(entity: Entity): RoomInfo {
    let roomType = 'none';
    const hostRoom = this.getHostRoom(entity);

    if (hostRoom) {
      roomType = hostRoom.roomType
        ? `${hostRoom.roomType}-${hostRoom.id}`
        : `${roomType}-${hostRoom.id}`;
    }

    return {
      roomType
    };
  }

  protected getHostRoom(entity: Entity): Room | null {
    const rootEntity = EntityUtil.getRootEntity(entity);
    const uniqueParent = rootEntity.getUniqueParent();

    if (uniqueParent?.instanceOf(HSConstants.ModelClass.Layer)) {
      const floorContent = ContentUtil.getFloorContentIn(rootEntity, uniqueParent);
      if (floorContent) {
        return floorContent;
      }
    }

    return null;
  }
}