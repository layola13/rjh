/**
 * WindowPocket Model
 * 
 * A parametric model that handles window pocket geometry with molding profiles.
 * Supports custom materials, UV mapping, and both synchronous/asynchronous graphics generation.
 */

import { ParametricModel } from './ParametricModel';
import { WebCadDocument } from './WebCadDocument';
import * as THREE from 'three';

/**
 * Represents a 3D point with x, y, z coordinates
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Profile data defining the shape and dimensions of a molding
 */
interface ProfileData {
  /** Profile definition string or object */
  profile: string | object;
  /** Profile width in meters */
  profileSizeX: number;
  /** Profile height in meters */
  profileSizeY: number;
  /** Optional normal texture for bump mapping */
  normalTexture?: string;
}

/**
 * Material data for texture mapping and rendering
 */
interface MaterialData {
  /** Horizontal tile size in meters */
  tileSize_x?: number;
  /** Vertical tile size in meters */
  tileSize_y?: number;
  /** Horizontal offset for texture mapping */
  offsetX?: number;
  /** Vertical offset for texture mapping */
  offsetY?: number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Normalized horizontal tile size */
  normalTileSize_x?: number;
  /** Normalized vertical tile size */
  normalTileSize_y?: number;
  /** Convert material data to JSON */
  toJson(): MaterialData;
}

/**
 * Parameters for WindowPocket entity
 */
interface WindowPocketParameters {
  /** Array of molding paths defining the outer contours */
  moldingPaths?: Point3D[][];
  /** Molding paths with neighbor information for continuity */
  moldingPathsWithNeighbours?: unknown[];
  /** Profile configuration for moldings */
  profileData?: ProfileData;
  /** Interior cavity paths */
  insidePaths?: Point3D[][];
  /** Outer molding width override */
  outerMoldingSizeX?: number;
  /** Outer molding height override */
  outerMoldingSizeY?: number;
  /** Thickness of inside panels in meters */
  insideThickness?: number;
  /** Material configuration */
  materialData?: MaterialData;
}

/**
 * Mesh definition with geometry key
 */
interface MeshDef {
  meshKey: string;
  customData?: {
    isPlaceHolder?: boolean;
    faceMaterialId?: string;
  };
  [key: string]: unknown;
}

/**
 * Graphics object representation
 */
interface GraphicsObject {
  graphicsPath: string;
  mesh: string;
  material: MaterialObject;
  customAttrs: CustomAttributes;
  entityId: string;
  type: string;
  visible: boolean;
}

/**
 * Material object with texture transforms
 */
interface MaterialObject {
  moldingMaterialRotation?: number;
  rotation?: number;
  normalTexture?: string;
  seekId?: string;
  diffuseMapUvTransform?: THREE.Matrix3;
  normalMapUvTransform?: THREE.Matrix3;
  pocketMaterial?: boolean;
  [key: string]: unknown;
}

/**
 * Custom attributes for graphics objects
 */
interface CustomAttributes {
  seekIds?: string[];
  roomType: string;
  roomArea: number;
  type: string;
}

/**
 * Graphics data result structure
 */
interface GraphicsData {
  meshDefs: MeshDef[];
  objects: GraphicsObject[];
}

/**
 * Plane options for extrusion
 */
interface PlaneOption {
  independent: boolean;
}

/**
 * Molding configuration data
 */
interface MoldingData {
  profile: string | object;
  profileSizeX: number;
  profileSizeY: number;
  yRayAsNormalDirection: boolean;
}

/**
 * UV transform result for texture mapping
 */
interface UVTransform {
  diffuseMapUvTransform: THREE.Matrix3;
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * WindowPocket - A parametric 3D model for window recesses with decorative moldings.
 * 
 * This class handles:
 * - Molding path generation and offset calculation
 * - Profile extrusion along paths
 * - Material and UV coordinate mapping
 * - Mesh generation for rendering
 */
export class WindowPocket extends ParametricModel {
  /** WebCAD document for main geometry */
  private _webCADDocument!: WebCadDocument;
  
  /** WebCAD document for molding geometry */
  private _moldingWebCadDocument?: WebCadDocument;

  /**
   * Creates a new WindowPocket instance
   * 
   * @param arg1 - First constructor argument (inherited)
   * @param arg2 - Second constructor argument (inherited)
   * @param arg3 - Third constructor argument (inherited)
   * @param arg4 - Fourth constructor argument (inherited)
   */
  constructor(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown) {
    super(arg1, arg2, arg3, arg4);
  }

