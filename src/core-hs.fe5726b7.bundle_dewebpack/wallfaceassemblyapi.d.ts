/**
 * Module: WallFaceAssemblyApi
 * API for managing wall face assemblies, background walls, and openings (doors/windows)
 */

import { Vector3, TrimmedSurface, Loop, MathAlg, Vector2 } from 'geometry-library';
import { Wall, OpeningDecorator, PODecorator } from 'wall-system';
import { NCPBackgroundWallBaseDecorator } from 'ncp-decorators';
import { WallFaceAssembly } from 'wall-face-assembly';
import { Opening } from 'opening-system';
import { Layer } from 'layer-system';
import { ParametricOpening } from 'parametric-opening';
import { ContentUtil } from 'content-utils';
import { WallFaceType } from 'wall-face-types';
import { HSCore, HSConstants } from 'core-types';

/**
 * Metadata information for creating entities
 */
interface EntityMeta {
  // Meta information structure (expand based on actual requirements)
  [key: string]: unknown;
}

/**
 * Position in 3D space
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * Record data for entity creation
 */
interface RecordData {
  openingType?: string;
  doorStone?: unknown;
  [key: string]: unknown;
}

/**
 * Input data for creating entities with position
 */
interface EntityCreationData {
  recordData: RecordData;
  meta?: EntityMeta;
  position?: Position;
}

/**
 * Surface object with direction information
 */
interface SurfaceObject {
  surface: unknown; // Surface type from geometry library
  sameDirWithSurface: boolean;
}

/**
 * Path boundary definition
 */
interface PathBoundary {
  outer: unknown; // Boundary path definition
}

/**
 * Background wall data structure
 */
interface BackgroundWallData {
  surfaceObj: SurfaceObject;
  rawPath: PathBoundary;
  getUniqueParent(): unknown;
}

/**
 * Content container structure
 */
interface ContentContainer<T = unknown> {
  content: T;
  host: unknown;
  parent: unknown;
  guests?: unknown[];
}

/**
 * Entity with link structure support
 */
interface LinkableEntity {
  getLinkStructure(): unknown[];
  getFaceType?(entity: unknown): WallFaceType;
  crossPath?: unknown;
  center?: Vector3;
  surfaceObj?: SurfaceObject;
  id?: string;
  getUniqueParent(): unknown;
}

/**
 * Transformation matrix type
 */
type TransformMatrix = unknown; // 4x4 transformation matrix

/**
 * Tolerance value for geometric calculations (default: 1e-6)
 */
const DEFAULT_TOLERANCE = 1e-6;

/**
 * API for managing wall face assemblies and related entities
 * Handles creation, removal, and manipulation of wall components
 */
export class WallFaceAssemblyApi {
  /**
   * Geometric tolerance for point containment and distance calculations
   */
  private readonly _tol: number;

  constructor() {
    this._tol = DEFAULT_TOLERANCE;
  }

  /**
   * Adds a wall face assembly to a parent entity
   * @param entityId - Unique identifier for the assembly
   * @param parentEntity - Parent entity that will contain the assembly
   * @param associatedContents - Contents to associate with the assembly
   * @returns The created WallFaceAssembly or undefined if parent is invalid
   */
  addWallFaceAssembly(
    entityId: string,
    parentEntity: { getUniqueParent(): unknown },
    associatedContents: unknown[]
  ): WallFaceAssembly | undefined {
    const parent = parentEntity.getUniqueParent();
    if (!parent) {
      return undefined;
    }

    const assembly = WallFaceAssembly.create(entityId);
    parent.addChild(assembly);
    assembly.associatedContents = associatedContents;

    return assembly;
  }

