import { Box3, Vector3, Coordinate3 } from './geometry';
import { 
  NCPBackgroundWallBase, 
  Opening, 
  ParametricOpening, 
  OpeningDecorator, 
  PODecorator, 
  Door, 
  Window, 
  BayWindow, 
  ParametricDoor, 
  Layer 
} from './entities';
import { NCPBackgroundWallBaseDecorator } from './decorators';
import { LayerUtil } from './utils';

interface XSizeLimit {
  minValue: number;
  maxValue: number;
}

interface WFALimitedXSize {
  maxXSize: number;
  minXSize: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface AssetData {
  seekId: string;
  recordData: Record<string, unknown>;
  position: Position;
}

interface WFAProductData {
  xSize: number;
  ySize: number;
  zSize: number;
  z: number;
  originalSpaceXLength: number;
  originalSpaceYLength: number;
  originalSpaceZLength: number;
  assets: AssetData[];
  maxXSize: number;
  minXSize: number;
}

interface BackgroundWall {
  XSize: number;
}

interface AssociatedContent {
  x: number;
  y: number;
  z: number;
  seekId: string;
}

interface WallFace {
  surfaceObj: {
    surface: {
      getCoord(): {
        getDx(): Vector3;
      };
    };
  };
}

interface RawPathSegment {
  outer: Array<{
    transformed(matrix: unknown): {
      getBoundingBox(): Box3;
    };
  }>;
}

interface WallFaceAssembly {
  xSize: number;
  ySize: number;
  zSize: number;
  z: number;
  wallFace: WallFace;
  associatedContents: AssociatedContent[];
  backgroundWalls: BackgroundWall[];
  associatedIds: string[];
}

interface Entity {
  id: string;
  contentType?: {
    isTypeOf(types: string[]): boolean;
  };
}

export class WallFaceAssemblyDecorator {
  private readonly _wfa: WallFaceAssembly;

  constructor(wallFaceAssembly: WallFaceAssembly) {
    this._wfa = wallFaceAssembly;
  }

  getWFALimitedXSize(): WFALimitedXSize {
    const backgroundWalls = this._wfa.backgroundWalls;
    let maxXSize = Infinity;
    let minXSize = 0;
    const currentXSize = this._wfa.xSize;

    for (const wall of backgroundWalls) {
      const { minValue, maxValue }: XSizeLimit = new NCPBackgroundWallBaseDecorator(wall).getXSizeLimit();
      const wallXSize = wall.XSize;
      const sizeRatio = wallXSize / currentXSize;
      const maxExpansion = maxValue / 1000 - wallXSize;
      const maxReduction = wallXSize - minValue / 1000;

      if (maxExpansion >= 0) {
        const calculatedMaxXSize = currentXSize + maxExpansion / sizeRatio;
        if (calculatedMaxXSize <= maxXSize) {
          maxXSize = calculatedMaxXSize;
        }
      }

      if (maxReduction >= 0) {
        const calculatedMinXSize = currentXSize - maxReduction / sizeRatio;
        if (calculatedMinXSize >= minXSize) {
          minXSize = calculatedMinXSize;
        }
      }
    }

    return {
      maxXSize,
      minXSize
    };
  }

  getWFAProductData(rawPathSegments: RawPathSegment[]): WFAProductData {
    const {
      xSize,
      ySize,
      zSize,
      z,
      wallFace,
      associatedContents
    } = this._wfa;

    const worldToLocalMatrix = this.getFaceLocalCoordinate(wallFace).getWorldToLocalMatrix();
    const boundingBox = new Box3();

    rawPathSegments.forEach(segment =>
      segment.rawPath.outer.forEach(element =>
        boundingBox.union(element.transformed(worldToLocalMatrix).getBoundingBox())
      )
    );

    const minPoint = boundingBox.min;
    const assets: AssetData[] = associatedContents.map(content => {
      const localPosition = new Vector3(content.x, content.y, content.z)
        .transformed(worldToLocalMatrix)
        .subtracted(minPoint)
        .toXYZ();

      let recordData: Record<string, unknown> = {};

      if (content instanceof NCPBackgroundWallBase) {
        recordData = new NCPBackgroundWallBaseDecorator(content).dump(minPoint) ?? {};
      } else if (content instanceof Opening) {
        recordData = new OpeningDecorator(content).dump();
      } else if (content instanceof ParametricOpening) {
        recordData = new PODecorator(content).dump();
      }

      return {
        seekId: content.seekId,
        recordData,
        position: localPosition
      };
    });

    const size = boundingBox.getSize();
    const { x: originalSpaceXLength, y: originalSpaceYLength, z: originalSpaceZLength } = size;
    const { maxXSize, minXSize } = this.getWFALimitedXSize();

    return {
      xSize,
      ySize,
      zSize,
      z,
      originalSpaceXLength,
      originalSpaceYLength,
      originalSpaceZLength,
      assets,
      maxXSize,
      minXSize
    };
  }

  getWallFaceAssemblyParent(entity: Entity): WallFaceAssembly | undefined {
    let parentAssembly: WallFaceAssembly | undefined;
    const layer = LayerUtil.getEntityLayer(entity);

    if (layer instanceof Layer) {
      layer.forEachWallFaceAssembly((assembly: WallFaceAssembly) => {
        if (assembly.associatedIds.includes(entity.id)) {
          parentAssembly = assembly;
        }
      });
    }

    return parentAssembly;
  }

  isValidChild(entity: Entity): boolean {
    return (
      entity instanceof NCPBackgroundWallBase ||
      entity instanceof Door ||
      entity instanceof Window ||
      entity instanceof BayWindow ||
      entity instanceof ParametricDoor ||
      (entity instanceof ParametricOpening &&
        !entity.contentType?.isTypeOf(['corner window', 'corner bay window']))
    );
  }

  getAllValidChildrenOnFace(face: {
    contents: Record<string, Entity>;
    openings: Entity[];
    parametricOpenings: Entity[];
  }): Entity[] {
    const allChildren: Entity[] = [];

    Object.values(face.contents).forEach(content => {
      allChildren.push(content);
    });

    face.openings.forEach(opening => {
      allChildren.push(opening);
    });

    face.parametricOpenings.forEach(parametricOpening => {
      allChildren.push(parametricOpening);
    });

    return allChildren.filter(child => this.isValidChild(child));
  }

  getFaceLocalCoordinate(wallFace: WallFace): Coordinate3 {
    const xAxis = wallFace.surfaceObj.surface.getCoord().getDx();
    const yAxis = Vector3.readonlyZ().cross(xAxis);
    return new Coordinate3(Vector3.readonlyO(), xAxis, yAxis);
  }
}