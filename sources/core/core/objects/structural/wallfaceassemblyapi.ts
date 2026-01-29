import { Vector3, TrimmedSurface, Loop, MathAlg, Vector2 } from './geometry';
import { Wall, OpeningDecorator, PODecorator } from './wall';
import { NCPBackgroundWallBaseDecorator } from './decorators';
import { WallFaceAssembly } from './assembly';
import { Opening } from './opening';
import { Layer } from './layer';
import { ContentUtil } from './content-util';
import { ParametricOpening } from './parametric-opening';
import { WallFaceType } from './wall-face-type';

interface RecordData {
  openingType?: string;
  doorStone?: unknown;
  [key: string]: unknown;
}

interface Meta {
  [key: string]: unknown;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface InputItem {
  recordData: RecordData;
  meta: Meta;
  position?: Position;
}

interface SurfaceObject {
  surface: Surface;
  sameDirWithSurface: boolean;
}

interface RawPath {
  outer: unknown;
}

interface WallFaceItem {
  surfaceObj: SurfaceObject;
  rawPath: RawPath;
  getUniqueParent(): Layer | null;
  id: string;
}

interface Surface {
  getProjectedPtBy(point: Vector3): Vector3;
}

interface ContentContainer {
  content: unknown;
  host: unknown;
  parent: Layer | null;
  guests?: unknown[];
}

interface Entity {
  getUniqueParent(): EntityParent | null;
  setFlagOn(flag: number): void;
  associatedContents?: unknown[];
}

interface EntityParent {
  addChild(entity: Entity): void;
  removeChild(entity: Entity): void;
}

interface LinkStructureItem {
  getFaceType?(entity: unknown): WallFaceType;
  crossPath: unknown;
  center: Vector3;
  getUniqueParent(): Layer | null;
}

interface ContentEntity {
  x: number;
  y: number;
  z: number;
  getLinkStructure(): LinkStructureItem[];
}

const TOLERANCE = 1e-6;
const OPENING_TYPE = HSConstants.Constants.OpeningType;
const PARAMETRIC_OPENING_TYPE = HSConstants.Constants.ParametricOpeningType;

export class WallFaceAssemblyApi {
  private readonly _tol: number;

  constructor() {
    this._tol = TOLERANCE;
  }

  /**
   * Adds a wall face assembly to the parent entity
   */
  addWallFaceAssembly(
    assemblyId: string,
    entity: Entity,
    associatedContents: unknown[]
  ): WallFaceAssembly | undefined {
    const parent = entity.getUniqueParent();
    if (!parent) return;

    const assembly = WallFaceAssembly.create(assemblyId);
    parent.addChild(assembly);
    assembly.associatedContents = associatedContents;
    return assembly;
  }

  /**
   * Removes a wall face assembly from its parent
   */
  removeWallFaceAssembly(assembly: Entity): void {
    const parent = assembly.getUniqueParent();
    if (parent) {
      parent.removeChild(assembly);
    }
    assembly.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  /**
   * Creates NCP background walls from input data
   */
  createNCPBgWalls(
    items: InputItem[],
    transform: unknown,
    wallFaces: WallFaceItem[]
  ): ContentContainer[] {
    if (wallFaces.length === 0) return [];

    const results: ContentContainer[] = [];

    items.forEach((item) => {
      const { recordData, meta, position } = item;
      if (!position || !meta) return;

      const transformedPosition = new Vector3(position).transform(transform);
      let selectedWallFace: WallFaceItem | undefined;

      for (const wallFace of wallFaces) {
        const surface = wallFace.surfaceObj.surface;
        const projectedPoint = surface.getProjectedPtBy(transformedPosition);
        const trimmedSurface = TrimmedSurface.createByBoundary3d(
          surface,
          [wallFace.rawPath.outer],
          wallFace.surfaceObj.sameDirWithSurface
        );

        if (!trimmedSurface.containsPoint(projectedPoint, this._tol)) continue;

        const parent = wallFace.getUniqueParent();
        if (parent && parent instanceof Layer) {
          selectedWallFace = wallFace;
          break;
        }
      }

      if (!selectedWallFace) {
        selectedWallFace = wallFaces[0];
      }

      const decorator = NCPBackgroundWallBaseDecorator.create(
        recordData,
        meta,
        transform,
        selectedWallFace
      );

      if (decorator) {
        const contentContainer: ContentContainer = {
          content: decorator,
          host: selectedWallFace,
          parent: selectedWallFace.getUniqueParent(),
          guests: [],
        };
        ContentUtil.addContent(contentContainer);
        decorator.x = transformedPosition.x;
        decorator.y = transformedPosition.y;
        decorator.z = transformedPosition.z;
        results.push(contentContainer);
      }
    });

    return results;
  }

  /**
   * Creates door or window openings on walls
   */
  createDoorOrWindow(
    items: InputItem[],
    transform: unknown,
    contentEntities: ContentEntity[]
  ): unknown[] {
    const createdOpenings: unknown[] = [];
    const recordDataList: RecordData[] = [];
    const wallFaceMap = new Map<ContentEntity, LinkStructureItem[]>();

    contentEntities.forEach((entity) => {
      const linkStructure = entity.getLinkStructure().filter((item) => {
        if (item instanceof Wall) {
          const faceType = item.getFaceType?.(entity);
          return faceType === WallFaceType.left || faceType === WallFaceType.right;
        }
        return false;
      });

      if (linkStructure.length) {
        wallFaceMap.set(entity, linkStructure);
      }
    });

    const layersToUpdate: Layer[] = [];
    const wallFaceIds: string[] = [];

    items.forEach((item) => {
      const { recordData, meta, position } = item;
      if (!position || !meta) return;

      const transformedPosition = new Vector3(item.position).transform(transform);

      for (const [wallFace, linkItems] of wallFaceMap) {
        const surface = wallFace.surfaceObj.surface;
        const projectedPoint = surface.getProjectedPtBy(transformedPosition);

        const matchingLink = linkItems.find((linkItem) => {
          const loop = new Loop(linkItem.crossPath);
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

        if (!matchingLink) continue;

        const parent = matchingLink.getUniqueParent();
        if (!(parent && parent instanceof Layer)) continue;

        layersToUpdate.push(parent);

        const center = matchingLink.center;
        const projectedCenter = surface.getProjectedPtBy(center);
        const offset = center.subtracted(projectedCenter);
        const finalPosition = projectedPoint.translate(offset);

        let opening: unknown;

        if (recordData.openingType === OPENING_TYPE) {
          opening = OpeningDecorator.create(meta, wallFace);
          new OpeningDecorator(opening).loadOther(recordData);
        } else if (recordData.openingType === PARAMETRIC_OPENING_TYPE) {
          opening = PODecorator.create(meta, wallFace, matchingLink);
          new PODecorator(opening).loadOther(recordData);
        }

        if (opening) {
          ContentUtil.addContent({
            content: opening,
            host: matchingLink,
            parent,
          });
          opening.x = finalPosition.x;
          opening.y = finalPosition.y;
          opening.z = finalPosition.z;
          createdOpenings.push(opening);
          recordDataList.push(item.recordData);
          wallFaceIds.push(wallFace.id);
        }
        break;
      }
    });

    layersToUpdate.forEach((layer) => layer.holeBuilder.updateWallHole(wallFaceIds));

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