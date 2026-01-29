import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ModelClassName } from './ModelClassName';
import { resourceManager } from './ResourceManager';
import { Utils } from './Utils';

interface Point2D {
  x: number;
  y: number;
}

interface Bound {
  getTopLeft(): Point2D;
  getBottomRight(): Point2D;
}

interface PathSegment {
  getLength(): number;
}

interface RawPath2D {
  outer: PathSegment[];
}

interface Layer {
  id: string;
}

interface Master {
  id: string;
}

interface Scene {
  getLayerAltitude(layer: Layer): number | null;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface RoomData {
  id: string;
  rawPath2d: RawPath2D;
  bound: Bound;
  parent: Layer;
  roomType?: string;
  roomTypeDisplayName?: string;
  getMaster(): Master;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Util: {
    Room: {
      getRoomTypeDisplayNameByRoomType(roomType?: string): string;
    };
  };
};

export class RoomEntity extends AcceptEntity {
  protected _prefix: string = 'r_';

  constructor(...args: any[]) {
    super(...args);
  }

  buildChildren(): void {}

  buildEntityData(roomData: RoomData): void {
    this.setInstanceData(this.getInstanceData(roomData));
    this.setType({
      classType: ModelClassName.Room
    });
  }

  getInstanceData(roomData: RoomData): InstanceData {
    const area = Utils.getArea(roomData.rawPath2d);
    const bound = roomData.bound;
    const topLeft = bound.getTopLeft();
    const bottomRight = bound.getBottomRight();
    const floorplan = HSApp.App.getApp().floorplan;
    const parentLayer = roomData.parent;
    const altitude = floorplan.scene.getLayerAltitude(parentLayer) ?? 0;

    const center: [number, number, number] = [
      (topLeft.x + bottomRight.x) / 2,
      (topLeft.y + bottomRight.y) / 2,
      altitude
    ];

    const size: [number, number, number] = [
      Math.abs(topLeft.x - bottomRight.x),
      Math.abs(topLeft.y - bottomRight.y),
      2.8
    ];

    const masterId = roomData.getMaster().id;
    const instanceData = new InstanceData(roomData.id);

    instanceData.addParameter(
      new Parameter('center', Utils.formatNumberPoints(center), DataType.ArrayPoint3D),
      new Parameter('size', Utils.formatNumberPoints(size), DataType.ArrayPoint3D),
      new Parameter('area', area, DataType.Number),
      new Parameter('parentId', masterId, DataType.String)
    );

    instanceData.addParameter(
      new Parameter('layerId', parentLayer.id, DataType.String),
      new Parameter('type', roomData.roomType ?? '', DataType.String),
      new Parameter(
        'displayName',
        HSApp.Util.Room.getRoomTypeDisplayNameByRoomType(roomData.roomType) ?? '',
        DataType.String
      ),
      new Parameter('displayNameCustom', this._getDisplayNameCustom(roomData), DataType.String)
    );

    instanceData.addParameter(
      new Parameter('roomId', roomData.id, DataType.String),
      new Parameter('spaceGirth', Utils.formatNumberPoints(this._getRoomGirth(roomData)), DataType.Number)
    );

    return instanceData;
  }

  private _getDisplayNameCustom(roomData: RoomData): string {
    if (!roomData) {
      return '';
    }

    if (!roomData.roomTypeDisplayName) {
      return (
        resourceManager.getString('model_roomtype_' + roomData.roomType) ??
        resourceManager.getString('model_roomtype_none')
      );
    }

    return roomData.roomTypeDisplayName;
  }

  private _getRoomGirth(roomData: RoomData): number {
    return roomData.rawPath2d.outer.reduce((total, segment) => {
      return total + segment.getLength();
    }, 0);
  }
}