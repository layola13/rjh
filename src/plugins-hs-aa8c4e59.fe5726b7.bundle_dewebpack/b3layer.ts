import { turnEntityToBom3Entity, setObjectParameterValues, genBom3DataFromGroup, genContentsInfo, turnPaveEntityToBom3Data } from './utils';
import { B3Room } from './B3Room';
import { B3Wall } from './B3Wall';
import { B3Opening } from './B3Opening';
import { B3ConcealedWork } from './B3ConcealedWork';
import { B3Entity } from './B3Entity';
import { ExposedCornerCreator } from './ExposedCornerCreator';
import { HSApp } from './HSApp';
import { dumpEntity } from './EntityUtils';
import { B3Region } from './B3Region';

interface LayerEntity {
  getId(): string;
  getParameterValue(key: string): unknown;
  getChildren(): LayerEntity[];
  setChildren(children: LayerEntity[]): void;
}

interface RoomData {
  entity: {
    instance: {
      id: string;
    };
  };
  relations?: {
    exposedCorners: ExposedCorner[];
  };
}

interface ExposedCorner {
  roomId: string;
}

interface CustomizedPMModel {
  getChildren(): CustomizedPMModel[];
  getParameterValue(key: string): unknown;
  setChildren(children: CustomizedPMModel[]): void;
}

interface LayerContent {
  instance: {
    getParameterValue(key: string): unknown;
  };
}

interface Layer {
  id: string;
}

interface B3LayerData {
  entity: unknown;
  rooms: RoomData[];
  walls: unknown[];
  wallOpenings: unknown[];
  concealedWork?: unknown;
  other: unknown[];
  innerArea: unknown;
  designArea: unknown;
  customizedPMModels?: unknown[];
  floorSlabIds?: unknown;
  ceilingSlabIds?: unknown;
  wallHeight?: unknown;
  wallThickness?: unknown;
  slabThickness?: unknown;
  layerType?: unknown;
}

interface Context {
  layerRooms: Map<string, unknown[]>;
  layerWalls: Map<string, unknown[]>;
  layerOpenings: Map<string, unknown[]>;
  concealWork: Map<string, unknown[]>;
  layerCustomizedPMModels: Map<string, CustomizedPMModel[]>;
  layerContents: Map<string, LayerContent[]>;
}

export class B3Layer extends B3Entity {
  private context: Context;

  constructor(context: Context) {
    super(context);
    this.context = context;
  }

  /**
   * Build BOM3 data structure from layer entity
   */
  buildBom3Data(entity: LayerEntity): B3LayerData {
    const data: B3LayerData = {
      entity: turnEntityToBom3Entity(entity),
      rooms: [],
      walls: [],
      wallOpenings: [],
      other: [],
      innerArea: undefined,
      designArea: undefined
    };

    setObjectParameterValues(data, entity, {
      floorSlabIds: 'floorSlabIds',
      ceilingSlabIds: 'ceilingSlabIds',
      wallHeight: 'wallHeight',
      wallThickness: 'wallThickness',
      slabThickness: 'slabThickness',
      layerType: 'layerType'
    }, true);

    const layerId = entity.getId();

    data.rooms = genBom3DataFromGroup(this.context.layerRooms, layerId, new B3Room(this.context));
    data.walls = genBom3DataFromGroup(this.context.layerWalls, layerId, new B3Wall(this.context));
    data.wallOpenings = genBom3DataFromGroup(this.context.layerOpenings, layerId, new B3Opening(this.context));

    const concealedWork = genBom3DataFromGroup(this.context.concealWork, layerId, new B3ConcealedWork(this.context));
    data.concealedWork = concealedWork.length ? concealedWork[0] : undefined;

    this.setRoomCorners(data.rooms, this.createCorner(entity));

    data.other = this.createOtherData(entity);
    data.innerArea = entity.getParameterValue('innerArea');
    data.designArea = entity.getParameterValue('designArea');
    data.customizedPMModels = this.context.layerCustomizedPMModels.get(layerId);

    if (data.customizedPMModels) {
      this.dealDIYPaveData(data.customizedPMModels);
      data.customizedPMModels = data.customizedPMModels.map(dumpEntity);
    }

    return data;
  }

  /**
   * Process DIY pave data for customized PM models
   */
  private dealDIYPaveData(models: CustomizedPMModel[]): void {
    models.forEach((model) => {
      model.getChildren().forEach((child) => {
        const grandChildren = child.getChildren();
        if (grandChildren.length) {
          const twoDData = child.getParameterValue('2D');
          if (twoDData) {
            const paveData = turnPaveEntityToBom3Data(grandChildren, new B3Region(this.context));
            Object.assign(twoDData, paveData);
            child.setChildren([]);
          }
        }
      });
    });
  }

  /**
   * Create other data from layer contents that don't belong to rooms
   */
  private createOtherData(entity: LayerEntity): unknown[] {
    const contents = this.context.layerContents.get(entity.getId());
    if (contents) {
      const filteredContents = contents.filter((content) => {
        return content.instance.getParameterValue('roomId') === undefined;
      });
      return genContentsInfo(filteredContents);
    }
    return [];
  }

  /**
   * Associate exposed corners with rooms
   */
  private setRoomCorners(rooms: RoomData[], cornerMap: Map<string, ExposedCorner[]>): void {
    for (const room of rooms) {
      const roomId = room.entity.instance.id;
      const corners = cornerMap.get(roomId) ?? [];
      room.relations = {
        exposedCorners: corners
      };
    }
  }

  /**
   * Create corner mapping for layer
   */
  private createCorner(entity: LayerEntity): Map<string, ExposedCorner[]> {
    const app = HSApp.App.getApp();
    let targetLayer: Layer | undefined;

    app.floorplan.scene.forEachLayer((layer: Layer) => {
      if (layer.id === entity.getId()) {
        targetLayer = layer;
      }
    });

    const cornerMap = new Map<string, ExposedCorner[]>();

    if (targetLayer) {
      const corners = new ExposedCornerCreator().create(targetLayer);
      for (const corner of corners) {
        const roomId = corner.roomId;
        if (cornerMap.has(roomId)) {
          cornerMap.get(roomId)!.push(corner);
        } else {
          cornerMap.set(roomId, [corner]);
        }
      }
    }

    return cornerMap;
  }
}