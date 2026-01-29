import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { getParentId } from './EntityUtils';
import { Utils } from './Utils';

interface Bound {
  getTopLeft(): Point;
  getBottomRight(): Point;
}

interface Point {
  x: number;
  y: number;
}

interface Room {
  roomInfos: unknown[];
  rawPath2d: number[][];
}

interface FloorSlab {
  id: string;
  thickness: number;
}

interface Layer {
  id: string;
  Class: string;
  height: number;
  bound: Bound;
  displayName: string;
  floorSlabs: Record<string, FloorSlab>;
  ceilingSlabs: Record<string, FloorSlab>;
  forEachRoom(callback: (room: Room) => void): void;
}

interface Scene {
  ceilingLayer: { id: string };
  outdoorLayer: { id: string };
  getLayerAltitude(layer: Layer): number;
  isUndergroundLayer(layer: Layer): boolean;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface HSAppStatic {
  App: {
    getApp(): App;
  };
  Util: {
    Layer: {
      getLayerGrossFloorArea(layer: Layer): number;
      getLayerGrossInternalArea(layer: Layer): number;
    };
  };
}

declare const HSApp: HSAppStatic;

type LayerType = 'normalLayer' | 'ceilingLayer' | 'outdoorLayer' | 'undergroundLayer';

interface BuildEntityDataContext {
  index?: number;
}

export class LayerEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildChildren(): void {
    // No implementation needed
  }

  buildEntityData(layer: Layer, context?: BuildEntityDataContext): void {
    this.setInstanceData(this.getInstanceData(layer, context));
    this.setType({
      classType: layer.Class
    });
  }

  getInstanceData(layer: Layer, context?: BuildEntityDataContext): InstanceData {
    const altitude = HSApp.App.getApp().floorplan.scene.getLayerAltitude(layer);
    const height = layer.height;
    const bound = layer.bound;
    const topLeft = bound.getTopLeft();
    const bottomRight = bound.getBottomRight();
    
    const center: [number, number, number] = [
      (topLeft.x + bottomRight.x) / 2,
      (topLeft.y + bottomRight.y) / 2,
      altitude
    ];
    
    const size = Utils.formatNumberPoints([
      Math.abs(topLeft.x - bottomRight.x),
      Math.abs(topLeft.y - bottomRight.y),
      height
    ]);
    
    const instanceData = new InstanceData(layer.id);
    const parentId = getParentId(layer);
    
    let designArea = 0;
    layer.forEachRoom((room: Room) => {
      if (room.roomInfos.length > 0) {
        designArea += Utils.getArea(room.rawPath2d);
      }
    });
    
    const grossFloorArea = HSApp.Util.Layer.getLayerGrossFloorArea(layer);
    const grossInternalArea = HSApp.Util.Layer.getLayerGrossInternalArea(layer);
    
    instanceData.addParameter(
      new Parameter("center", Utils.formatNumberPoints(center)),
      new Parameter("size", size, DataType.ArrayPoint2D),
      new Parameter("parentId", parentId, DataType.String),
      new Parameter("designArea", Utils.formatNumberPoints(designArea), DataType.Number),
      new Parameter("grossFloorArea", Utils.formatNumberPoints(grossFloorArea), DataType.Number),
      new Parameter("innerArea", Utils.formatNumberPoints(grossInternalArea), DataType.Number),
      new Parameter("index", context?.index, DataType.Number),
      new Parameter("displayName", layer.displayName, DataType.String)
    );
    
    const floorSlabs = Array.from(Object.values(layer.floorSlabs));
    let slabThickness = 0.1;
    if (floorSlabs.length > 0) {
      slabThickness = floorSlabs[0].thickness;
    }
    
    const scene = HSApp.App.getApp().floorplan.scene;
    const layerId = layer.id;
    
    const floorSlabIds = Array.from(Object.values(layer.floorSlabs)).map((slab) => slab.id);
    const ceilingSlabIds = Array.from(Object.values(layer.ceilingSlabs)).map((slab) => slab.id);
    
    let layerType: LayerType = 'normalLayer';
    if (scene.ceilingLayer.id === layerId) {
      layerType = 'ceilingLayer';
    } else if (scene.outdoorLayer.id === layerId) {
      layerType = 'outdoorLayer';
    } else if (scene.isUndergroundLayer(layer)) {
      layerType = 'undergroundLayer';
    }
    
    instanceData.addParameter(
      new Parameter("wallHeight", size[2], DataType.Number),
      new Parameter("wallThickness", 0.24, DataType.Number),
      new Parameter("slabThickness", slabThickness, DataType.Number),
      new Parameter("layerType", layerType, DataType.String),
      new Parameter("floorSlabIds", floorSlabIds, DataType.StringArray),
      new Parameter("ceilingSlabIds", ceilingSlabIds, DataType.StringArray)
    );
    
    return instanceData;
  }
}