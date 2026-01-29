const FIVE_CORNER_CABINET_IDS = [
  "id_cabinet_std_3",
  "id_cabinet_std_9",
  "id_cabinet_std_3",
  "id_wardrobe_std_6"
] as const;

const STRAIGHT_CORNER_CABINET_IDS = [
  "id_cabinet_std_2",
  "id_cabinet_std_2a",
  "id_wardrobe_std_7",
  "id_wardrobe_std_8"
] as const;

const CORNER_WARDROBE_IDS = [
  "id_wardrobe_ymj_01",
  "id_wardrobe_ymj_02",
  "id_wardrobe_ymj_03",
  "id_wardrobe_ymj_04",
  "id_wardrobe_ymj_05",
  "id_wardrobe_ymj_06"
] as const;

const SKELETON_PARTS_MAP: Record<string, readonly string[]> = {
  id_cabinet_std_1: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_1a: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_2: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_2a: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_3: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_4: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_5: ["id_bd1", "id_bd2", "id_bd4", "id_bd5"],
  id_cabinet_std_6: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5"],
  id_cabinet_std_7: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6"],
  id_cabinet_std_8: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6"],
  id_cabinet_std_9: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd8", "id_bd9"],
  id_cabinet_std_11: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_cabinet_std_12: ["id_bd1", "id_bd2", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd8", "id_bd9", "id_bd10"],
  id_wardrobe_std_1: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_2: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_3: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd_fronttoekick"],
  id_wardrobe_std_4: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_5: ["id_bd_left", "id_bd_right", "id_bd_back", "id_bd_bottom", "id_bd_top"],
  id_wardrobe_std_6: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7"],
  id_wardrobe_std_7: ["id_bd1", "id_bd2a", "id_bd2b", "id_bd3", "id_bd4", "id_bd5", "id_bd6", "id_bd7", "id_bd_frontlefttoekick", "id_bd_frontrighttoekick", "id_bd_backtoekick"],
  id_passembly_bar_counter_c: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_r: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_hc: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_l: ["id_horizontal_board", "id_vertical_support_l"],
  id_passembly_bar_counter_n: ["id_horizontal_board", "id_vertical_support_l", "id_vertical_support_r"],
  id_wardrobe_frame: ["id_bd_left", "id_bd_right", "id_bd_left", "id_bd_right", "id_bd_back", "id_bd_fronttoekick", "id_bd_backtoekick", "id_bd_bottom", "id_bd_top"]
};

interface PAssembly {
  localId?: string;
  z: number;
  metadata?: {
    userFreeData?: {
      localId: string;
    };
    contentType?: {
      isTypeOf(type: unknown): boolean;
    };
  };
  getTopPAssembly(): PAssembly | null;
  getParentsInPath(): unknown[];
  getChild(childId: string): PathContainer | null;
}

interface Entity {
  localId?: string;
  z: number;
  getParentsInPath(): unknown[];
}

interface Point {
  y: number;
  z: number;
}

interface PathContainer {
  paths?: Point[][];
}

/**
 * Checks if an entity matches a specific assembly type based on ID list
 */
function matchesAssemblyType(entity: unknown, targetIds: readonly string[]): boolean {
  if (!(entity instanceof HSCore.Model.PAssembly)) {
    return false;
  }

  const topAssembly = entity.getTopPAssembly();
  if (topAssembly?.metadata?.userFreeData) {
    const userFreeData = topAssembly.metadata.userFreeData;
    return targetIds.indexOf(userFreeData.localId) !== -1;
  }

  return false;
}

export const PAssemblyBody = {
  /**
   * Determines if the entity is a five-corner cabinet
   */
  isFiveCornerCabinet(entity: unknown): boolean {
    return matchesAssemblyType(entity, FIVE_CORNER_CABINET_IDS);
  },

  /**
   * Determines if the entity is a straight-corner cabinet
   */
  isStrightCornerCabinet(entity: unknown): boolean {
    return matchesAssemblyType(entity, STRAIGHT_CORNER_CABINET_IDS);
  },

  /**
   * Determines if the entity is a corner wardrobe
   */
  isCornerWardrobe(entity: unknown): boolean {
    return matchesAssemblyType(entity, CORNER_WARDROBE_IDS);
  },

  /**
   * Checks if the entity is a skeleton part of a parent assembly
   */
  isSkeleton(entity: Entity): boolean {
    if (!entity?.localId) {
      return false;
    }

    const parents = entity.getParentsInPath();
    let parentAssembly: PAssembly | undefined;

    for (let index = 0; index < parents.length; index++) {
      if (parents[index] instanceof HSCore.Model.PAssembly) {
        parentAssembly = parents[index] as PAssembly;
        break;
      }
    }

    if (!parentAssembly?.metadata?.userFreeData) {
      return false;
    }

    const parentLocalId = parentAssembly.metadata.userFreeData.localId;
    if (!parentLocalId) {
      return false;
    }

    const entityLocalId = entity.localId;
    const skeletonParts = SKELETON_PARTS_MAP[parentLocalId];

    return Array.isArray(skeletonParts) && skeletonParts.includes(entityLocalId);
  },

  /**
   * Checks if the entity has a PAssembly parent in its hierarchy
   */
  isContentHasPAssemblyParent(entity: unknown): boolean {
    return (
      entity instanceof HSCore.Model.Entity &&
      entity.getParentsInPath().find((parent) => parent instanceof HSCore.Model.PAssembly) !== undefined
    );
  },

  /**
   * Gets the Z coordinate of the entity, accounting for crown molding
   */
  getZ(entity: Entity | PAssembly): number {
    if (!(entity instanceof HSCore.Model.PAssembly)) {
      return entity.z;
    }

    if (!entity) {
      return 0;
    }

    let toplineChild: PathContainer | null = null;

    if (entity.metadata?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.CrownMolding)) {
      toplineChild = entity.getChild("topline");
    }

    if (toplineChild?.paths && toplineChild.paths.length !== 0) {
      return toplineChild.paths[0][0].z;
    }

    return entity.z;
  },

  /**
   * Extracts the first non-zero Y coordinate from a path array
   */
  getProfileY(path: Point[]): number {
    let profileY = 0;

    for (let index = path.length - 1; index >= 0; index--) {
      const point = path[index];
      if (!HSCore.Util.Math.nearlyEquals(point.y, 0) && profileY === 0) {
        profileY = point.y;
        break;
      }
    }

    return profileY;
  }
};