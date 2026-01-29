interface Vector3Like {
  x: number;
  y: number;
  z: number;
  transform(matrix: Matrix4): Vector3;
}

interface Matrix4Like {
  fromArray(array: number[]): Matrix4;
  inverse(): Matrix4 | null;
  inversed(): Matrix4 | null;
  toArray(): number[];
}

interface Vector3Constructor {
  new (source: any): Vector3Like;
}

interface Matrix4Constructor {
  new (): Matrix4Like;
}

type Vector3 = Vector3Like;
type Matrix4 = Matrix4Like;

interface GeometryMatrix {
  toArray(): number[];
}

interface FaceGeometry2D {
  convert3dMatrix: GeometryMatrix | null;
}

interface Face {
  // Base face interface
}

interface Floor extends Face {
  // Floor specific properties
}

interface Ceiling extends Face {
  // Ceiling specific properties
}

interface ContentObject {
  YSize: number;
  doc?: any[];
  zippedDoc?: Array<[string, string[], any[][]]>;
}

interface MoldingNode {
  moldingId?: string;
  children?: TreeNode[];
}

interface LightSlotNode {
  slotId?: string;
  children?: TreeNode[];
}

type TreeNode = MoldingNode | LightSlotNode | { children?: TreeNode[] };

interface HSCoreAPI {
  Util: {
    Content: {
      getHostedFace(obj: ContentObject): Face | null;
    };
  };
  Paint: {
    PaintsUtil: {
      getFaceGeometry2D(face: Face, flag: boolean): FaceGeometry2D | null;
    };
  };
}

interface PmWallSDKAPI {
  onParamsChangedCallback(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): void;
}

declare const HSCore: HSCoreAPI;

const PRECISION_MULTIPLIER = 1000;

export class NCustomizedParametricModelUtil {
  static unZipDocFile<T extends ContentObject>(content: T): T {
    const hasDoc = content?.doc?.length;
    if (hasDoc) {
      return content;
    }

    const hasZippedDoc = content?.zippedDoc?.length;
    if (!hasZippedDoc) {
      return content;
    }

    const result = Object.assign({}, content);

    result.doc = content.zippedDoc
      .map(([constructor, propertyNames, instances]) =>
        instances.map((instanceData) => {
          const obj: Record<string, unknown> = {
            _ctor_: constructor,
          };

          instanceData.forEach(([propertyIndex, value]) => {
            obj[propertyNames[propertyIndex]] = value;
          });

          return obj;
        })
      )
      .flat();

    return result;
  }

  static getDistanceToWall(content: ContentObject): number {
    let distance = 0;

    const position = new (Vector3 as unknown as Vector3Constructor)(content);
    const hostedFace = HSCore.Util.Content.getHostedFace(content);

    if (!hostedFace) {
      return distance;
    }

    const faceGeometry = HSCore.Paint.PaintsUtil.getFaceGeometry2D(
      hostedFace,
      true
    );

    if (!faceGeometry) {
      return distance;
    }

    const convertMatrix = faceGeometry.convert3dMatrix;

    if (!convertMatrix) {
      return distance;
    }

    const transformMatrix = new (Matrix4 as unknown as Matrix4Constructor)().fromArray(
      convertMatrix.toArray()
    );

    const isFloorOrCeiling =
      hostedFace instanceof (Floor as any) ||
      hostedFace instanceof (Ceiling as any);

    if (isFloorOrCeiling) {
      distance = 0;
    } else {
      const inverseMatrix = transformMatrix.inverse();

      if (!inverseMatrix) {
        return distance;
      }

      const transformedPosition = position.transform(inverseMatrix);
      distance = transformedPosition.z - content.YSize / 2;
    }

    distance = Math.round(PRECISION_MULTIPLIER * distance) / PRECISION_MULTIPLIER;

    return distance;
  }

  static getPosByDistanceToWall(
    content: ContentObject,
    distanceToWall: number
  ): Vector3 | undefined {
    const hostedFace = HSCore.Util.Content.getHostedFace(content);

    if (!hostedFace || !(hostedFace instanceof (Face as any))) {
      return undefined;
    }

    const isFloorOrCeiling =
      hostedFace instanceof (Ceiling as any) ||
      hostedFace instanceof (Floor as any);

    if (isFloorOrCeiling) {
      return undefined;
    }

    const faceGeometry = HSCore.Paint.PaintsUtil.getFaceGeometry2D(
      hostedFace,
      true
    );

    if (!faceGeometry) {
      return undefined;
    }

    const convertMatrix = faceGeometry.convert3dMatrix;

    if (!convertMatrix) {
      return undefined;
    }

    const position = new (Vector3 as unknown as Vector3Constructor)(content);
    const transformMatrix = new (Matrix4 as unknown as Matrix4Constructor)().fromArray(
      convertMatrix.toArray()
    );
    const inverseMatrix = transformMatrix.inversed();

    if (!inverseMatrix) {
      return undefined;
    }

    const localPosition = position.transform(inverseMatrix);
    localPosition.z = distanceToWall + content.YSize / 2;

    return localPosition.transform(transformMatrix);
  }

  static onParamsChangedCallback(
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): void {
    const PmWallSDK = require('./PmWallSDK') as PmWallSDKAPI;
    PmWallSDK.onParamsChangedCallback(param1, param2, param3);
  }

  static findMoldingNodeByEid(
    node: TreeNode,
    targetId: string
  ): MoldingNode | undefined {
    if (node.children) {
      for (const childNode of node.children) {
        const found = this.findMoldingNodeByEid(childNode, targetId);
        if (found) {
          return found;
        }
      }
    }

    const moldingNode = node as MoldingNode;
    if (moldingNode.moldingId && moldingNode.moldingId === targetId) {
      return moldingNode;
    }

    return undefined;
  }

  static findLightSlotNodeByEid(
    node: TreeNode,
    targetId: string
  ): LightSlotNode | undefined {
    if (node.children) {
      for (const childNode of node.children) {
        const found = this.findLightSlotNodeByEid(childNode, targetId);
        if (found) {
          return found;
        }
      }
    }

    const lightSlotNode = node as LightSlotNode;
    if (lightSlotNode.slotId && lightSlotNode.slotId === targetId) {
      return lightSlotNode;
    }

    return undefined;
  }
}