  /**
   * Update handler called when entity parameters change.
   * Regenerates molding paths, extrusions, and interior surfaces.
   */
  onUpdate(): void {
    super.onUpdate();

    const {
      moldingPaths,
      moldingPathsWithNeighbours,
      profileData,
      insidePaths,
      outerMoldingSizeX,
      outerMoldingSizeY
    } = (this.entity.parameters as WindowPocketParameters);

    if (moldingPaths && moldingPathsWithNeighbours && profileData) {
      this._moldingWebCadDocument = new WebCadDocument();

      for (let pathIndex = 0; pathIndex < moldingPaths.length; ++pathIndex) {
        const path = moldingPaths[pathIndex].map(
          (point: Point3D) => new THREE.Vector3(point.x, point.y, point.z)
        );
        
        const closedPath = path.slice();
        if (!GeLib.VectorUtils.isPointEqual(closedPath[0], path[closedPath.length - 1])) {
          closedPath.push(closedPath[0]);
        }

        const plane = new THREE.Plane().setFromCoplanarPoints(
          closedPath[2],
          closedPath[1],
          closedPath[0]
        );
        
        const xRay = new THREE.Vector3().subVectors(closedPath[1], closedPath[0]);
        (plane as any).xRay = xRay;

        const offsetPath = this._webCADDocument.getOffsetPath(
          {
            plane: plane,
            path: closedPath
          },
          0.1
        );

        this._moldingWebCadDocument.addPath({
          xRay: xRay,
          plane: plane,
          paths: [offsetPath, closedPath],
          customData: {
            isPlaceHolder: true
          }
        });

        const profile = profileData.profile;
        let profileSizeX = profileData.profileSizeX;
        let profileSizeY = profileData.profileSizeY;

        // Use outer molding size for first path if specified
        if (pathIndex === 1 && outerMoldingSizeX && outerMoldingSizeY) {
          profileSizeX = outerMoldingSizeX;
          profileSizeY = outerMoldingSizeY;
        }

        const moldingData: MoldingData = {
          profile: profile,
          profileSizeX: profileSizeX,
          profileSizeY: profileSizeY,
          yRayAsNormalDirection: true
        };

        this._moldingWebCadDocument.addMolding(
          HSCore.Util.String.randomGUID(),
          [path],
          [moldingPathsWithNeighbours[pathIndex]],
          { data: moldingData },
          0,
          false,
          true
        );
      }
    }

    // Process inside cavity paths
    if (insidePaths) {
      insidePaths.forEach((insidePath: Point3D[]) => {
        const path = insidePath.map(
          (point: Point3D) => new THREE.Vector3(point.x, point.y, point.z)
        );
        
        const plane = GeLib.PolygonUtils.getPlaneFromPolygon(path);
        
        if (plane) {
          const xRay = (plane as any).xRay;
          const thickness = (this.entity.parameters as WindowPocketParameters).insideThickness || 0.005;

          this._webCADDocument.addExtrudedBody(
            {
              paths: [path],
              plane: plane,
              xRay: xRay,
              targetNormal: plane.normal,
              planeOption: {
                independent: true
              } as PlaneOption
            },
            thickness
          );
        }
      });
    }
  }

  /**
   * Constructs a mesh object with appropriate materials and UV mapping
   * 
   * @param accumulator - Accumulated graphics data
   * @param meshDef - Mesh definition from WebCAD
   * @param customAttrs - Custom attributes for the object
   * @param baseObjectData - Base object properties
   * @param config - Configuration with profile and material data
   * @returns Updated accumulator with new mesh data
   */
  private _constructMeshObject(
    accumulator: GraphicsData,
    meshDef: MeshDef,
    customAttrs: CustomAttributes,
    baseObjectData: { entityId: string; type: string; visible: boolean },
    config: { profileData?: ProfileData; materialData?: MaterialData }
  ): GraphicsData {
    const { profileData, materialData } = config;

    // Skip placeholder meshes
    if (meshDef.customData?.isPlaceHolder) {
      return accumulator;
    }

    if (materialData && profileData) {
      const materialJson = materialData.toJson();

      // Handle face material UV mapping
      if (meshDef.customData?.faceMaterialId) {
        const parsedProfile = HSCore.Util.ProfileParser.parse(profileData.profile);
        const profileDistance = (window as any).Util.getProfileDistance(
          parsedProfile,
          profileData.profileSizeX,
          profileData.profileSizeY
        );

        materialJson.tileSize_x = materialJson.tileSize_x || 1;
        materialJson.tileSize_y = materialJson.tileSize_y || 1;

        const aspectRatio = materialJson.tileSize_x / materialJson.tileSize_y;
        materialJson.normalTileSize_x = profileDistance * aspectRatio;
        materialJson.normalTileSize_y = profileDistance;
      }

      accumulator.meshDefs.push(
        (window as any).Util.applyMoldingMaterialToUV(meshDef, materialJson)
      );

      const materialObject: MaterialObject = (window as any).Util.getMaterialObject(
        materialJson || {}
      );

      materialObject.moldingMaterialRotation = materialJson.rotation;
      materialObject.rotation = materialJson.rotation;

      const isProfileFace = meshDef.customData?.faceMaterialId?.indexOf('/profile') !== -1;

      if (profileData.normalTexture && isProfileFace) {
        materialObject.normalTexture = profileData.normalTexture;
        materialObject.seekId = materialObject.seekId;
      }

      const uvTransform = this._calculateUVTransform(materialJson);
      materialObject.diffuseMapUvTransform = uvTransform.diffuseMapUvTransform;
      materialObject.normalMapUvTransform = uvTransform.normalMapUvTransform;
      materialObject.pocketMaterial = true;

      accumulator.objects.push({
        graphicsPath: `${baseObjectData.entityId}/${meshDef.meshKey}`,
        mesh: meshDef.meshKey,
        material: materialObject,
        customAttrs: customAttrs,
        ...baseObjectData
      });
    }

    return accumulator;
  }

