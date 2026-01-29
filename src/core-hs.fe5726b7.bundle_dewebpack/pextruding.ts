import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Plane {
  xRay: THREE.Vector3;
  normal: THREE.Vector3;
  constant: number;
}

interface PathData {
  paths: THREE.Vector3[][];
  plane: Plane;
  xRay: THREE.Vector3;
  targetNormal: THREE.Vector3;
}

interface ExtrudeCache {
  pathData: PathData;
  value: number;
}

interface ClipResult {
  outer: Point2D[];
  holes: Point2D[][];
}

export class PExtruding extends PModel {
  private _webCadDocument: WebCadDocument;
  private _cache?: string;
  private originalPaths?: THREE.Vector3[][];
  private snappingFaceKeys?: string[];

  constructor(
    entityId: string,
    scene: THREE.Scene,
    parent: THREE.Object3D
  ) {
    super(entityId, scene, parent);
    this._webCadDocument = new WebCadDocument();
  }

  onUpdate(): void {
    const paths = this.entity.getPaths();
    const height = this.entity.height;
    let plane: Plane | undefined;
    let processedPaths: THREE.Vector3[][] = [];

    paths.forEach((path: Point3D[]) => {
      let points = path.map((point: Point3D) => 
        new THREE.Vector3(point.x, point.y, point.z)
      );
      let isCoplanar = true;

      if (points.length > 0) {
        points.every((point: THREE.Vector3) => {
          isCoplanar = HSCore.Util.Math.nearlyEquals(points[0].z, point.z);
          return isCoplanar;
        });

        if (isCoplanar) {
          points = HSCore.Util.Math.removeDuplicatePoints(points);
        }

        processedPaths.push(points);
      }
    });

    if (processedPaths.length === 0) {
      return;
    }

    plane = GeLib.PolygonUtils.getPlaneFromPolygon(processedPaths[0]);

    if (!plane) {
      Logger.console.error('Invalid PExtruding paths.');
      return;
    }

    const xRay = plane.xRay;
    const normal = plane.normal;

    this.entity.setDirection(plane.normal);

    if (processedPaths.length > 1) {
      const planeOrigin = normal.clone().multiplyScalar(-plane.constant);
      const yAxis = normal.clone().cross(xRay);

      const paths2D = processedPaths.map((path: THREE.Vector3[]) =>
        path.map((point: THREE.Vector3) => {
          const relative = point.clone().sub(planeOrigin);
          return {
            x: relative.dot(xRay),
            y: relative.dot(yAxis)
          };
        })
      );

      const outerPath = paths2D[0];
      const holePaths = paths2D.slice(1);

      const clippedPaths = HSCore.Util.Collision.ClipPolygon2(
        [outerPath],
        holePaths,
        {
          operation: HSCore.Util.Collision.ClipType.diff
        }
      );

      const allPolygons: Point2D[][] = [];
      clippedPaths.forEach((result: ClipResult) => {
        allPolygons.push(result.outer);
        allPolygons.push(...result.holes);
      });

      const reconstructedPaths = allPolygons.map((polygon: Point2D[]) =>
        HSCore.Util.Math.removeDuplicatePoints(polygon).map((point: Point2D) =>
          planeOrigin
            .clone()
            .addScaledVector(xRay, point.x)
            .addScaledVector(yAxis, point.y)
        )
      );

      processedPaths = reconstructedPaths;
    }

    this.originalPaths = processedPaths;
    this.snappingFaceKeys = ['extrudedface'];

    const cacheData: ExtrudeCache = {
      pathData: {
        paths: processedPaths,
        plane: plane,
        xRay: xRay,
        targetNormal: normal
      },
      value: height
    };

    const cacheString = JSON.stringify(cacheData);

    if (!this._cache || this._cache !== cacheString) {
      this._cache = cacheString;
      this._webCadDocument = new WebCadDocument();
      this._webCadDocument.addExtrudedBody(cacheData.pathData, cacheData.value);
    }
  }
}