import { Matrix4, MathAlg } from './math-types';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface Geometry2D {
  outer: Point2D[];
  holes: Point2D[][];
}

interface Geometry2DWithMatrix extends Geometry2D {
  convert3dMatrix: THREE.Matrix4;
}

interface RawPath {
  outer: Curve3D[];
}

interface SurfaceObject {
  surface: unknown;
  sameDirWithSurface: unknown;
  localToWorld: { toArray: () => number[] };
  getCurve2ds: (outer: unknown) => Curve2D[];
}

interface FaceHole {
  isRaw: boolean;
  type: string;
  outer: unknown;
}

interface Face {
  surfaceObj: SurfaceObject;
  doc: Document;
  parent: Layer;
  rawPath: RawPath;
  rawGeometry2d: Geometry2D;
  holes: FaceHole[];
}

interface Layer {
  faces: Record<string, Face>;
}

interface Scene {
  forEachLayer: (callback: (layer: Layer) => void) => void;
}

interface Document {
  scene: Scene;
}

interface Curve3D {
  transformed: (matrix: Matrix4) => Curve3D;
}

interface Curve2D {
  x: number;
  y: number;
}

interface GeometryManager {
  getFaceGeomInfo: (face: Face) => GeomInfo | null;
}

interface GeomInfo {
  faceInfo: unknown;
}

interface ClipOptions {
  operation: string;
  subject_fillType: string;
  clip_fillType: string;
}

interface ClipResult {
  outer: Point2D[];
  holes: Point2D[][];
}

declare const HSCore: {
  Util: {
    TgWall: {
      isSameDirection: (surface1: unknown, sameDir1: unknown, surface2: unknown, sameDir2: unknown) => boolean;
      getVectorsFromCurves: (curves: Curve2D[]) => Point2D[];
    };
    Layer: {
      getAltitude: (layer: Layer) => number;
      getEntityBaseHeight: (face: Face) => number;
    };
    Collision: {
      ClipType: { union: string };
      PolyFillType: { positive: string };
      ClipFaces: (subject: Geometry2D[], clip: Geometry2D[], options: ClipOptions) => ClipResult[] | null;
    };
    Math: {
      isClockwise: (points: Point2D[]) => boolean;
    };
  };
  Doc: {
    getDocManager: () => { geometryManager: GeometryManager };
  };
  Paint: {
    PaintsUtil: {
      getFaceGeometry2D: (face: Face, flag: boolean) => (Geometry2D & { convert3dMatrix?: THREE.Matrix4 }) | null;
    };
  };
  Model: {
    FaceHoleType: { ClipHole: string };
  };
};

declare const THREE: {
  Matrix4: new () => {
    fromArray: (array: number[]) => THREE.Matrix4;
    getInverse: (matrix: THREE.Matrix4) => THREE.Matrix4;
    makeTranslation: (x: number, y: number, z: number) => THREE.Matrix4;
    premultiply: (matrix: THREE.Matrix4) => THREE.Matrix4;
  };
  Vector3: new (x: number, y: number, z: number) => {
    x: number;
    y: number;
    applyMatrix4: (matrix: THREE.Matrix4) => THREE.Vector3;
  };
};

export class SameLineFaceUtil {
  /**
   * Get all faces that are connected and in the same line direction
   */
  static getSameLineConnectedFaces(face: Face, candidateFaces?: Face[]): Face[] {
    let remainingFaces = candidateFaces
      ? candidateFaces.filter(candidate => this.isSameLineDirectionWithFace(face, candidate) && candidate !== face)
      : this.getSameLineDirectionFaces(face);

    const connectedFaces: Face[] = [face];

    for (let i = 0; i < connectedFaces.length; i++) {
      const currentFace = connectedFaces[i];
      const unconnectedFaces: Face[] = [];

      for (let j = 0; j < remainingFaces.length; j++) {
        if (this.isConnectedWithFace(currentFace, remainingFaces[j])) {
          connectedFaces.push(remainingFaces[j]);
        } else {
          unconnectedFaces.push(remainingFaces[j]);
        }
      }

      remainingFaces = unconnectedFaces;
    }

    return connectedFaces;
  }

  /**
   * Check if two faces have the same line direction
   */
  static isSameLineDirectionWithFace(face1: Face, face2: Face): boolean {
    const surface1 = face1.surfaceObj;
    const surface2 = face2.surfaceObj;

    return HSCore.Util.TgWall.isSameDirection(
      surface1.surface,
      surface1.sameDirWithSurface,
      surface2.surface,
      surface2.sameDirWithSurface
    );
  }

  /**
   * Get all faces in the scene that have the same line direction as the given face
   */
  static getSameLineDirectionFaces(face: Face): Face[] {
    const allFaces: Face[] = [];

    face.doc.scene.forEachLayer(layer => {
      allFaces.push(...Object.values(layer.faces));
    });

    const sameDirFaces = allFaces.filter(
      candidate => this.isSameLineDirectionWithFace(face, candidate) && candidate !== face
    );

    return Array.from(new Set(sameDirFaces));
  }

