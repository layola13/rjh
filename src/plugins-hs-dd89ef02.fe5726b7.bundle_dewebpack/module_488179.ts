import { ColinearWallMerger } from './ColinearWallMerger';
import { StructureTypeEnum, SturctureSeekIdEnum } from './StructureEnums';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Size {
  a: number;
  b: number;
  c: number;
}

interface StructureInfo {
  type: string;
  position: Position;
  size: Size;
}

interface WallBounds {
  xyMin: { x: number; y: number };
  xyMax: { x: number; y: number };
}

interface LayoutData {
  model: {
    structures: StructureInfo[];
  };
  extension: {
    wall_bounds: WallBounds;
  };
}

interface GeometrySize {
  x: number;
  y: number;
  z: number;
}

interface GeometryInfo {
  position: Position;
  size: GeometrySize;
}

interface StructureGeometry {
  type: StructureTypeEnum;
  geoInfo: GeometryInfo;
}

interface ScaleInfo {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface Product {
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface CatalogManager {
  getProductBySeekId(seekId: SturctureSeekIdEnum): Promise<Product | null>;
}

interface TransactionRequest {
  result: unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

declare const HSCatalog: {
  Manager: {
    instance(): CatalogManager;
  };
};

declare const HSApp: {
  App: {
    getApp(): {
      transManager: TransactionManager;
    };
  };
};

declare const HSFPConstants: {
  RequestType: {
    AddStructure: string;
  };
};

export default class StructureBuilder {
  async buildStructureFromLayout(layout: LayoutData): Promise<unknown[]> {
    try {
      ColinearWallMerger.mergeColinearWall(layout);
      
      const structures = layout.model.structures;
      const wallBounds = layout.extension.wall_bounds;
      
      const center: Position = {
        x: (wallBounds.xyMax.x + wallBounds.xyMin.x) / 2,
        y: (wallBounds.xyMax.y + wallBounds.xyMin.y) / 2,
        z: 0
      };
      
      const translatePosition = (pos: Position): Position => ({
        x: pos.x - center.x,
        y: pos.y - center.y,
        z: pos.z
      });
      
      const promises: Promise<unknown>[] = [];
      
      structures.forEach((structure: StructureInfo) => {
        structure.position = translatePosition(structure.position);
        
        const { type, geoInfo } = this.getStructureGeometryByInfo(structure);
        
        if (type === StructureTypeEnum.Invalid) {
          promises.push(Promise.resolve(""));
        } else {
          promises.push(this.addStructure(type, geoInfo));
        }
      });
      
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      return [];
    }
  }

  getStructureType(typeString: string): StructureTypeEnum {
    let type = StructureTypeEnum.Invalid;
    
    if (typeString === "pillar") {
      type = StructureTypeEnum.ColumnSquare;
    } else if (typeString === "smoke") {
      type = StructureTypeEnum.SmokeFlue;
    } else if (typeString === "pipe") {
      type = StructureTypeEnum.Pipe;
    } else if (typeString === "hole") {
      type = StructureTypeEnum.FloorHole;
    }
    
    return type;
  }

  getStructureGeometryByInfo(info: StructureInfo): StructureGeometry {
    const { type, position, size } = info;
    
    const geometrySize: GeometrySize = {
      x: size.a,
      y: size.b,
      z: size.c
    };
    
    return {
      type: this.getStructureType(type),
      geoInfo: {
        position,
        size: geometrySize
      }
    };
  }

  async addStructure(type: StructureTypeEnum, geoInfo: GeometryInfo): Promise<void> {
    let seekId: SturctureSeekIdEnum | undefined;
    
    switch (type) {
      case StructureTypeEnum.ColumnSquare:
        seekId = SturctureSeekIdEnum.ColumnSquare;
        break;
      case StructureTypeEnum.SmokeFlue:
        seekId = SturctureSeekIdEnum.SmokeFlue;
        break;
      case StructureTypeEnum.Pipe:
        seekId = SturctureSeekIdEnum.Pipe;
        break;
      case StructureTypeEnum.FloorHole:
        seekId = SturctureSeekIdEnum.FloorHole;
        break;
      default:
        return;
    }
    
    if (!seekId) {
      return;
    }
    
    const { position, size } = geoInfo;
    const catalogManager = HSCatalog.Manager.instance();
    const product = await catalogManager.getProductBySeekId(seekId);
    
    if (product) {
      const scale: ScaleInfo = {
        XScale: size.x ? size.x / product.XLength : 1,
        YScale: size.y ? size.y / product.YLength : 1,
        ZScale: size.z ? size.z / product.ZLength : 1
      };
      
      const rotation: Position = { x: 0, y: 0, z: 0 };
      
      this.addStructureRequest(product, position, rotation, scale);
    }
  }

  addStructureRequest(
    product: Product,
    position: Position,
    rotation: Position,
    scale: ScaleInfo
  ): unknown | undefined {
    try {
      const app = HSApp.App.getApp();
      const transManager = app.transManager;
      const request = transManager.createRequest(
        HSFPConstants.RequestType.AddStructure,
        [product, position, rotation, scale]
      );
      
      transManager.commit(request);
      return request.result;
    } catch (error) {
      return undefined;
    }
  }
}