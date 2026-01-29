export enum FeatureTypeEnum {
  General = 'General'
}

export interface Vector3D {
  clone(): Vector3D;
  transform(matrix: Matrix4x4): void;
}

export interface Loop {
  outer: Vector3D[];
  holes?: Vector3D[][];
}

export interface Brick {
  material: MaterialObject;
  outer: Vector3D[];
  holes?: Vector3D[][];
}

export interface Block {
  bricks: Brick[];
}

export interface Region {
  loops: Array<{ outer: Vector3D[]; holes?: Vector3D[][] }>;
  blocks: Block[];
  type: FeatureTypeEnum;
}

export interface DwgData {
  regions: Region[];
  waterJetTiles: unknown[];
}

export interface MaterialObject {
  [key: string]: unknown;
}

export interface MaterialData {
  toMaterialObj(): MaterialObject;
}

export interface Matrix4x4 {
  isIdentity(): boolean;
  inversed(): Matrix4x4 | null;
}

export class BaseDwgUtil {
  /**
   * Generate DWG data structure from material data and loops
   */
  static getDwgDataByMaterialData(
    materialData: MaterialData,
    loops: Loop[]
  ): DwgData | undefined {
    if (!loops.length) {
      return;
    }

    const dwgData: DwgData = {
      regions: [],
      waterJetTiles: []
    };

    const materialObject = materialData.toMaterialObj();

    const region: Region = {
      loops: loops.map((loop) => ({
        outer: loop.outer,
        holes: loop.holes
      })),
      blocks: [
        {
          bricks: loops.map((loop) => {
            return {
              material: materialObject,
              outer: loop.outer.map((vertex) => vertex.clone()),
              holes: loop.holes?.map((hole) => hole.map((vertex) => vertex.clone()))
            };
          })
        }
      ],
      type: FeatureTypeEnum.General
    };

    dwgData.regions.push(region);
    return dwgData;
  }

  /**
   * Apply transformation matrix to face group loops
   */
  static preFaceGroupTransform(loops: Loop[], transformMatrix: Matrix4x4): void {
    if (transformMatrix && !transformMatrix.isIdentity()) {
      loops.forEach((loop) => {
        loop.outer.forEach((vertex) => vertex.transform(transformMatrix));
        loop.holes?.forEach((hole) => {
          hole.forEach((vertex) => vertex.transform(transformMatrix));
        });
      });
    }
  }

  /**
   * Get inverse transformation matrix if valid
   */
  static postFaceGroupTransform(matrix: Matrix4x4 | null): Matrix4x4 | undefined {
    const inversedMatrix = matrix?.inversed();
    if (inversedMatrix && !inversedMatrix.isIdentity()) {
      return inversedMatrix;
    }
  }
}