import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';
import { Logger } from './Logger';

/**
 * Represents path data for extrusion operations
 */
interface PathData {
  /** Array of 3D paths defining the extrusion profile */
  paths: THREE.Vector3[][];
  /** Plane on which the paths lie */
  plane: Plane;
  /** X-axis direction vector in the plane */
  xRay: THREE.Vector3;
  /** Target normal vector perpendicular to the plane */
  targetNormal: THREE.Vector3;
}

/**
 * Plane definition with normal and distance from origin
 */
interface Plane {
  /** X-axis direction in the plane */
  xRay: THREE.Vector3;
  /** Normal vector perpendicular to the plane */
  normal: THREE.Vector3;
  /** Distance from origin along the normal */
  constant: number;
}

/**
 * 2D point representation for polygon clipping operations
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Result of polygon clipping operation
 */
interface ClipResult {
  /** Outer boundary of the clipped polygon */
  outer: Point2D[];
  /** Array of holes within the polygon */
  holes: Point2D[][];
}

/**
 * Cache data structure for extrusion parameters
 */
interface ExtrusionCache {
  pathData: PathData;
  /** Extrusion height/depth value */
  value: number;
}

/**
 * PExtruding model class for handling 3D extrusion geometry.
 * Extends PModel to provide extrusion-specific functionality including
 * path validation, plane calculation, and WebCAD document generation.
 */
export class PExtruding extends PModel {
  /** Internal WebCAD document for geometry representation */
  private _webCadDocument: WebCadDocument;
  
  /** Serialized cache of last extrusion parameters to avoid redundant calculations */
  private _cache?: string;
  
  /** Original paths after processing and validation */
  protected originalPaths?: THREE.Vector3[][];
  
  /** Keys identifying snappable faces for this extrusion */
  protected snappingFaceKeys?: string[];

  /**
   * Creates a new PExtruding instance
   * @param entity - Entity parameter (type to be defined based on parent class)
   * @param param2 - Second parameter (type to be defined based on parent class)
   * @param param3 - Third parameter (type to be defined based on parent class)
   */
  constructor(entity: unknown, param2: unknown, param3: unknown) {
    super(entity, param2, param3);
    this._webCadDocument = new WebCadDocument();
  }

  /**
   * Updates the extrusion geometry based on entity paths and height.
   * Validates paths, computes the base plane, handles multi-path boolean operations,
   * and generates the extruded body in the WebCAD document.
   */
  protected onUpdate(): void {
    const paths = this.entity.getPaths() as { x: number; y: number; z: number }[][];
    const height = this.entity.height as number;
    
    let basePlane: Plane | undefined;
    let processedPaths: THREE.Vector3[][] = [];

    // Convert paths to THREE.Vector3 arrays and validate planarity
    paths.forEach((path) => {
      let vertices = path.map((point) => new THREE.Vector3(point.x, point.y, point.z));
      let isCoplanar = true;

      if (vertices.length > 0) {
        // Check if all points lie in the same plane (same Z coordinate)
        vertices.every((vertex) => {
          isCoplanar = HSCore.Util.Math.nearlyEquals(vertices[0].z, vertex.z);
          return isCoplanar;
        });

        if (isCoplanar) {
          vertices = HSCore.Util.Math.removeDuplicatePoints(vertices);
        }
        processedPaths.push(vertices);
      }
    });

    // Validate that we have at least one path
    if (processedPaths.length === 0) {
      return;
    }

    // Calculate the plane from the first polygon
    basePlane = GeLib.PolygonUtils.getPlaneFromPolygon(processedPaths[0]);

    if (!basePlane) {
      Logger.console.error('Invalid PExtruding paths.');
      return;
    }

    const xAxis = basePlane.xRay;
    const normal = basePlane.normal;

    // Set the extrusion direction on the entity
    this.entity.setDirection(basePlane.normal);

    // Handle multiple paths with boolean difference operation
    if (processedPaths.length > 1) {
      const planeOrigin = normal.clone().multiplyScalar(-basePlane.constant);
      const yAxis = normal.clone().cross(xAxis);

      // Project 3D paths to 2D coordinates in the plane's local coordinate system
      const paths2D = processedPaths.map((path) =>
        path.map((vertex) => {
          const relativePosition = vertex.clone().sub(planeOrigin);
          return {
            x: relativePosition.dot(xAxis),
            y: relativePosition.dot(yAxis)
          };
        })
      );

      const outerPath = paths2D[0];
      const holePaths = paths2D.slice(1);

      // Perform boolean difference: outer path minus hole paths
      const clippedPolygons = HSCore.Util.Collision.ClipPolygon2(
        [outerPath],
        holePaths,
        {
          operation: HSCore.Util.Collision.ClipType.diff
        }
      ) as ClipResult[];

      // Collect all resulting paths (outer boundaries and holes)
      const allClippedPaths: Point2D[][] = [];
      clippedPolygons.forEach((polygon) => {
        allClippedPaths.push(polygon.outer);
        allClippedPaths.push(...polygon.holes);
      });

      // Convert 2D clipped paths back to 3D
      const paths3D = allClippedPaths.map((path2D) =>
        HSCore.Util.Math.removeDuplicatePoints(path2D).map((point) =>
          planeOrigin
            .clone()
            .addScaledVector(xAxis, point.x)
            .addScaledVector(yAxis, point.y)
        )
      );

      processedPaths = paths3D;
    }

    this.originalPaths = processedPaths;
    this.snappingFaceKeys = ['extrudedface'];

    // Prepare cache data structure
    const cacheData: ExtrusionCache = {
      pathData: {
        paths: processedPaths,
        plane: basePlane,
        xRay: xAxis,
        targetNormal: normal
      },
      value: height
    };

    // Only regenerate geometry if parameters have changed
    const serializedCache = JSON.stringify(cacheData);
    if (this._cache && this._cache === serializedCache) {
      return;
    }

    this._cache = serializedCache;
    this._webCadDocument = new WebCadDocument();
    this._webCadDocument.addExtrudedBody(cacheData.pathData, cacheData.value);
  }
}