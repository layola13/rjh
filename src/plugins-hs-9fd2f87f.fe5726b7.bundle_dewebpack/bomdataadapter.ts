import { HSConstants } from './HSConstants';
import { HSCore } from './HSCore';
import { getStructNameOfType } from './StructureUtils';
import { isBomEntityMatchCategory, slabOpeningCategory, slabNicheCategory, wallOpeningCategory, wallNicheCategory, flueCategory, beamCategory, riserCategory, outletCategory, squareColumnCategory, roundColumnCategory } from './CategoryUtils';
import { ParameterNames } from './ParameterNames';
import { contentTypeIsTypeOf } from './ContentTypeUtils';

const DEFAULT_FLOOR_MATERIAL_SEEK_ID = HSConstants.Constants.DEFAULT_FLOOR_MATERIAL.seekId;
const DEFAULT_CEILING_MATERIAL_SEEK_ID = HSConstants.Constants.DEFAULT_CEILING_MATERIAL.seekId;

interface MaterialInfo {
  seekId: string;
  categoryId: string;
}

interface PatternInfo {
  seekId?: string;
  unitsInfos?: Array<{
    materials?: Array<{ seekId: string; categoryType: string }>;
  }>;
}

interface Material {
  seekId: string;
  categoryType: string;
}

interface PaveChild {
  getParameterValue(key: string): PatternInfo | Material | unknown;
}

interface Pave {
  children: PaveChild[];
  getParameterValue(key: string): string[] | unknown;
}

interface RoomFace {
  instance: { id: string };
  type: { classType: string };
}

interface Structure {
  curve: { getType(): string };
}

interface Wall extends Structure {}

interface RoomInfo {
  structures: Structure[];
}

interface Opening {
  instance: { id: string };
  category: { categoryType: string; displayName: string };
  getParameterValue(key: string): string | unknown;
}

interface Entity {
  instance: { id: string };
  category: { categoryType: string; displayName: string };
  type: { contentType: string };
  getParameterValue(key: string): string | Record<string, unknown> | unknown;
}

interface Room {
  instance: { id: string };
}

interface SceneData {
  paves: Pave[];
  roomFaces: Map<string, RoomFace[]>;
  roomInfos: RoomInfo[];
  openings: Opening[];
  customizedEntities: Entity[];
  contents: Entity[];
  customizedBackgroundWall: Entity[];
  customizedCeiling: Entity[];
  customizedPlatform: Entity[];
  cornices: Entity[];
  baseboards: Entity[];
  customizedPMEntities: Entity[];
  customizationEntities: Entity[];
}

interface FloorPaveInfo {
  floorPaveType: string;
  floorMaterialSeekId: string;
  floorMaterialCategoryId?: string;
}

interface WallPaveInfo {
  wallPaveType: string;
  wallMaterialSeekId: string;
  wallMaterialCategoryId?: string;
}

interface WallInfo {
  curveType: string;
}

interface StructureItem {
  name?: string;
  type: string;
  id: string;
  [key: string]: unknown;
}

interface FurnitureInfo {
  id: string;
  categories: string[];
  materials: Record<string, unknown>;
}

interface OpeningTypeInfo {
  entityId: string;
  categoryId: string;
}

/**
 * Extracts material information from pave children
 */
function extractMaterialInfo(
  paveChildren: PaveChild[],
  defaultSeekId: string = '',
  defaultCategoryId: string = ''
): MaterialInfo {
  const materialInfo: MaterialInfo = {
    seekId: defaultSeekId,
    categoryId: defaultCategoryId
  };

  if (!paveChildren.length) {
    return materialInfo;
  }

  paveChildren.find(child => {
    const patternInfo = child.getParameterValue('patternInfo') as PatternInfo | undefined;
    const materialFromPattern = patternInfo?.unitsInfos?.[0]?.materials?.[0];
    const material = (materialFromPattern || child.getParameterValue('material')) as Material | undefined;

    if (!material?.seekId || material.seekId === defaultSeekId) {
      return false;
    }

    materialInfo.seekId = material.seekId;
    materialInfo.categoryId = material.categoryType.indexOf(', ') > 0
      ? material.categoryType.split(', ')[0]
      : material.categoryType;

    return true;
  });

  return materialInfo;
}

