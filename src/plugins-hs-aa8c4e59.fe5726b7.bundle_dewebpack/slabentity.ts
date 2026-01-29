import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { getParentId } from './ParentUtils';
import { Utils } from './Utils';

interface Bound {
  getTopLeft(): Point2D;
  getBottomRight(): Point2D;
}

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface Layer {
  id: string;
}

interface Scene {
  getLayerAltitude(layer: Layer): number;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface HSAppGlobal {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppGlobal;

interface SlabEntitySource {
  id: string;
  Class: string;
  bound: Bound;
  thickness: number;
  getBaseLayer(): Layer | null;
  getUnderLayer(): Layer | null;
}

export class SlabEntity extends AcceptEntity {
  constructor() {
    super();
  }

  buildEntityData(source: SlabEntitySource): void {
    this.setInstanceData(this.getInstanceData(source));
    this.setType({
      classType: source.Class
    });
  }

  buildChildren(): void {
    // No implementation needed
  }

  getInstanceData(source: SlabEntitySource): InstanceData {
    const bound = source.bound;
    const topLeft = bound.getTopLeft();
    const bottomRight = bound.getBottomRight();
    
    const app = HSApp.App.getApp();
    const floorplan = app.floorplan;
    const baseLayer = source.getBaseLayer();
    const altitude = floorplan.scene.getLayerAltitude(baseLayer!);
    
    const center: Point3D = {
      x: (topLeft.x + bottomRight.x) / 2,
      y: (topLeft.y + bottomRight.y) / 2,
      z: altitude
    };
    
    const size: [number, number, number] = [
      Math.abs(topLeft.x - bottomRight.x),
      Math.abs(topLeft.y - bottomRight.y),
      source.thickness
    ];
    
    const instanceData = new InstanceData(source.id);
    const parentId = getParentId(source);
    
    instanceData.addParameter(
      new Parameter(
        "center",
        Utils.formatNumberPoints([center.x, center.y, center.z]),
        DataType.ArrayPoint3D
      ),
      new Parameter(
        "size",
        Utils.formatNumberPoints(size),
        DataType.ArrayPoint3D
      ),
      new Parameter(
        "parentId",
        parentId,
        DataType.String
      )
    );
    
    instanceData.addParameter(
      new Parameter(
        "baselayerId",
        source.getBaseLayer()?.id ?? "",
        DataType.String
      ),
      new Parameter(
        "underlayerId",
        source.getUnderLayer()?.id ?? "",
        DataType.String
      ),
      new Parameter(
        "thickness",
        source.thickness.toString(),
        DataType.String
      )
    );
    
    return instanceData;
  }
}