  /**
   * Calculate UV transform matrices for texture mapping
   * 
   * @param materialData - Material configuration
   * @returns Diffuse and normal map UV transforms
   */
  private _calculateUVTransform(materialData: MaterialData): UVTransform {
    const tileX = materialData.tileSize_x || 1;
    const tileY = materialData.tileSize_y || 1;
    const offsetX = materialData.offsetX || 0;
    const offsetY = materialData.offsetY || 0;
    const rotationRad = THREE.Math.degToRad(materialData.rotation || 0);

    const diffuseTransform = new THREE.Matrix3();
    diffuseTransform.setUvTransform(offsetX, offsetY, 1 / tileX, 1 / tileY, rotationRad, 0, 0);

    const normalTileX = materialData.normalTileSize_x || 1;
    const normalTileY = materialData.normalTileSize_y || 1;

    const normalTransform = new THREE.Matrix3();
    normalTransform.setUvTransform(0, 0, 1 / normalTileX, 1 / normalTileY, 0, 0, 0);

    return {
      diffuseMapUvTransform: diffuseTransform,
      normalMapUvTransform: normalTransform
    };
  }

  /**
   * Generate graphics data asynchronously
   * 
   * @returns Promise resolving to mesh definitions and graphics objects
   */
  toGraphicsDataAsync(): Promise<GraphicsData> {
    const { profileData, materialData } = this.entity.parameters as WindowPocketParameters;

    const customAttrs: CustomAttributes = {
      roomType: 'none',
      roomArea: 0,
      type: 'Pocket'
    };

    const seekIds = (window as any).Util.getSeekIdSortByArea(materialData);
    if (seekIds) {
      customAttrs.seekIds = seekIds;
    }

    const baseObjectData = {
      entityId: this.entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: this.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    const mainDataPromise = this._webCADDocument
      .getGraphicsDataAsync()
      .then((meshDefs: MeshDef[] = []) =>
        meshDefs.reduce(
          (acc, meshDef) =>
            this._constructMeshObject(acc, meshDef, customAttrs, baseObjectData, {
              profileData,
              materialData
            }),
          { meshDefs: [], objects: [] } as GraphicsData
        )
      );

    let moldingDataPromise: Promise<GraphicsData> | undefined;

    if (this._moldingWebCadDocument) {
      moldingDataPromise = this._moldingWebCadDocument
        .getGraphicsDataAsync()
        .then((meshDefs: MeshDef[] = []) =>
          meshDefs.reduce(
            (acc, meshDef) =>
              this._constructMeshObject(acc, meshDef, customAttrs, baseObjectData, {
                profileData,
                materialData
              }),
            { meshDefs: [], objects: [] } as GraphicsData
          )
        );
    }

    const promises = moldingDataPromise ? [mainDataPromise, moldingDataPromise] : [mainDataPromise];

    return Promise.all(promises)
      .then((results: GraphicsData[]) => {
        let meshDefs = results[0]?.meshDefs || [];
        let objects = results[0]?.objects || [];

        for (let i = 1; i < results.length; i++) {
          meshDefs = meshDefs.concat(results[i].meshDefs);
          objects = objects.concat(results[i].objects);
        }

        return { meshDefs, objects };
      })
      .catch(() => ({ meshDefs: [], objects: [] }));
  }

  /**
   * Generate graphics data synchronously
   * 
   * @returns Mesh definitions and graphics objects
   */
  toGraphicsData(): GraphicsData {
    const { profileData, materialData } = this.entity.parameters as WindowPocketParameters;

    const customAttrs: CustomAttributes = {
      roomType: 'none',
      roomArea: 0,
      type: 'Pocket'
    };

    const seekIds = (window as any).Util.getSeekIdSortByArea(materialData);
    if (seekIds) {
      customAttrs.seekIds = seekIds;
    }

    const baseObjectData = {
      entityId: this.entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: this.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    const result = this._webCADDocument.getGraphicsData().reduce(
      (acc, meshDef) =>
        this._constructMeshObject(acc, meshDef, customAttrs, baseObjectData, {
          profileData,
          materialData
        }),
      { meshDefs: [], objects: [] } as GraphicsData
    );

    if (this._moldingWebCadDocument) {
      const moldingResult = this._moldingWebCadDocument.getGraphicsData().reduce(
        (acc, meshDef) =>
          this._constructMeshObject(acc, meshDef, customAttrs, baseObjectData, {
            profileData,
            materialData
          }),
        { meshDefs: [], objects: [] } as GraphicsData
      );

      result.meshDefs = result.meshDefs.concat(moldingResult.meshDefs);
      result.objects = result.objects.concat(moldingResult.objects);
    }

    return result;
  }
}