  /**
   * Removes a wall face assembly from its parent and marks it as removed
   * @param assembly - The assembly to remove
   */
  removeWallFaceAssembly(assembly: WallFaceAssembly): void {
    const parent = assembly.getUniqueParent();
    if (parent) {
      parent.removeChild(assembly);
    }
    assembly.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  /**
   * Creates NCP (Non-Cutting Plane) background walls from entity data
   * @param entities - Array of entity creation data
   * @param transform - Transformation matrix to apply to positions
   * @param backgroundWalls - Available background wall data
   * @returns Array of content containers with created background walls
   */
  createNCPBgWalls(
    entities: EntityCreationData[],
    transform: TransformMatrix,
    backgroundWalls: BackgroundWallData[]
  ): ContentContainer[] {
    if (backgroundWalls.length === 0) {
      return [];
    }

    const createdContents: ContentContainer[] = [];

    entities.forEach((entity) => {
      const { recordData, meta, position } = entity;

      if (!position || !meta) {
        return;
      }

      const transformedPosition = new Vector3(position).transform(transform);
      let selectedWall: BackgroundWallData | undefined;

      // Find the appropriate background wall by checking point containment
      for (const wall of backgroundWalls) {
        const surface = wall.surfaceObj.surface;
        const projectedPoint = surface.getProjectedPtBy(transformedPosition);

        const trimmedSurface = TrimmedSurface.createByBoundary3d(
          surface,
          [wall.rawPath.outer],
          wall.surfaceObj.sameDirWithSurface
        );

        if (!trimmedSurface.containsPoint(projectedPoint, this._tol)) {
          continue;
        }

        const parent = wall.getUniqueParent();
        if (parent && parent instanceof Layer) {
          selectedWall = wall;
          break;
        }
      }

      // Fallback to first wall if no suitable wall found
      if (!selectedWall) {
        selectedWall = backgroundWalls[0];
      }

      const backgroundWallDecorator = NCPBackgroundWallBaseDecorator.create(
        recordData,
        meta,
        transform,
        selectedWall
      );

      if (!backgroundWallDecorator) {
        return;
      }

      const contentContainer: ContentContainer = {
        content: backgroundWallDecorator,
        host: selectedWall,
        parent: selectedWall.getUniqueParent(),
        guests: [],
      };

      ContentUtil.addContent(contentContainer);

      // Set transformed position
      backgroundWallDecorator.x = transformedPosition.x;
      backgroundWallDecorator.y = transformedPosition.y;
      backgroundWallDecorator.z = transformedPosition.z;

      createdContents.push(contentContainer);
    });

    return createdContents;
  }

  /**
   * Creates door or window openings on walls
   * @param entities - Array of entity creation data for openings
   * @param transform - Transformation matrix to apply to positions
   * @param linkableEntities - Entities that can host openings
   * @returns Array of created opening entities
   */
  createDoorOrWindow(
    entities: EntityCreationData[],
    transform: TransformMatrix,
    linkableEntities: LinkableEntity[]
  ): unknown[] {
    const createdOpenings: unknown[] = [];
    const recordDataList: RecordData[] = [];
    const entityToWallsMap = new Map<LinkableEntity, unknown[]>();

    // Build map of entities to their associated walls
    linkableEntities.forEach((entity) => {
      const linkedWalls = entity.getLinkStructure().filter((linkedEntity) => {
        if (linkedEntity instanceof Wall) {
          const faceType = linkedEntity.getFaceType(entity);
          return faceType === WallFaceType.left || faceType === WallFaceType.right;
        }
        return false;
      });

      if (linkedWalls.length > 0) {
        entityToWallsMap.set(entity, linkedWalls);
      }
    });

    const affectedLayers: Layer[] = [];
    const wallIds: string[] = [];

    entities.forEach((entity) => {
      const { recordData, meta, position } = entity;

      if (!position || !meta) {
        return;
      }

      const transformedPosition = new Vector3(entity.position).transform(transform);

      // Find the appropriate host entity and wall
      for (const [hostEntity, walls] of entityToWallsMap) {
        const surface = hostEntity.surfaceObj!.surface;
        const projectedPoint = surface.getProjectedPtBy(transformedPosition);

        const matchingWall = walls.find((wall) => {
          const loop = new Loop(wall.crossPath);
          const positionResult = MathAlg.PositionJudge.ptToLoop(
            new Vector2(projectedPoint.x, projectedPoint.y),
            loop,
            this._tol
          );

          return (
            positionResult.type === MathAlg.PtLoopPositonType.ONEDGE ||
            positionResult.type === MathAlg.PtLoopPositonType.ONVERTEX
          );
        });

        if (!matchingWall) {
          continue;
        }

        const parentLayer = matchingWall.getUniqueParent();
        if (!(parentLayer && parentLayer instanceof Layer)) {
          continue;
        }

        affectedLayers.push(parentLayer);

        // Calculate adjusted position based on wall center
        const wallCenter = matchingWall.center;
        const projectedCenter = surface.getProjectedPtBy(wallCenter);
        const offset = wallCenter.subtracted(projectedCenter);
        const adjustedPosition = projectedPoint.translate(offset);

        let opening: unknown;

        // Create appropriate opening type
        if (recordData.openingType === HSConstants.Constants.OpeningType) {
          opening = OpeningDecorator.create(meta, hostEntity);
          new OpeningDecorator(opening).loadOther(recordData);
        } else if (recordData.openingType === HSConstants.Constants.ParametricOpeningType) {
          opening = PODecorator.create(meta, hostEntity, matchingWall);
          new PODecorator(opening).loadOther(recordData);
        }

        if (!opening) {
          continue;
        }

        ContentUtil.addContent({
          content: opening,
          host: matchingWall,
          parent: parentLayer,
        });

        opening.x = adjustedPosition.x;
        opening.y = adjustedPosition.y;
        opening.z = adjustedPosition.z;

        createdOpenings.push(opening);
        recordDataList.push(entity.recordData);
        wallIds.push(hostEntity.id!);

        break;
      }
    });

    // Update wall holes for affected layers
    affectedLayers.forEach((layer) => {
      layer.holeBuilder.updateWallHole(wallIds);
    });

    // Load door stones for created openings
    createdOpenings.forEach((opening, index) => {
      if (opening instanceof Opening) {
        new OpeningDecorator(opening).loadDoorStone(recordDataList[index].doorStone);
      } else if (opening instanceof ParametricOpening) {
        new PODecorator(opening).loadDoorStone(recordDataList[index].doorStone);
      }
    });

    return createdOpenings;
  }
}