export class BomDataAdapter {
  /**
   * Retrieves floor paving information for a specific room
   */
  static getFloorPave(sceneData: SceneData, room: Room): FloorPaveInfo {
    let floorPaveType = 'default';
    let floorMaterialSeekId = DEFAULT_FLOOR_MATERIAL_SEEK_ID;
    let floorMaterialCategoryId: string | undefined;

    const matchingPave = sceneData.paves.find(pave => {
      const faceIds = pave.getParameterValue('faceIds') as string[] | undefined;
      return faceIds?.includes(room.instance.id);
    });

    if (matchingPave) {
      const paveChildren = matchingPave.children;
      const materialInfo = extractMaterialInfo(
        paveChildren,
        DEFAULT_FLOOR_MATERIAL_SEEK_ID,
        'd5033161-825a-48c3-b6ed-0f6d48feb48a'
      );

      floorMaterialSeekId = materialInfo.seekId;
      floorMaterialCategoryId = materialInfo.categoryId;

      if (paveChildren.length > 1) {
        floorPaveType = 'customized';
      } else if (paveChildren.length === 1) {
        const patternInfo = paveChildren[0].getParameterValue('patternInfo') as PatternInfo | undefined;
        if (patternInfo?.seekId) {
          floorPaveType = 'customized';
        } else if (floorMaterialSeekId !== DEFAULT_FLOOR_MATERIAL_SEEK_ID) {
          floorPaveType = 'model';
        }
      }
    }

    return {
      floorPaveType,
      floorMaterialSeekId,
      floorMaterialCategoryId
    };
  }

  /**
   * Retrieves wall paving information for a specific room
   */
  static getWallPave(sceneData: SceneData, room: Room): WallPaveInfo {
    let wallPaveType = 'default';
    let wallMaterialSeekId = DEFAULT_CEILING_MATERIAL_SEEK_ID;
    let wallMaterialCategoryId: string | undefined;

    const roomFaces = sceneData.roomFaces.get(room.instance.id) ?? [];
    roomFaces.filter(face => face.type.classType === HSConstants.ModelClass.NgFace);

    const matchingPaves = sceneData.paves.filter(pave =>
      roomFaces.some(face => {
        const faceIds = pave.getParameterValue('faceIds') as string[] | undefined;
        return faceIds?.includes(face.instance.id);
      })
    );

    for (const pave of matchingPaves) {
      const paveChildren = pave.children;
      const materialInfo = extractMaterialInfo(
        paveChildren,
        DEFAULT_CEILING_MATERIAL_SEEK_ID,
        '1704ab2a-0d96-4300-87f7-e00c61dd3d41'
      );

      wallMaterialSeekId = materialInfo.seekId;
      wallMaterialCategoryId = materialInfo.categoryId;

      if (paveChildren.length > 1) {
        wallPaveType = 'customized';
      } else if (paveChildren.length === 1) {
        const patternInfo = paveChildren[0].getParameterValue('patternInfo') as PatternInfo | undefined;
        if (patternInfo?.seekId) {
          wallPaveType = 'customized';
        } else if (wallMaterialSeekId !== DEFAULT_CEILING_MATERIAL_SEEK_ID) {
          wallPaveType = 'model';
        }
      }

      if (wallPaveType !== 'default') {
        break;
      }
    }

    return {
      wallPaveType,
      wallMaterialSeekId,
      wallMaterialCategoryId
    };
  }

  /**
   * Updates and retrieves wall structure information
   */
  static updateWallInfo(sceneData: SceneData): WallInfo[] | undefined {
    const walls = sceneData.roomInfos.reduce<Wall[]>((accumulated, roomInfo) => {
      const roomWalls = roomInfo.structures.filter(
        (structure): structure is Wall => structure instanceof HSCore.Model.Wall
      );
      return [...accumulated, ...roomWalls];
    }, []);

    if (!walls?.length) {
      return undefined;
    }

    return walls.map(wall => ({
      curveType: wall.curve.getType()
    }));
  }