  /**
   * Check if two faces are physically connected
   */
  static isConnectedWithFace(face1: Face, face2: Face): boolean {
    const outerPath1 = face1.rawPath.outer;
    const outerPath2 = face2.rawPath.outer;
    const altitude1 = HSCore.Util.Layer.getAltitude(face1.parent);
    const altitude2 = HSCore.Util.Layer.getAltitude(face2.parent);

    for (const curve1 of outerPath1) {
      const transformedCurve1 = curve1.transformed(
        Matrix4.makeTranslate({ x: 0, y: 0, z: altitude1 })
      );

      for (const curve2 of outerPath2) {
        const transformedCurve2 = curve2.transformed(
          Matrix4.makeTranslate({ x: 0, y: 0, z: altitude2 })
        );

        if (MathAlg.CalculateOverlap.curve3ds(transformedCurve1, transformedCurve2).length > 0) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Get the unified boundary of multiple same-line faces
   */
  static getSameLineFacesBound(
    baseFace: Face,
    otherFaces: Face[]
  ): Geometry2DWithMatrix | null {
    const { facesGeometry2DMap, convert3dMatrix } = this._getFacesGeometry2DMap(
      baseFace,
      otherFaces,
      true
    );

    const baseGeometry = facesGeometry2DMap.get(baseFace);
    if (!baseGeometry) return null;

    const otherGeometries = otherFaces
      .filter(face => face !== baseFace)
      .map(face => facesGeometry2DMap.get(face))
      .filter((geometry): geometry is Geometry2D => !!geometry);

    if (otherGeometries.length > 0) {
      const clipOptions: ClipOptions = {
        operation: HSCore.Util.Collision.ClipType.union,
        subject_fillType: HSCore.Util.Collision.PolyFillType.positive,
        clip_fillType: HSCore.Util.Collision.PolyFillType.positive
      };

      const clipFaces = otherGeometries.map(geometry => ({
        outer: geometry.outer,
        holes: []
      }));

      const clippedResult = HSCore.Util.Collision.ClipFaces([baseGeometry], clipFaces, clipOptions);
      if (!clippedResult || clippedResult.length < 1) return null;

      const { outer } = clippedResult[0];
      const allHoles: Point2D[][] = [];

      [baseGeometry, ...otherGeometries].forEach(geometry => {
        allHoles.push(...geometry.holes);
      });

      return {
        outer,
        holes: allHoles,
        convert3dMatrix
      };
    } else {
      const { outer, holes } = baseGeometry;
      return {
        outer,
        holes,
        convert3dMatrix
      };
    }
  }

  /**
   * Convert faces to 2D geometry map with transformation matrix
   */
  private static _getFacesGeometry2DMap(
    baseFace: Face,
    otherFaces: Face[],
    includeHoles: boolean
  ): {
    facesGeometry2DMap: Map<Face, Geometry2D>;
    convert3dMatrix: THREE.Matrix4;
  } {
    const facesGeometry2DMap = new Map<Face, Geometry2D>();
    let convert3dMatrix = new THREE.Matrix4();

    const geometryManager = HSCore.Doc.getDocManager().geometryManager;
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(baseFace);
    const baseGeometry2D = HSCore.Paint.PaintsUtil.getFaceGeometry2D(baseFace, true);

    if (!baseGeometry2D) {
      return { facesGeometry2DMap, convert3dMatrix };
    }

    convert3dMatrix = baseGeometry2D.convert3dMatrix || new THREE.Matrix4();

    const inverseMatrix = new THREE.Matrix4().getInverse(convert3dMatrix);
    const translationMatrix = new THREE.Matrix4().makeTranslation(0, 0, -baseHeight);
    translationMatrix.premultiply(inverseMatrix);

    const convertFaceToGeometry2D = (face: Face): Geometry2D | null =>
      this._getFaceGeometry2D(geometryManager, face, translationMatrix, includeHoles);

    const normalizeGeometry = (geometry: Geometry2D): Geometry2D => {
      const { outer, holes } = geometry;

      if (HSCore.Util.Math.isClockwise(outer)) {
        outer.reverse();
      }

      holes.forEach(hole => {
        if (!HSCore.Util.Math.isClockwise(hole)) {
          hole.reverse();
        }
      });

      return geometry;
    };

    for (const face of [baseFace, ...otherFaces]) {
      const geometry = convertFaceToGeometry2D(face);
      if (geometry) {
        normalizeGeometry(geometry);
        facesGeometry2DMap.set(face, geometry);
      }
    }

    return { facesGeometry2DMap, convert3dMatrix };
  }

  /**
   * Convert a single face to 2D geometry
   */
  private static _getFaceGeometry2D(
    geometryManager: GeometryManager,
    face: Face,
    transformMatrix: THREE.Matrix4,
    includeHoles: boolean = false
  ): Geometry2D | null {
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(face);
    const geomInfo = geometryManager.getFaceGeomInfo(face);

    if (!geomInfo || !geomInfo.faceInfo) return null;

    const rawGeometry2d = face.rawGeometry2d;
    const localToWorldMatrix = new THREE.Matrix4().fromArray(
      face.surfaceObj.localToWorld.toArray()
    );

    localToWorldMatrix.premultiply(new THREE.Matrix4().makeTranslation(0, 0, baseHeight));
    localToWorldMatrix.premultiply(transformMatrix);

    const transformedOuter = rawGeometry2d.outer.map(point => {
      const vector = new THREE.Vector3(point.x, point.y, 0).applyMatrix4(localToWorldMatrix);
      return { x: vector.x, y: vector.y };
    });

    let transformedHoles: Point2D[][] = [];

    if (includeHoles) {
      const allHoles = rawGeometry2d.holes.slice();

      face.holes
        .filter(hole => !hole.isRaw && hole.type !== HSCore.Model.FaceHoleType.ClipHole)
        .forEach(hole => {
          const curve2ds = face.surfaceObj.getCurve2ds(hole.outer);
          allHoles.push(HSCore.Util.TgWall.getVectorsFromCurves(curve2ds).reverse());
        });

      transformedHoles = allHoles.map(hole =>
        hole.map(point => {
          const vector = new THREE.Vector3(point.x, point.y, 0).applyMatrix4(localToWorldMatrix);
          return { x: vector.x, y: vector.y };
        })
      );
    }

    return {
      outer: transformedOuter,
      holes: transformedHoles
    };
  }
}