  /**
   * Retrieves structural information for a specific room
   */
  static getStructureInfo(sceneData: SceneData, room: Room): StructureItem[] {
    const structures: StructureItem[] = [];

    structures.forEach(structure => {
      structure.name = getStructNameOfType(structure.type);
    });

    const roomOpenings = sceneData.openings.filter(
      opening => opening.getParameterValue(ParameterNames.roomId) === room.instance.id
    );

    roomOpenings.forEach(opening => {
      if (isBomEntityMatchCategory(opening, slabOpeningCategory)) {
        structures.push({
          ...slabOpeningCategory,
          type: 'slabOpening',
          id: opening.instance.id
        });
      }
      if (isBomEntityMatchCategory(opening, slabNicheCategory)) {
        structures.push({
          ...slabNicheCategory,
          type: 'slabNiche',
          id: opening.instance.id
        });
      }
    });

    roomOpenings.forEach(opening => {
      if (isBomEntityMatchCategory(opening, wallOpeningCategory)) {
        structures.push({
          ...wallOpeningCategory,
          type: 'wallOpening',
          id: opening.instance.id
        });
      }
      if (isBomEntityMatchCategory(opening, wallNicheCategory)) {
        structures.push({
          ...wallNicheCategory,
          type: 'wallNiche',
          id: opening.instance.id
        });
      }
    });

    const roomEntities = [
      ...sceneData.customizedEntities,
      ...sceneData.contents
    ].filter(entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id);

    const structuralCategories = [flueCategory, beamCategory, riserCategory, outletCategory];
    const columnCategories = [squareColumnCategory, roundColumnCategory];

    for (const entity of roomEntities) {
      for (const category of structuralCategories) {
        if (isBomEntityMatchCategory(entity, category)) {
          structures.push({
            ...category,
            type: entity.category.displayName,
            id: entity.instance.id
          });
          break;
        }
      }

      for (const columnCategory of columnCategories) {
        if (contentTypeIsTypeOf(entity.type.contentType, columnCategory.subContentType)) {
          structures.push({
            ...columnCategory,
            type: entity.category.displayName,
            id: entity.instance.id
          });
        }
      }
    }

    return structures;
  }

  /**
   * Retrieves furniture information for a specific room
   */
  static getFurnitureInfo(sceneData: SceneData, room: Room): FurnitureInfo[] {
    return [...sceneData.contents, ...sceneData.customizationEntities]
      .filter(entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id)
      .map(entity => ({
        id: entity.instance.id,
        categories: [entity.category.categoryType],
        materials: (entity.getParameterValue('materials') as Record<string, unknown>) ?? {}
      }));
  }

  /**
   * Retrieves opening type information for a specific room
   */
  static getOpeningTypeInfo(sceneData: SceneData, room: Room): OpeningTypeInfo[] {
    return sceneData.openings
      .filter(opening => opening.getParameterValue(ParameterNames.roomId) === room.instance.id)
      .map(opening => ({
        entityId: opening.instance.id,
        categoryId: opening.category.categoryType
      }));
  }

  /**
   * Determines the background wall type for a specific room
   */
  static getBackgroundWallType(sceneData: SceneData, room: Room): string {
    const customizedBackgroundWalls = sceneData.customizedBackgroundWall.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    );

    const roomContents = sceneData.contents.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    );

    let backgroundWallType = 'default';

    if (roomContents.some(entity => contentTypeIsTypeOf(entity.type.contentType, 'background wall'))) {
      backgroundWallType = 'model';
    }

    if (customizedBackgroundWalls.length) {
      backgroundWallType = 'customized';
    }

    return backgroundWallType;
  }

  /**
   * Determines the ceiling type for a specific room
   */
  static getCeilingType(sceneData: SceneData, room: Room): string {
    const customizedCeilings = sceneData.customizedCeiling.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    );

    const roomContents = sceneData.contents.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    );

    let ceilingType = 'none';
    const ceilingContentTypes = ['ceiling molding', 'gypsum ceiling'];

    if (roomContents.some(entity =>
      ceilingContentTypes.some(type => contentTypeIsTypeOf(entity.type.contentType, type))
    )) {
      ceilingType = 'model';
    }

    if (customizedCeilings.length) {
      ceilingType = 'customized';
    }

    return ceilingType;
  }

  /**
   * Checks if the room has a platform
   */
  static hasPlatform(sceneData: SceneData, room: Room): boolean {
    return sceneData.customizedPlatform.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    ).length > 0;
  }

  /**
   * Checks if the room has cornices
   */
  static hasCornice(sceneData: SceneData, room: Room): boolean {
    return sceneData.cornices.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    ).length > 0;
  }

  /**
   * Checks if the room has baseboards
   */
  static hasBaseBoard(sceneData: SceneData, room: Room): boolean {
    return sceneData.baseboards.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    ).length > 0;
  }

  /**
   * Checks if the room has DIY elements
   */
  static hasDIY(sceneData: SceneData, room: Room): boolean {
    return sceneData.customizedPMEntities.length > 0;
  }

  /**
   * Checks if the room has customization entities
   */
  static hasCustomization(sceneData: SceneData, room: Room): boolean {
    return sceneData.customizationEntities.filter(
      entity => entity.getParameterValue(ParameterNames.roomId) === room.instance.id
    ).length > 0;
  }
}